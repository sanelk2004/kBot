module.exports.run = async(client, interaction) => {
    await interaction.deferReply();
    let member;
    if (interaction.options.getMember("member") == null) {
        member = interaction.user;
    } else {
        member = interaction.options.getMember("member").user;
    }
    await interaction.editReply({content: member.displayAvatarURL({dynamic: true, size: 512})});
}

module.exports.commandData = {
    name: 'avatar',
    description: 'Get the link to your user avatar',
    type: 1,
    options: [
        {
            type: 6,
            name: "member",
            description: "The member whose avatar you wish to view",
            required: false
        }
    ]
}