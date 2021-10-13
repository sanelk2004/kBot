const { Client, Collection, Intents, version } = require('discord.js');
const fs = require('fs');
const { format, createLogger, transports } = require('winston');
const DiscordLogger = require('winston-discord');

const config = require('./config.json');

const commands = new Collection();

const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.DIRECT_MESSAGES
], partials: ["CHANNEL"]});

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.align(),
        format.printf(info => `[${info.timestamp}] [${info.level}]: ${info.message}`)
    ),
    defaultMeta: {
        service: 'kbot',
        bot_version: require('./package.json').version,
        discordjs_version: version
    },
    transports: [
        new transports.File({filename: './logs/error.log', level: 'error'}),
        new transports.File({filename: './logs/combined.log'}),
        new transports.File({filename: './logs/debug.log', level: 'debug'}),
        new transports.Console()
    ]
});

if (config.use_discord_webhook) {
    const discord_logging_webhook_id = config.discord_logging_webhook.split('/')[5];
    const discord_logging_webhook_token = config.discord_logging_webhook.split('/')[6];
    logger.add(new (DiscordLogger)({webhooks: {id: discord_logging_webhook_id, token: discord_logging_webhook_token}}))
}

client.commandcontainer = commands;
client._logger = logger;

const boot = async () => {
    logger.log('info', 'Loading commands...');
    const commands = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    commands.forEach(commandFile => {
        const commandName = commandFile.split('.')[0];
        const command = require(`./commands/${commandName}`);
        logger.log('info', `Loaded command ${commandName}`);
        client.commandcontainer.set(command.commandData.name, command);
    });
    logger.log('info', 'Finished loading commands');

    logger.log('info', 'Loading Discord event handlers...');
    const discordEvents = fs.readdirSync('./events/discord').filter(file => file.endsWith('.js'));
    discordEvents.forEach(discordEventFile => {
        const discordEventName = discordEventFile.split('.')[0];
        const discordEvent = require(`./events/discord/${discordEventName}`);
        logger.log('info', `Loaded Discord event handlers ${discordEventName}`);
        client.on(discordEventName, discordEvent.bind(null, client));
    });
    logger.log('info', 'Finished loading Discord event handlers');

    logger.log('info', 'Loading Node.js process event handlers...');
    const processEvents = fs.readdirSync('./events/process').filter(file => file.endsWith('.js'));
    processEvents.forEach(processEventFile => {
        const processEventName = processEventFile.split('.')[0];
        const processEvent = require(`./events/process/${processEventName}`);
        logger.log('info', `Loaded Node.js process event handler ${processEventName}`);
        process.on(processEventName, processEvent.bind(null, client));
    });
    logger.log('info', 'Finished loading Node.js process event handlers');

    logger.log('info', 'Connecting to Discord...');
    client.login(config.discord_token);
}

boot();