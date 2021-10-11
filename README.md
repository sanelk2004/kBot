# kBot
A Discord bot with a few unique features. Some of these features I added because I rely on them a lot.

## Features
All features with an asterisk (`*`) next to them are currently in development and not yet available.

- `*` NASA API integration (view pictures from the Curiosity, Opportunity, and Spirit rovers and the astronomy image of the day)
- `*` USASpending.gov integration (view data on how much money the U.S. federal government is spending, data is sourced directly from the U.S. federal government)
- `*` NOTAM viewer (allows you to view Notices to Airmen, data is sourced directly from the Federal Aviation Administration)

## Invite kBot to your server today!

**kBot is still under heavy development and therefore most of the features listed above will not be available currently!**

[Click here](https://discord.com/api/oauth2/authorize?client_id=896935097859735552&permissions=517647686721&scope=bot%20applications.commands) to add kBot to your server today!

## Setting up a development environment
Prerequisites:
- Git
- Node.js
- npm or yarn
- Discord bot application (you can create this in the [Discord Developer Portal](https://discord.com/developers))

Steps:
- Clone this repository
- `cd` into the `src/` folder, and run `yarn install` (or `npm install` if you're using npm)
- Edit `config.example.json` and populate it with your respective tokens and values
- Rename `config.example.json` to `config.json`
- Run `yarn start` or `npm start` to start the bot.

### Configuration documentation
Here is roughly what all the different values in the configuration mean.

- `discord_token` is your Discord bot token. You can get this from the Discord Developer Portal
- `home_base` is the ID of the server that will be the "home base" of the bot.
- `home_base_invite` is a Discord invite code (without the `discord.gg/` part) that the bot will post when a user of the bot runs `/help`
- `use_discord_webhook` is a boolean (true/false) that represents whether or not you want to log things to a Discord webhook. Defaults to false.
- `discord_logging_webhook` is the URL to a Discord webhook that will be used to log events. Only set this value if you set `use_discord_webhook` to true, otherwise this value will be ignored.
- `developer_users` is an array of Discord user IDs that will have elevated privileges in certain commands. For example, any user ID in this array will be able to run the `/eval` command and execute arbitrary JavaScript code from within Discord. It is recommended that you add your own Discord user ID into this array.

## License
This project is licensed under the terms and conditions of the MIT License. You can view the full license text in the [LICENSE.txt](./LICENSE.txt) file in this repository's root folder.