const { SlashCommandBuilder } = require('@discordjs/builders');
const ocrSpace = require('ocr-space-api-wrapper');
const { apiKey } = require('../config.json');

const data = new SlashCommandBuilder()
    .setName('ocrstop')
    .setDescription('ucrStop #Channel | Stops listening for images in the specified #text-channel')
    .addChannelOption(option =>
        option.setName('channel')
            .setDescription('channel to listen on')
            .setRequired(true));

module.exports = {
	data: data,
	async execute(interaction) {        
        const targetChannel = interaction.options.getChannel('channel');
           
        if (interaction.client.ocrChannels.includes(targetChannel.id)) {
            interaction.client.ocrChannels.splice(interaction.client.ocrChannels.indexOf(targetChannel.id), 1);

            console.log(interaction.client.ocrListener);
            if (interaction.client.ocrChannels.length ==0) {
                interaction.client.removeListener('messageCreate', interaction.client.ocrListener);
            }   
            
            interaction.reply(`Stopped listening on ${targetChannel}`);
        
        } else {
            interaction.reply("Channel is already not listening for OCR");
        }

	},
};