module.exports = async(client, guild) => {
    client._logger.log('info', `Bot has joined guild ${guild.name} (ID: ${guild.id}, owner ID: ${guild.ownerId}) - member count ${guild.memberCount}`);
    client._logger.log('info', 'Updating bot presence data...');
    client.user.setPresence({activities: [{type: "WATCHING", name: `${client.guilds.cache.size} servers | ${client.commandcontainer.size} registered commands | https://kbot.sanelkukic.us.eu.org`}], status: 'online'});
}