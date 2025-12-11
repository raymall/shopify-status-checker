# Shopify Status Checker

Shopify Status Checker is a Node.js application that monitors the Shopify status page for changes, analyzes them with OpenAI, and posts updates to Slack.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [Configuration](#configuration)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

## Overview

This service performs the following operations:
1. Scrapes the Shopify status page (shopifystatus.com)
2. Cleans the HTML content
3. Compares it with the previous version stored in an S3 bucket
4. If changes are detected, uses OpenAI to analyze the content and generate a structured JSON report
5. Posts a brief summary of Shopify's system health to a Slack channel

## Installation

Before you begin, ensure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

Install dependencies:
```bash
pnpm install
```

## Usage

To run the application locally, use the following command:
```bash
pnpm run dev
```

## Commands

- `pnpm run dev`: Runs the application in development mode.
- `pnpm run build`: Builds the application for production.
- `pnpm run start`: Start the application locally.

## Configuration

To configure the application, you need to set up environment variables. Create a `.env` file from `.env.template` in the root directory of the project with the following content:

```bash
# Environment
NODE_ENV=development
PAGE_TO_SCRAPE=https://www.shopifystatus.com

# OpenAI
OPENAI_API_KEY=your_openai_api_key
OPENAI_ORGANIZATION_ID=your_organization_id
OPENAI_PROJECT_ID=your_project_id

# AWS
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your_s3_bucket_name

# Slack
SLACK_APP_WEBHOOK_URL=your_slack_webhook_url
```

## How It Works

1. The application fetches the HTML content from the Shopify status page
2. It cleans the HTML to extract only the relevant information
3. The cleaned content is compared with the previous version stored in S3
4. If changes are detected:
   - The new content is saved to S3, replacing the previous version
   - The content is sent to OpenAI for analysis
   - OpenAI returns a structured JSON with the system health status
   - A formatted message is sent to Slack with the status information

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Push to the branch.
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Cron Expressions

`*/15 10-23 * * 1-5`: Every 15 minutes, between 10:00 AM UTC and 11:59 PM UTC, Monday through Friday.

`*/10 8-23,0-2 * * *`: every 10 minutes, at 08:00 AM UTC through 11:59 PM UTC and 12:00 AM UTC through 02:59 AM UTC.