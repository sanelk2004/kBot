module.exports.run = async(client, interaction) => {
    await interaction.deferReply();
    if (!interaction.guild.available) {
        await interaction.editReply({content: "There seems to be a Discord outage and this server isn't available."});
        return;
    }

    await interaction.editReply({content: interaction.guild.iconURL({dynamic: true, size: 512})});
}

module.exports.commandData = {
    name: 'servericon',
    description: 'Get the current server\'s icon',
    type: 1
}