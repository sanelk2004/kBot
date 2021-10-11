module.exports = (client) => {
    client._logger.log('info', 'SIGTERM encountered, quitting...');
    process.exit(0);
}