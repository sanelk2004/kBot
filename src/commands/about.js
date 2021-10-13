const { MessageEmbed, version } = require('discord.js');
const os = require('os');

module.exports.run = async(client, interaction) => {
    await interaction.deferReply();
    const about_embed = new MessageEmbed();
    about_embed.setTitle("About kBot");
    about_embed.setColor("LUMINOUS_VIVID_PINK");
    about_embed.setDescription("A unique multi-function bot");
    about_embed.setFooter("Developed by Sanel Kukic | https://github.com/sanelk2004/kBot");
    const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`
    let rawUsageData = process.memoryUsage();
    let memUsageString = `\`\`\`\nrss = ${formatMemoryUsage(rawUsageData.rss)}\nheapTotal = ${formatMemoryUsage(rawUsageData.heapTotal)}\nheapUsed = ${formatMemoryUsage(rawUsageData.heapUsed)}\nexternal = ${formatMemoryUsage(rawUsageData.external)}\narrayBuffers = ${formatMemoryUsage(rawUsageData.arrayBuffers)}\n\`\`\``;
    const formatUptime = (uptimeData) => {
        const pad = (s) => {
            return (s < 10 ? '0' : '') + s;
        }

        var hours = Math.floor(uptimeData / (60*60));
        var minutes = Math.floor(uptimeData % (60*60) / 60);
        var seconds = Math.floor(uptimeData % 60);

        return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
    }
    about_embed.addFields([
        {name: "Discord.js version", value: `\`${version}\``, inline: true},
        {name: "Node.js version", value: `\`${process.version}\``, inline: true},
        {name: "OS version", value: `\`${os.version()}\``, inline: true},
        {name: "Memory usage", value: memUsageString, inline: false},
        {name: "Uptime", value: `\`${formatUptime(process.uptime())}\``, inline: true}
    ]);
    await interaction.editReply({embeds: [about_embed]});
}

module.exports.commandData = {
    name: 'about',
    description: 'Gives information about the bot',
    type: 1
}