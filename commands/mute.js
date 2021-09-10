//const { REST } = require('@discordjs/rest');
//const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { VoiceState, GuildMember } = require('discord.js');
//const { clientId, token } = require('./config.json');

//const rest = new REST({ version: '9' }).setToken(token);

const data = new SlashCommandBuilder()
    .setName('mute')
    .setDescription('mute @user <seconds>  server mutes the specified user for specified number of seconds')
    .addUserOption(option =>
        option.setName('target')
            .setDescription('user to mute')
            .setRequired(true))
    .addNumberOption(option =>
        option.setName('seconds')
            .setDescription('Time in seconds the user stays muted (capped and defaulted at 60)'));

module.exports = {
	data: data,
	async execute(interaction) {
        const targetUser = interaction.options.getMember('target');
        var seconds = interaction.options.getNumber('seconds');

        if ( seconds ) {
            if (seconds > 60) seconds = 60;
        } else {
            seconds = 60;
        }

        console.log(seconds);
        // continuously send mute request for specified number of seconds
        const startTime = new Date();
        const stopInterval = setInterval(async () => {
            if (new Date().getTime() - startTime.getTime() > seconds*1000) {
                clearInterval(stopInterval);
            }
            
            try {
                await targetUser.voice.setMute(true);
            } catch(error) {
    
            }
            
        }, 1000);
    
		await interaction.reply(`Muted ${targetUser.user}`);
	},
};