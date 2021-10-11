module.exports = async(client, command) => {
    client._logger.log('info', `Registered command ${command.name}, type ${command.type.toString()}, guild ID ${command.guildId || null}`)
}