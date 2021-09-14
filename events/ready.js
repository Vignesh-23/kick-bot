module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		client.user.setActivity("Vaathi Screaming ", {type: "LISTENING"});
		console.log(`Ready! Logged in as ${client.user.tag}`);
		const activeGuilds = await client.guilds.fetch();

		console.log("\nCurrently active in the guilds");
		activeGuilds.forEach((value) => {
			console.log(value.name);
		});
		console.log("\n");
	},
};