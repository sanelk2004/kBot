module.exports = async(client, err) => {
    client._logger.log('error', `A Discord error has occurred: ${err.toString()}`);
}