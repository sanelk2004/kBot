module.exports = async(client, debuginfo) => {
    client._logger.log('debug', `Debug info from Discord: ${debuginfo}`);
}