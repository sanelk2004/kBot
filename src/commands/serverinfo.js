const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, interaction) => {
    await interaction.deferReply();
    const serverEmbed = new MessageEmbed();
    const _guild = interaction.guild;
    if (!_guild.available) {
        await interaction.editReply({content: 'It seems that this guild is experiencing a Discord outage and is unavailable. Please try again later.'});
        return;
    }

    await _guild.fetch();
    let guildOwner = await _guild.fetchOwner();

    let guildDescription = _guild.description || "No description set";
    let guildDiscoverySplash = _guild.discoverySplashURL() || null;
    let guildBanner = _guild.bannerURL() || null;

    let guild_features = _guild.features;
    let guild_features_string = "```\n";
    if (guild_features.includes("ANIMATED_ICON")) guild_features_string += "- Animated Server Icon\n";
    if (guild_features.includes("BANNER")) guild_features_string += "- Server Banner\n";
    if (guild_features.includes("COMMERCE")) guild_features_string += "- Server Commerce\n";
    if (guild_features.includes("COMMUNITY")) guild_features_string += "- Community Server\n";
    if (guild_features.includes("DISCOVERABLE")) guild_features_string += "- Server Discovery\n";
    if (guild_features.includes("FEATURABLE")) guild_features_string += "- Featurable\n";
    if (guild_features.includes("INVITE_SPLASH")) guild_features_string += "- Invite Splash Screen\n";
    if (guild_features.includes("MEMBER_VERIFICATION_GATE_ENABLED")) guild_features_string += "- Member Verification Gate\n";
    if (guild_features.includes("NEWS")) guild_features_string += "- News Channels\n";
    if (guild_features.includes("PARTNERED")) guild_features_string += "- Partnered Server\n";
    if (guild_features.includes("PREVIEW_ENABLED")) guild_features_string += "- Server Preview\n";
    if (guild_features.includes("VANITY_URL")) guild_features_string += "- Vanity Invite Link\n";
    if (guild_features.includes("VERIFIED")) guild_features_string += "- Verified Server\n";
    if (guild_features.includes("VIP_REGIONS")) guild_features_string += "- VIP Voice Channel Regions\n";
    if (guild_features.includes("WELCOME_SCREEN_ENABLED")) guild_features_string += "- Welcome Screen\n";
    if (guild_features.includes("TICKETED_EVENTS_ENABLED")) guild_features_string += "- Ticketed Events\n";
    if (guild_features.includes("MONETIZATION_ENABLED")) guild_features_string += "- Monetization\n";
    if (guild_features.includes("MORE_STICKERS")) guild_features_string += "- More Stickers\n";
    if (guild_features.includes("THREE_DAY_THREAD_ARCHIVE")) guild_features_string += "- 3-day Thread Archive Option\n";
    if (guild_features.includes("SEVEN_DAY_THREAD_ARCHIVE")) guild_features_string += "- 7-day Thread Archive Option\n";
    if (guild_features.includes("PRIVATE_THREADS")) guild_features_string += "- Private Threads\n";
    if (guild_features.includes("ROLE_ICONS")) guild_features_string += "- Role Icons\n";
    if (guild_features_string === "```\n") guild_features_string += "No features available for this server\n";
    guild_features_string += "```\n";

    let guild_explicit_filter = "";
    if (_guild.explicitContentFilter == "DISABLED") guild_explicit_filter = "Disabled";
    if (_guild.explicitContentFilter == "MEMBERS_WITHOUT_ROLES") guild_explicit_filter = "All members without a role";
    if (_guild.explicitContentFilter == "ALL_MEMBERS") guild_explicit_filter = "Everyone";

    let guild_mfa = "";
    if (_guild.mfaLevel == "NONE") guild_mfa = "Disabled";
    if (_guild.mfaLevel == "ELEVATED") guild_mfa = "Enabled";

    let guild_verification_level = "";
    if (_guild.verificationLevel == "NONE") guild_verification_level = "Disabled";
    if (_guild.verificationLevel == "LOW") guild_verification_level = "Members must have a verified email address";
    if (_guild.verificationLevel == "MEDIUM") guild_verification_level = "Members must be registered on Discord for >= 5 minutes";
    if (_guild.verificationLevel == "HIGH") guild_verification_level = "Members must be in the server for >= 10 minutes";
    if (_guild.verificationLevel == "VERY_HIGH") guild_verification_level = "Members must have a verified phone number";

    serverEmbed.setTitle("About this server");
    serverEmbed.setThumbnail(_guild.iconURL({dynamic: true, size: 256}));
    serverEmbed.setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({dynamic: true, size: 256}));
    serverEmbed.setColor("BLURPLE");
    serverEmbed.addFields([
        {name: "Server Name", value: `${_guild.name}`, inline: true},
        {name: "Server ID", value: `${_guild.id}`, inline: true},
        {name: "Server Owner", value: `${guildOwner.user.tag}`, inline: true},
        {name: "Server Owner ID", value: `${guildOwner.user.id}`, inline: true},
        {name: "Server Created On", value: `${_guild.createdAt.toString()}`, inline: true},
        {name: "Server Description", value: `${guildDescription}`, inline: true},
        {name: "kBot Added On", value: `${_guild.joinedAt.toString()}`, inline: true},
        {name: "Is a large server?", value: `${_guild.large ? "Yes" : "No"}`, inline: true},
        {name: "Maximum Member Limit", value: `${_guild.maximumMembers.toString() || "N/A"}`, inline: true},
        {name: "Current Member Count", value: `${_guild.memberCount}`, inline: true},
        {name: "Is server partnered?", value: `${_guild.partnered ? "Yes" : "No"}`, inline: true},
        {name: "Is server verified?", value: `${_guild.verified ? "Yes" : "No"}`, inline: true},
        {name: "Server Boost Count", value: `${_guild.premiumSubscriptionCount.toString() || "0"}`, inline: true},
        {name: "Channel Count", value: `${_guild.channels.channelCountWithoutThreads.toString() || "Unknown"}`, inline: true},
        {name: "Custom Emojis Count", value: `${_guild.emojis.cache.size.toString() || "Unknown"}`, inline: true},
        {name: "Stickers Count", value: `${_guild.stickers.cache.size.toString() || "Unknown"}`, inline: true},
        {name: "Discovery Splash Image", value: `${guildDiscoverySplash == null ? "No discovery splash set" : "[Click to view]("+guildDiscoverySplash+")"}`, inline: true},
        {name: "Banner Image", value: `${guildBanner == null ? "No banner image set" : "[Click to view]("+guildBanner+")"}`, inline: true},
        {name: "Explicit Content Filter Level", value: `${guild_explicit_filter}`, inline: true},
        {name: "Administrator Requires Two-Factor Authentication", value: `${guild_mfa}`, inline: true},
        {name: "Server Verification Level", value: `${guild_verification_level}`, inline: true},
        {name: "Features", value: `${guild_features_string}`, inline: false}
    ]);

    await interaction.editReply({embeds: [serverEmbed]});
}

module.exports.commandData = {
    name: 'serverinfo',
    description: 'Get information about the server',
    type: 1
}