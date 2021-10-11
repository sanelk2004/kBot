module.exports = async(client, invalidRequestInfo) => {
    client._logger.log('warn', `Invalid request, count ${invalidRequestInfo.count}, time remaining ${invalidRequestInfo.remainingTime}`);
}