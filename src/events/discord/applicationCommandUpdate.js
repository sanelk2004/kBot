module.exports = async(client, oldCommand, newCommand) => {
    client._logger.log('info', `Command updated - old name ${oldCommand.name || null}, new name ${newCommand.name || null}`);
}