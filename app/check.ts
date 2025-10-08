import dotenv from 'dotenv'

import OpenAI from 'openai'
import { parse } from 'node-html-parser'
import {
  type OpenAIResponse,
  MockStatusPageWithIssues
} from './io'
import { cleanHTML } from './utils/clean-html'
import {
  slackSection
} from './utils/format-slack-message'
import {
  getS3Object,
  putS3Object
} from './aws/s3'

dotenv.config()

const checkStatus = async () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const pageToScrape = process.env.PAGE_TO_SCRAPE

  if (!pageToScrape) {
    throw new Error('PAGE_TO_SCRAPE env is not set')
  }

  const statusPage = await fetch(pageToScrape).then(async (response) => {
    if (!response.ok) {
      console.error(`Failed to fetch data: ${response.statusText}`)
    }

    const data = await response.text()
    
    return data
  })

  const parsedStatusPage = process.env.NODE_ENV === 'production' ? parse(statusPage) : MockStatusPageWithIssues
  if (!parsedStatusPage) {
    console.error(`Failed to parse ${process.env.NODE_ENV === 'production' ? pageToScrape : 'MockStatusPageWithIssues'}`)
    return
  }

  const currentStatusPage = await cleanHTML(String(parsedStatusPage))
  const previousStatusPage = await getS3Object('shopify_status_page.txt')
  const previousOverallStatus = await getS3Object('shopify_status.txt')
  const previousActiveIssue = await getS3Object('shopify_active_issue.txt')
  
  if (previousStatusPage !== currentStatusPage) {
    await putS3Object(currentStatusPage, 'shopify_status_page.txt')
    console.log('currentStatusPage', currentStatusPage)

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant designed to output JSON.',
        },
        {
          role: 'user',
          content: `
            Extract information from the following HTML code and provide a JSON object. The JSON object should have the following structure:
            1. 'active_issue': The current active issue or issues as a string separated by commas; if there are no active issues return 'operational'.
            2. 'overall_status': The overall status of the system, which should be 'operational' if there are no issues or 'active issue' if you found ANY issue.
            3. 'statuses': An array of all possible statuses.
            4. 'services': An object with the service names as keys and their current status as values.
            All keys in the JSON object must be in lowercase and snake_case. Use the HTML code provided to determine the current status of each service and the overall system status.
            ${ currentStatusPage }
          `
        },
      ],
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
    })

    const response = completion?.choices[0].message.content
  
    if (!response) {
      console.error('Something went wrong')
      return
    }
  
    const parsedResponse:OpenAIResponse = JSON.parse(response)
    console.log('OpenAI JSON Response:', parsedResponse)
    const currentOverallStatus = parsedResponse.overall_status
    const currentActiveIssue = parsedResponse.active_issue
    const slackPayload = []

    if (
      previousOverallStatus === currentOverallStatus ||
      previousActiveIssue === currentActiveIssue
    ) {
      console.log('Shopify overall status or active issue is the same')
      return
    }

    previousOverallStatus !== currentOverallStatus ? await putS3Object(currentOverallStatus, 'shopify_status.txt') : null
    previousActiveIssue !== currentActiveIssue ? await putS3Object(currentActiveIssue, 'shopify_active_issue.txt') : null

    if (currentOverallStatus === 'operational') {
      slackPayload.push(
        slackSection(`*All systems are operational*  :white_check_mark:`)
      )
      console.log(`*All systems are operational*  :white_check_mark:`)
    } else if (currentOverallStatus === 'active issue') {
      slackPayload.push(
        slackSection(`*${currentActiveIssue}*  :no_entry:`),
        // slackSection(`More info *<https://www.shopifystatus.com/|here>*`)
      )
      console.log(`*${currentActiveIssue}*  :no_entry:`)
    }

    await fetch(`${process.env.SLACK_APP_WEBHOOK_URL}`, {
      method: 'POST',
      body: JSON.stringify({
        blocks: [
          ...slackPayload
        ]
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(async (response) => {
      if (!response.ok) {
        console.error(`${response.statusText}: Failed to post data to Slack`)
      }
    })
  } else {
    console.log('Shopify status is the same')
  }
}

checkStatus()