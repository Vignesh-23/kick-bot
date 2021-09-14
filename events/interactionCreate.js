module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        console.log(`${interaction.user.tag} in [#${interaction.channel.name}, ${interaction.guild.name}] triggered an interaction.`);
        
        if (!interaction.isCommand()) return;

        //Dynamically check for which command was executed and execute the corresponding command
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}