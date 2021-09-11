module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity("Vaathi in the A$$", {type: "Kicking"});
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};