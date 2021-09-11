const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName('deafen')
    .setDescription('deafen @user <seconds>  keeps the specified user server deafend for specified number of seconds')
    .addUserOption(option =>
        option.setName('target')
            .setDescription('user to deafen')
            .setRequired(true))
    .addNumberOption(option =>
        option.setName('seconds')
            .setDescription('Time in seconds the user stays deafend (capped at 120 and defaulted at 60)'));

module.exports = {
	data: data,
	async execute(interaction) {
        // if (interaction.user.id != '575578770568773632') {
        //     await interaction.reply(`Only PUDDIN can do this action!`)
        // }

        const targetUser = interaction.options.getMember('target');
        var seconds = interaction.options.getNumber('seconds');

        if ( seconds ) {
            if (seconds > 120) seconds = 120;
            if (seconds < 0 ) seconds = 0;
        } else {
            seconds = 60;
        }

        // continuously send deafen request for specified number of seconds
        const startTime = new Date();
        const stopInterval = setInterval(async () => {
            if (new Date().getTime() - startTime.getTime() > seconds*1000) {
                clearInterval(stopInterval);
            }
            
            try {
                await targetUser.voice.setDeaf(true);
            } catch(error) {
    
            }
            
        }, 1000);
    
		await interaction.reply(`Deafened ${targetUser.user} for ${seconds} seconds`);
	},
};