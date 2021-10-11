const config = require('../../config.json');

module.exports = async(client) => {
    client._logger.log('info', 'Connected to Discord API successfully');
    client._logger.log('info', 'Registering commands...');
    client.commandcontainer.forEach((value, key) => {
        if (process.env.NODE_ENV === 'production') {
            client.application.commands.create(value.commandData).then(() => {
                client._logger.log('info', `Registered global command ${key}`);
            }).catch((err) => {
                client._logger.log('error', `Global command ${key} failed to register: ${err}`);
            })
        } else {
            client.application.commands.create(value.commandData, config.home_base).then(() => {
                client._logger.log('info', `Registered guild command ${key} in guild ${config.home_base}`);
            }).catch((err) => {
                client._logger.log('error', `Guild command ${key} failed to register: ${err}`);
            });
        }
    })
    client._logger.log('info', 'Updating bot presence data...');
    client.user.setPresence({activities: [{type: "WATCHING", name: `${client.guilds.cache.size} servers | https://kbot.sanelkukic.us.eu.org`}], status: 'online'});
}