module.exports = async(client) => {
    client._logger.log('error', 'Session has been invalidated, exiting gracefully...');
    await client.destroy();
    process.exit(0);
}