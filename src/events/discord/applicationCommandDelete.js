module.exports = async(client, command) => {
    client._logger.log('info', `Command ${command.name || null} deleted`);
}