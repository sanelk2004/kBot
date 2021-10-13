module.exports = async(client, interaction) => {
    if (!interaction.isCommand()) return;

    const cmd = client.commandcontainer.get(interaction.commandName);
    if (!cmd) return;

    if (cmd.permissions !== undefined) {
        let allowed = await cmd.permissions(client, interaction);
        if (!allowed) {
            if (interaction.replied) {
                await interaction.followUp({content: 'Sorry, you do not have the proper permissions to use this command.', ephemeral: true});
            } else if (interaction.deferred) {
                await interaction.editReply({content: 'Sorry, you do not have the proper permissions to use this command.', ephemeral: true});
            } else {
                await interaction.reply({content: 'Sorry, you do not have the proper permissions to use this command.', ephemeral: true});
            }
            return;
        }
    }

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