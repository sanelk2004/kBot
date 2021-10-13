const config = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, interaction) => {
    await interaction.deferReply({ephemeral: true});
    let result;
    let embed = new MessageEmbed();
    try {
        result = eval(interaction.options.getString("code"));
        embed.setColor("GREEN");
        embed.setTitle("JavaScript eval() results");
        embed.addField("Success?", "Yes", true);
    } catch (e) {
        result = e;
        embed.setColor("RED");
        embed.setTitle("JavaScript eval() results");
        embed.addField("Success?", "No", true);
    }
    embed.setDescription(`\`\`\`js\n${result.toString()}\n\`\`\``);
    await interaction.editReply({embeds: [embed], ephemeral: true});
}

module.exports.commandData = {
    name: 'eval',
    description: 'Evaluates JavaScript code (bot developer use only)',
    type: 1,
    options: [
        {
            type: 3,
            name: 'code',
            description: 'The JavaScript code to execute',
            required: true
        }
    ]
}

module.exports.permissions = async(client, interaction) => {
    let developerID = config.developer_users.find(element => element == interaction.user.id);
    if (developerID !== undefined) return true;
    else return false;
}