module.exports = async(client, guild) => {
    client._logger.log('info', `Bot has left guild ${guild.name} (ID: ${guild.id}, owner ID: ${guild.ownerId}) - member count ${guild.memberCount}`);
}