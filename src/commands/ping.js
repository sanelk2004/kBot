module.exports.run = async(client, interaction) => {
    await interaction.deferReply();
    const reply = await interaction.editReply("Ping?");
    await interaction.editReply(`Pong! Latency is ${reply.createdTimestamp - interaction.createdTimestamp}ms. API latency is ${Math.round(client.ws.ping)}ms.`);
}

module.exports.commandData = {
    name: "ping",
    description: "Shows bot and API latency. Also, pong.",
    type: 1
}