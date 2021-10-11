module.exports = async(client, guild) => {
    client._logger.log('warn', `Guild ${guild.name} (ID: ${guild.id}, owner ID: ${guild.ownerId}) has become unavailable, Discord may be experiencing technical difficulties, check status page at https://discordstatus.com`)
}