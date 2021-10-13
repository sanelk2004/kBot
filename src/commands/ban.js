const { Permissions } = require('discord.js');

module.exports.run = async(client, interaction) => {
    await interaction.deferReply();
    if (!interaction.guild.available) {
        await interaction.editReply({content: 'That guild is not available. A Discord outage may be occurring.', ephemeral: true});
        return;
    }

    let victim = interaction.options.getMember("user");
    let banReason = interaction.options.getString("reason");
    if (banReason === null) {
        banReason = "No reason provided.";
    }
    if (victim.id == client.user.id) {
        await interaction.editReply({content: "I can't ban myself, silly!"});
        return;
    }
    if (victim.id == interaction.user.id) {
        await interaction.editReply({content: "You can't ban yourself, silly!"});
        return;
    }
    victim.ban({reason: banReason}).then(async() => {
        await interaction.editReply({content: "Successfully banned that user"});
    }).catch(async(err) => {
        client._logger.log('error', `Error banning user: ${err}`);
        await interaction.editReply({content: "Error banning that user. Make sure that kBot has the Ban Members permission and that the kBot role is placed higher than the role of the user you wish to ban in Server Settings -> Roles."});
    })
}

module.exports.commandData = {
    name: 'ban',
    description: 'Bans a user from the server',
    type: 1,
    options: [
        {
            type: 6,
            name: 'user',
            description: 'The user to ban',
            required: true
        },
        {
            type: 3,
            name: 'reason',
            description: 'The reason the user is getting banned from the server',
            required: false
        }
    ]
}

module.exports.permissions = async(client, interaction) => {
    if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS) || 
        !interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
        return false;
    } else {
        return true;
    }
}