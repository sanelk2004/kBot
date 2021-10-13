const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports.run = async(client, interaction) => {
    await interaction.deferReply({ephemeral: true});
    const guilds_list = new MessageEmbed();
    guilds_list.setTitle("Guilds that kBot is in");
    guilds_list.setColor("AQUA");
    let guilds_name_string = "";
    let guilds_id_string = "";
    let guilds_owner_string = "";
    client.guilds.cache.each((guild) => {
        if (guild.id == config.home_base) {
            guilds_name_string += `\`*\` ${guild.name}\n`;
        } else {
            guilds_name_string += `\`+\` ${guild.name}\n`;
        }
        guilds_id_string += `${guild.id}\n`;
        guilds_owner_string += `${guild.ownerId}\n`;
    });
    guilds_list.addField("Guild Name", guilds_name_string, true);
    guilds_list.addField("Guild ID", guilds_id_string, true);
    guilds_list.addField("Guild Owner ID", guilds_owner_string, true);
    guilds_list.setDescription("`*` = kBot's home base server\n`+` = regular server");
    await interaction.editReply({embeds: [guilds_list], ephemeral: true});
}

module.exports.commandData = {
    name: 'guilds',
    description: 'Shows a list of all the guilds the bot is in (bot developer use only)',
    type: 1
}