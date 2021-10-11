module.exports = async(client, err, origin) => {
    client._logger.log('error', `Uncaught exception encountered, details: ${err.toString()} - origin: ${origin}`);
    await client.destroy();
    process.exit(1);
}