module.exports = async(client, guild) => {
    client._logger.log('info', `Bot has joined guild ${guild.name} (ID: ${guild.id}, owner ID: ${guild.ownerId}) - member count ${guild.memberCount}`);
}