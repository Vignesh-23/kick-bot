const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName('mute')
    .setDescription('mute @user <seconds> keeps the specified user server muted for specified number of seconds')
    .addUserOption(option =>
        option.setName('target')
            .setDescription('user to mute')
            .setRequired(true))
    .addNumberOption(option =>
        option.setName('seconds')
            .setDescription('Time in seconds the user stays muted (capped at 120 and defaulted at 60)'));

module.exports = {
	data: data,
	async execute(interaction) {
        const targetUser = interaction.options.getMember('target');
        var seconds = interaction.options.getNumber('seconds');

        if ( seconds ) {
            if (seconds > 120) seconds = 120;
            if (seconds < 0 ) seconds = 0;
        } else {
            seconds = 60;
        }

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
    
		await interaction.reply(`Muted ${targetUser.user} for ${seconds} seconds`);
	},
};