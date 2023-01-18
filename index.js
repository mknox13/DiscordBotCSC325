const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ReactionRole, AuditLogEvent } = require('discord.js');
const { guildId, token } = require('./config.json');

const client = new Client({ intents:[ 
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildInvites,
	GatewayIntentBits.GuildBans,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent
]});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const channel = client.channels.cache.get('962424134552387618')

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}



client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {

	 const fetchedLogs =  await newMember.guild.fetchAuditLogs({
		limit: 1,
	    type: AuditLogEvent.MemberRoleUpdate,	  
	})


	const updateLog = fetchedLogs.entries.first()
	//const {executor, target} = updateLog

	for(i in updateLog.changes){
		console.log(updateLog.changes[i].key)
		console.log(updateLog.changes[i].new[i].name)
	}

	console.log(updateLog.changes)
	//console.log(updateLog.)
	console.log(`${updateLog.executor.username} updated ${updateLog.target.username}`)
	//channel.send(updateLog)
})


client.login(token)
