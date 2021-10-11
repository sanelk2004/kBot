module.exports = async(client, reason, promise) => {
    client._logger.log('warn', `Unhandled Promise rejection encountered. Details: ${promise.toString()}, reason: ${reason}`);
}