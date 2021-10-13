// command that lets bot developers generate an invite link to any server the bot is in
// useful for support purposes, such as to diagnose bugs
const config = require('../config.json');
const { Permissions } = require('discord.js');

module.exports.run = async(client, interaction) => {
    await interaction.deferReply({ephemeral: true});
    let target_guild = client.guilds.resolve(interaction.options.getString("serverid"));
    if (target_guild === undefined || target_guild === null) {
        await interaction.editReply({content: 'Could not find that guild.', ephemeral: true});
        return;
    }
    if (!target_guild.available) {
        await interaction.editReply({content: 'That guild is not available. A Discord outage may be occurring.', ephemeral: true});
        return;
    }
    
    target_guild.fetch().then(async (guild) => {
        if (guild.vanityURLCode) {
            client._logger.log('info', `Generated partycrash invite for guild ${guild.name} (ID: ${guild.id}) - ${guild.vanityURLCode}`);
            await interaction.editReply({content: `https://discord.gg/${guild.vanityURLCode}`, ephemeral: true});
            return;
        }

        if (!guild.me.permissions.has(Permissions.FLAGS.CREATE_INSTANT_INVITE)) {
            await interaction.editReply({content: 'I do not have permissions to create invites in that guild.', ephemeral: true});
            return;
        }

        guild.channels.fetch().then(async (guild_channels) => {
            let first_channel = guild_channels.randomKey();
            guild.invites.create(first_channel, {maxUses: 1, unique: true}).then(async (invite) => {
                client._logger.log('info', `Generated partycrash invite for guild ${guild.name} (ID: ${guild.id}) - ${invite.code}`);
                await interaction.editReply({content: `https://discord.gg/${invite.code}`, ephemeral: true});
                return;
            }).catch(async (err) => {
                client._logger.log('error', `Error generating partycrash invite: ${err}`);
                await interaction.editReply({content: 'Failed to generate server invite', ephemeral: true});
                return;
            });
        }).catch(async (err) => {
            client._logger.log('error', `Error fetching channels from guild ${guild.name} (ID: ${guild.id}) for partycrash: ${err}`);
            await interaction.editReply({content: 'Failed to get server channels list', ephemeral: true});
            return;
        });
    }).catch(async (err) => {
        client._logger.log('error', `Error resolving guild for partycrash invite: ${err}`);
        await interaction.editReply({content: 'Failed to resolve server', ephemeral: true});
        return;
    });
}

module.exports.commandData = {
    name: 'partycrash',
    description: 'Allows bot developers to generate an instant invite to any server the bot is in',
    type: 1,
    options: [
        {
            type: 3,
            name: 'serverid',
            description: 'The ID of the server to generate an invite for',
            required: true
        }
    ]
}

module.exports.permissions = async(client, interaction) => {
    let developerID = config.developer_users.find(element => element == interaction.user.id);
    if (developerID !== undefined) return true;
    else return false;
}