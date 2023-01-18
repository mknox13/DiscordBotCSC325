const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hi')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		return interaction.reply('Pong!');
	},
};