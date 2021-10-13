module.exports.run = async(client, interaction) => {
    let botId = client.application.id;
    let inviteMsg = `Add me to your server using this link!\n\n<https://discord.com/api/oauth2/authorize?client_id=${botId}&scope=bot+applications.commands&permissions=8>`;
    await interaction.reply({content: inviteMsg, ephemeral: true});
}

module.exports.commandData = {
    name: 'invite',
    description: 'Get a URL to add kBot to your server!',
    type: 1
}