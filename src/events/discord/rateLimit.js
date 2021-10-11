module.exports = async(client, rateLimitData) => {
    client._logger.log('warn', `Discord API ratelimit reached! Timeout ${rateLimitData.timeout}ms, limit ${rateLimitData.limit}, route ${rateLimitData.route}, path ${rateLimitData.path}, method ${rateLimitData.method}, is global = ${rateLimitData.global}`);
}