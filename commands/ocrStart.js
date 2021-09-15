const { SlashCommandBuilder } = require('@discordjs/builders');
const ocrSpace = require('ocr-space-api-wrapper');
const { apiKey } = require('../config.json');

const data = new SlashCommandBuilder()
    .setName('ocrstart')
    .setDescription('ucrStart #Channel | Listens in the specified #text-channel and converts images to text')
    .addChannelOption(option =>
        option.setName('channel')
            .setDescription('channel to listen on')
            .setRequired(true));

module.exports = {
	data: data,
	async execute(interaction) {        
        const targetChannel = interaction.options.getChannel('channel');

        if(interaction.client.ocrChannels.length == 0) {
            
            interaction.client.ocrListener = async message => {
                if (interaction.client.ocrChannels.includes(message.channelId)) {
                    const messageAttachments = message.attachments;
                    if (messageAttachments.size != 0) {
                        elem = messageAttachments.first()
                        if (elem.contentType.startsWith('image/')) {
                            try {
                                console.log(elem.url);
                                const res = await ocrSpace(elem.url, {apiKey: apiKey, detectOrientation: true, scale: true});
                                console.log(res.ParsedResults[0].ParsedText);
                                message.reply(`The parsed OCR TEXT is \n ${res.ParsedResults[0].ParsedText}`);
                            } catch (error) {
                                message.channel.send("Sorry Unexpected error while accessing OCR");
                                console.log(error);
                            }

                        }
                        
                    }
                }
            }
            interaction.client.on('messageCreate', interaction.client.ocrListener);
            
            interaction.client.ocrChannels.push(targetChannel.id);
        } else if (interaction.client.ocrChannels.includes(targetChannel.id)) {
            await interaction.reply("Channel is already listening for OCR");
            return
        
        } else{
            interaction.client.ocrChannels.push(targetChannel.id);
        }

        console.log("Target: ", targetChannel.id);
        console.log(interaction.client.ocrChannels);

        interaction.reply(`Now listening on ${targetChannel}`);

	},
};