module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity("to Vaathi screaming ", {type: "LISTENING"});
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};