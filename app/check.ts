import dotenv from 'dotenv'

import OpenAI from 'openai'
import { parse } from 'node-html-parser'
import * as minifyHtml from '@minify-html/js'

import type { OpenAIResponse } from './io'
import { MockStatusPage } from './io'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const nodeEnv = process.env.NODE_ENV

const checkStatus = async () => {
  const pageToScrape = process.env.PAGE_TO_SCRAPE

  if (!pageToScrape) {
    console.error('Please provide a page to scrape')
    process.exit(1)
  }

  const statusPage = await fetch(pageToScrape).then(async (response) => {
    if (!response.ok) {
      const errorData = await response.text()
      const parsedErrorData = JSON.parse(errorData)
      console.error(`Failed to fetch data: ${response.statusText} - ${parsedErrorData.err}`)
    }

    const data = await response.text()
    
    return data
  })

  const parsedStatusPage = parse(statusPage).querySelector('.page.full-width')
  if (!parsedStatusPage) {
    return
  }

  parsedStatusPage.querySelectorAll('*').forEach((element) => {
    element.removeAttribute('class')
    if (element.tagName === 'SVG') {
      element.remove()
    }
  })

  const cfg = minifyHtml.createConfiguration({ keep_spaces_between_attributes: true })
  const minified = minifyHtml.minify(String(parsedStatusPage), cfg)

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
          1. 'overall_status': The overall status of the system, which should be 'operational' if there are no issues or 'outage' if there is any issue.
          2. 'statuses': An array of all possible statuses.
          3. 'services': An object with the service names as keys and their current status as values.
          All keys in the JSON object must be in lowercase and snake_case. Use the HTML code provided to determine the current status of each service and the overall system status.
          ${nodeEnv === 'development' ? MockStatusPage : minified }
        `
      },
    ],
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
  })

  const response = completion.choices[0].message.content

  if (!response) {
    console.error('Something went wrong')
    return
  }

  const parsedResponse:OpenAIResponse = JSON.parse(response)

  console.log(parsedResponse)
  console.log('==========')
  // console.log(completion)

}

checkStatus()