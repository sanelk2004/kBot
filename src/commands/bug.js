const { WebhookClient, MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports.run = async(client, interaction) => {
    await interaction.deferReply();
    let bugDetails = interaction.options.getString("details");
    let bugReportWhUrl = config.discord_bug_report_webhook;
    let bugReportEmbed = new MessageEmbed();
    bugReportEmbed.setTitle("New bug report!");
    bugReportEmbed.setColor("RED");
    bugReportEmbed.setDescription(`\`\`\`\n${bugDetails}\n\`\`\``);
    bugReportEmbed.setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({dynamic: true, size: 256}));
    bugReportEmbed.addFields([
        {name: "Reported by", value: `${interaction.user.tag}`, inline: true},
        {name: "Reporter ID", value: `${interaction.user.id}`, inline: true}
    ]);
    bugReportEmbed.setTimestamp(new Date());
    bugReportEmbed.setFooter("A user has reported a bug in kBot!");

    let whc = new WebhookClient({url: bugReportWhUrl});
    whc.send({embeds: [bugReportEmbed]}).then(async() => {
        await interaction.editReply({content: "Your bug report has been successfully sent!"});
    }).catch(async(err) => {
        client._logger.log('error', `Error while submitting bug report: ${err}`);
        await interaction.editReply({content: "There was an error while submitting your bug report."});
    })
}

module.exports.commandData = {
    name: 'bug',
    description: 'Report a bug in kBot to the developers',
    type: 1,
    options: [
        {
            type: 3,
            name: "details",
            description: "Provide details about the bug",
            required: true
        }
    ]
}