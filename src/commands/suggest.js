const { WebhookClient, MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports.run = async(client, interaction) => {
    await interaction.deferReply();
    let suggestDetails = interaction.options.getString("details");
    let suggestWhUrl = config.discord_suggest_webhook;
    let suggestEmbed = new MessageEmbed();
    suggestEmbed.setTitle("New suggestion!");
    suggestEmbed.setColor("FUCHSIA");
    suggestEmbed.setDescription(`\`\`\`\n${suggestDetails}\n\`\`\``);
    suggestEmbed.setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({dynamic: true, size: 256}));
    suggestEmbed.addFields([
        {name: "Suggested by", value: `${interaction.user.tag}`, inline: true},
        {name: "Suggester ID", value: `${interaction.user.id}`, inline: true}
    ]);
    suggestEmbed.setTimestamp(new Date());
    suggestEmbed.setFooter("A user has made a suggestion to kBot!");

    let whc = new WebhookClient({url: suggestWhUrl});
    whc.send({embeds: [suggestEmbed]}).then(async() => {
        await interaction.editReply({content: "Your suggestion has been successfully sent!"});
    }).catch(async(err) => {
        client._logger.log('error', `Error while submitting suggestion: ${err}`);
        await interaction.editReply({content: "There was an error while submitting your suggestion."});
    })
}

module.exports.commandData = {
    name: 'suggest',
    description: 'Suggest a new feature to be added to kBot',
    type: 1,
    options: [
        {
            type: 3,
            name: "details",
            description: "Provide details about the suggestion",
            required: true
        }
    ]
}