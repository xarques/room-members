### Room members Bot for Slack
Display the members of the current Slack room in a Table ordered by TimeZone

## Creating a Slack Slash command for your channel
* `npm install `
* `claudia create --region eu-west-1 --api-module bot` or `npm run-script create`
* Follow the instructions from [Slack API Docs](https://tete-dans-le-nuage.slack.com/apps/new/A0F82E8CA-slash-commands) to create a slash command for your team.
* Use `claudia update --configure-slack-slash-command` or `npm run-script configure-slack` to configure the token.

## Update your Slack Slash command for your channel
* Use `claudia update` or `npm run-script deploy`
