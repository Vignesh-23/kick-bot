const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName('spam')
    .setDescription('spam @user <number> spams the specified user by mentioning them for specified number of times')
    .addUserOption(option =>
        option.setName('target')
            .setDescription('user to spam')
            .setRequired(true))
    .addNumberOption(option =>
        option.setName('seconds')
            .setDescription('Time in seconds the user is spammed (capped at 20 and defaulted at 10)'));

module.exports = {
	data: data,
	async execute(interaction) {
        // if (interaction.user.id != '575578770568773632') {
        //     await interaction.reply(`Only PUDDIN can do this action!`)
        // }

        const targetUser = interaction.options.getMember('target');
        var seconds = interaction.options.getNumber('seconds');

        if ( seconds ) {
            if (seconds > 20) seconds = 20;
            if (seconds < 0 ) seconds = 0;
        } else {
            seconds = 10;
        }

        // continuously send disconnect request for specified number of seconds
        const startTime = new Date();
        const stopInterval = setInterval(async () => {
            if (new Date().getTime() - startTime.getTime() > seconds*1000) {
                clearInterval(stopInterval);
            }
            
            try {
                interaction.channel.send(`${targetUser.user} sup biyatch`)
                    .then(msg => {
                        setTimeout(() => {
                            msg.delete();
                        }, seconds*1000 - new Date().getTime() + startTime.getTime());
                    })
                    .catch();

            } catch(error) {
    
            }
            
        }, 1000);
    
		await interaction.reply(`spamming ${targetUser.user} for ${seconds} seconds`);
	},
};