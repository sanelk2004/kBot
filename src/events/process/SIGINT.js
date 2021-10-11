module.exports = async(client) => {
    client._logger.log('info', 'SIGINT encountered, quitting gracefully...');
    await client.destroy();
    process.exit(0);
}