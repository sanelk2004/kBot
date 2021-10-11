module.exports = async(client, warning) => {
    client._logger.log('warn', `Discord warning: ${warning}`);
}