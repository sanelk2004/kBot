const config = require('../config.json');

module.exports.run = async(client, interaction) => {
    await interaction.deferReply({ephemeral: true});
    let cmdName = interaction.options.getString("command");
    try {
        client.commandcontainer.delete(cmdName);
        delete require.cache[require.resolve(`./${cmdName}`)];
        let newCmd = require(`./${cmdName}`);
        client.commandcontainer.set(newCmd.commandData.name, newCmd);
        client._logger.log('info', `Successfully reloaded command ${cmdName}`);
        await interaction.editReply({content: 'Successfully reloaded that command.', ephemeral: true});
    } catch (e) {
        client._logger.log('error', `Failed to reload command ${cmdName}: ${e}`);
        await interaction.editReply({content: 'Failed to reload that command.', ephemeral: true});
    }
}

module.exports.commandData = {
    name: 'reload',
    description: 'Reloads a command (bot developer use only)',
    type: 1,
    options: [
        {
            type: 3,
            name: 'command',
            description: 'The name of the command to reload',
            required: true
        }
    ]
}

module.exports.permissions = async(client, interaction) => {
    let developerID = config.developer_users.find(element => element == interaction.user.id);
    if (developerID !== undefined) return true;
    else return false;
}