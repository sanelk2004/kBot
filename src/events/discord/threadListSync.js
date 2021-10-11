module.exports = async(client, threads) => {
    client._logger.log('info', 'Gained access to new threads, attempting to join...');
    var total_threads, threads_success, threads_fail = 0;
    total_threads = threads.size;
    threads.forEach((value, key) => {
        try {
            value.join();
            threads_success++;
        } catch (e) {
            threads_fail++;
        }
    });
    client._logger.log('info', `Discovered ${total_threads} new threads, successfully joined ${threads_success} threads, failed to join ${threads_fail} threads`);
}