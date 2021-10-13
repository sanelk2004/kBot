const { MessageEmbed, UserFlags } = require('discord.js');

module.exports.run = async(client, interaction) => {
    await interaction.deferReply();
    const aboutEmbed = new MessageEmbed();
    aboutEmbed.setColor("BLUE");
    let member;
    if (interaction.options.getMember("member") == null) {
        member = interaction.user;
    } else {
        member = interaction.options.getMember("member").user;
    }

    await member.fetch();
    await member.fetchFlags();

    let userFlags = "```\n";
    if (member.flags.has(UserFlags.FLAGS.DISCORD_EMPLOYEE)) userFlags += "- Discord Employee\n";
    if (member.flags.has(UserFlags.FLAGS.PARTNERED_SERVER_OWNER)) userFlags += "- Partnered Server Owner\n";
    if (member.flags.has(UserFlags.FLAGS.HYPESQUAD_EVENTS)) userFlags += "- HypeSquad Events\n";
    if (member.flags.has(UserFlags.FLAGS.BUGHUNTER_LEVEL_1)) userFlags += "- Bug Hunter Lvl 1\n";
    if (member.flags.has(UserFlags.FLAGS.HOUSE_BRAVERY)) userFlags += "- House of Bravery\n";
    if (member.flags.has(UserFlags.FLAGS.HOUSE_BRILLIANCE)) userFlags += "- House of Brilliance\n";
    if (member.flags.has(UserFlags.FLAGS.HOUSE_BALANCE)) userFlags += "- House of Balance\n";
    if (member.flags.has(UserFlags.FLAGS.EARLY_SUPPORTER)) userFlags += "- Early Supporter\n";
    if (member.flags.has(UserFlags.FLAGS.TEAM_USER)) userFlags += "- Team User\n";
    if (member.flags.has(UserFlags.FLAGS.BUGHUNTER_LEVEL_2)) userFlags += "- Bug Hunter Lvl 2\n";
    if (member.flags.has(UserFlags.FLAGS.VERIFIED_BOT)) userFlags += "- Verified Bot User\n";
    if (member.flags.has(UserFlags.FLAGS.EARLY_VERIFIED_BOT_DEVELOPER)) userFlags += "- Early Verified Bot Developer\n";
    if (member.flags.has(UserFlags.FLAGS.DISCORD_CERTIFIED_MODERATOR)) userFlags += "- Discord Certified Moderator\n";
    if (userFlags === "```\n") userFlags += "No flags found\n";
    userFlags += "\n```";
    let bannerURL = member.bannerURL({dynamic: true});
    if (bannerURL == null) bannerURL = "This user does not have a profile banner";
    aboutEmbed.setTitle(`About this member`);
    aboutEmbed.setDescription(`<@${member.id}>`);
    aboutEmbed.setAuthor(member.tag, member.displayAvatarURL({dynamic: true, size: 256}));
    aboutEmbed.setThumbnail(member.displayAvatarURL({dynamic: true, size: 256}));
    let memberHexColor = member.hexAccentColor || null;
    if (memberHexColor == null) {
        memberHexColor = "#000000";
    }
    aboutEmbed.setColor(memberHexColor);
    aboutEmbed.addFields([
        {name: "Username", value: member.username, inline: true},
        {name: "Discriminator", value: member.discriminator, inline: true},
        {name: "ID", value: member.id, inline: true},
        {name: "Flags", value: userFlags, inline: false},
        {name: "Is a bot?", value: `${member.bot ? "Yes" : "No"}`, inline: true},
        {name: "Banner", value: `${bannerURL}`, inline: true},
        {name: "Banner Accent Color", value: `${memberHexColor}`, inline: true},
        {name: "Created account on", value: `${member.createdAt.toString()}`, inline: true}
    ]);
    await interaction.editReply({embeds: [aboutEmbed]});
}

module.exports.commandData = {
    name: 'userinfo',
    description: 'Get information about your user account',
    type: 1,
    options: [
        {
            type: 6,
            name: 'member',
            description: 'The member to get information about',
            required: false
        }
    ]
}