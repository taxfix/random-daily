# Name randomizer for standups and on-call rotation slack message publisher 
This code is for creating a webhook that triggers:
* Name list randomizer and publishes it to a URL
* Name rotation based on the week number of the year

## Randomizer Setup

### Slack 
1. On the Slack menu, select `Tools > Workflow Builder`
2. Create a new Workflow and come up with a name
3. Select Webhook from the list
4. Add the `r_list` variable as `text`
5. Add a new step after the Webhook `Send a message`
6. Pick the channel where you want to send the message
7. Add a message and insert the previously created variable and save
8. Publish it (top right button) and copy the `URL` because you'll need it later on

### Creating a serverless function
You can either use a serverless function already created by one of your teams or create a new one using a service like [Vercel][https://vercel.com/docs/serverless-functions/introduction].

### Cron Job for continuous excecution
The idea is to use a cloud scheduler for runing this task every morning or at the time of your daily.

We used [EasyCron][https://www.easycron.com/] and configured:

#### URL to call:
https://<cloud function service>/api?members=Name01,Mane02,Mane03&url=<URL from Slack>

#### When to excecute:
`Select manually` and added the time and days of the week we wanted this to be triggered.

#### Test
Hit the test button after saving the cron job and check your slack channel.


## On-call rotation setup
WIP