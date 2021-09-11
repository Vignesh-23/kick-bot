const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const rest = new REST({ version: '9' }).setToken(token);

// Get the .js files from Commands directory and create a array(commands) of all command's data as an json object
const commands =[];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			//Routes.applicationGuildCommands(clientId, guildId),
			Routes.applicationCommands(clientId),   //-GLOBALLY DEPLOY COMMANDS
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();