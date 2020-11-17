# Random Daily 🌅
> Name randomizer for standups and on-call rotation slack message publisher

![random-list](random-daily.png)

This code is for creating a webhook that triggers:
* Name list randomizer and publishes it to a URL
* Name rotation based on the week number of the year

## Randomizer Setup

### Slack 
1. On the Slack menu, select `Tools > Workflow Builder`
2. Create a new Workflow and come up with a name
3. Select Webhook from the list
4. Add a variable as `text`
  - `r_list` for the random list endpoint.
  - `name` for the on-call endpoint.
5. Add a new step after the Webhook `Send a message`
6. Pick the channel where you want to send the message
7. Add a message and insert the previously created variable and save
8. Publish it (top right button) and copy the `URL` because you'll need it later on

### Creating a serverless function
You can either use a serverless function already created by one of your teams or create a new one using a service like [Vercel](https://vercel.com/docs/serverless-functions/introduction).

### Cron Job for continuous excecution
The idea is to use a cloud scheduler for running this task every morning or at the time of your daily. In the case of the _on-call_ we like to run it every monday.

We're using [Google Cloud Scheduler](https://console.cloud.google.com/cloudscheduler) for this, but you could also use [EasyCron](https://www.easycron.com/)

#### URL to call:

##### random list

https://\<cloud function service>/api?members=mario,luigi,peach&url=\<URL-from-Slack>

Live url: https://random-daily.vercel.app/api/?members=mario,luigi,peach&url=

##### on-call

https://\<cloud function service>/api/on-call?members=Name01,Mane02,Mane03&url=\<URL-from-Slack>

Live url: https://random-daily.vercel.app/api/on-call?members=mario,luigi,peach&url=

#### When to excecute:
`Select manually` and added the time and days of the week we wanted this to be triggered.

#### Test
Hit the test button after saving the cron job and check your slack channel.
