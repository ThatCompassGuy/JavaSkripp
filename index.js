const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token, guildId } = require('./config/config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

for (const file of fs.readdirSync('./commands').filter(file => file.endsWith('.js'))) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
	console.log('Recon give me perms please!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);