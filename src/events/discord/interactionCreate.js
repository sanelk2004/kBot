module.exports = async(client, interaction) => {
    if (!interaction.isCommand()) return;

    const cmd = client.commandcontainer.get(interaction.commandName);
    if (!cmd) return;

    try {
        await cmd.run(client, interaction);
    } catch (e) {
        client._logger.log('error', `Error encountered when executing interaction: ${e}`);
        if (interaction.replied) {
            interaction.followUp({content: 'An error has occurred with your request. Please try again later.', ephemeral: true});
        } else if (interaction.deferred) {
            interaction.editReply({content: 'An error has occurred with your request. Please try again later.', ephemeral: true});
        } else {
            interaction.reply({content: 'An error has occurred with your request. Please try again later.', ephemeral: true});
        }
    }
}