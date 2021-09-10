const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('beep')
	.setDescription('Replies with Boop!');

module.exports = {
	data: data,
	async execute(interaction) {
		await interaction.reply('Boop!');
	},
};