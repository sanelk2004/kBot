module.exports = async(client, thread) => {
    client._logger.log('info', 'New thread has been created, attempting to join...');
    try {
        thread.join();
    } catch (e) {
        client._logger.log('error', `Failed to join new thread, details: ${e}`);
    }
}