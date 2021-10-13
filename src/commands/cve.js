module.exports.run = async(client, interaction) => {
    // TO BE IMPLEMENTED
    await interaction.deferReply();
    await interaction.editReply("Coming soon!");
}

module.exports.commandData = {
    name: 'cve',
    description: 'Get information about a CVE (Common Vulnerabilities and Exposures) ID.',
    type: 1,
    options: [
        {
            type: 3,
            name: 'cveid',
            description: 'The CVE ID to look up in the MITRE database.',
            required: true
        }
    ]
}