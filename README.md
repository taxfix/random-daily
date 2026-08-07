# Random Daily

A serverless application that automates team standup order randomization and on-call rotation assignments through Slack webhook integration.

![random-list](random-daily.png)

## Description

Random Daily provides two main functions:
- **Random List**: Shuffles team member names for daily standup ordering
- **On-Call Rotation**: Automatically selects the on-call person based on week number rotation

Both functions integrate with Slack workflows to automatically post results to designated channels.

## Setup Instructions

### Development Setup

1. Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd random-daily
npm install
```

2. The application consists of two serverless functions in the `/api` directory:
   - `index.js` - Handles random list generation
   - `on-call.js` - Handles weekly on-call rotation

### Slack Integration Setup

1. In Slack, navigate to `Tools > Workflow Builder`
2. Create a new Workflow with a descriptive name
3. Select **Webhook** as the trigger
4. Add a variable named `text` with one of these options:
   - `r_list` for the random list endpoint
   - `name` for the on-call endpoint
5. Add a **Send a message** step after the webhook
6. Select your target channel
7. Insert the variable into your message template
8. Publish the workflow and copy the webhook URL for later use

### Deployment

Deploy the serverless functions to your preferred platform (e.g., Vercel, Netlify, AWS Lambda). The functions are ready to deploy as-is.

## API Usage

### Random List Endpoint

Shuffles team members and posts to Slack:

```
GET /api?members=<member1>,<member2>,<member3>&url=<slack-webhook-url>
```

**Parameters:**
- `members`: Comma-separated list of team member names
- `url`: Slack webhook URL from your workflow

**Example:**
```
https://your-domain.com/api?members=mario,luigi,peach&url=https://hooks.slack.com/workflows/...
```

### On-Call Rotation Endpoint

Selects on-call person based on current week number:

```
GET /api/on-call?members=<member1>,<member2>,<member3>&url=<slack-webhook-url>
```

**Parameters:**
- `members`: Comma-separated list of team member names
- `url`: Slack webhook URL from your workflow

**Example:**
```
https://your-domain.com/api/on-call?members=mario,luigi,peach&url=https://hooks.slack.com/workflows/...
```

## Automation Setup

### Scheduled Execution

Use a cloud scheduler to trigger the endpoints automatically:

**Recommended Services:**
- Google Cloud Scheduler
- AWS EventBridge
- Vercel Cron Jobs
- EasyCron

**Suggested Schedule:**
- Random List: Daily at standup time (e.g., 9:00 AM weekdays)
- On-Call Rotation: Weekly on Mondays

### Testing

After setting up your cron jobs:
1. Use the test/manual trigger feature in your scheduler
2. Verify the message appears in your designated Slack channel
3. Check that the randomization or rotation logic works as expected

## Running Tests

Currently no automated tests are configured. To validate functionality:

1. Test endpoints manually using the URLs above
2. Verify Slack integration works correctly
3. Confirm rotation logic by testing across different weeks

## Troubleshooting

### Common Issues

- **"Error: no test specified"**: This is expected - no automated tests are currently configured
- **Webhook not posting to Slack**: Verify the webhook URL is correct and the Slack workflow is published
- **Members parameter not working**: Ensure names are comma-separated with no spaces around commas
- **On-call rotation not cycling**: The rotation is based on ISO week numbers starting Monday
