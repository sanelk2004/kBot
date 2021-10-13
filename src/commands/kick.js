const { Permissions } = require('discord.js');

module.exports.run = async(client, interaction) => {
    await interaction.deferReply();
    if (!interaction.guild.available) {
        await interaction.editReply({content: 'That guild is not available. A Discord outage may be occurring.', ephemeral: true});
        return;
    }

    let victim = interaction.options.getMember("user");
    let kickReason = interaction.options.getString("reason");
    if (kickReason === null) {
        kickReason = "No reason provided.";
    }
    if (victim.id === client.user.id) {
        await interaction.editReply({content: "I can't kick myself, silly!"});
        return;
    }
    if (victim.id == interaction.user.id) {
        await interaction.editReply({content: "You can't kick yourself, silly!"});
        return;
    }
    victim.kick({reason: kickReason}).then(async() => {
        await interaction.editReply({content: "Successfully kicked that user"});
    }).catch(async(err) => {
        client._logger.log('error', `Error kicking user: ${err}`);
        await interaction.editReply({content: "Error kicking that user. Make sure that kBot has the Kick Members permission and that the kBot role is placed higher than the role of the user you wish to kick in Server Settings -> Roles."});
    })
}

module.exports.commandData = {
    name: 'kick',
    description: 'Kicks a user from the server',
    type: 1,
    options: [
        {
            type: 6,
            name: 'user',
            description: 'The user to kick',
            required: true
        },
        {
            type: 3,
            name: 'reason',
            description: 'The reason the user is getting kicked from the server',
            required: false
        }
    ]
}

module.exports.permissions = async(client, interaction) => {
    if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) || 
        !interaction.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
        return false;
    } else {
        return true;
    }
}