const {Events, Guild, client, guild, AuditLogEvent} = require('discord.js')



// module.exports = {
//     name: Events.GuildMemberUpdate,
//     on: true,
//     execute(oldMember, newMember){
//         console.log(`${oldMember.user.tag} has been changed to ${newMember.user.tag}`)

//         const fetchedLogs =  oldMember.guild.fetchAuditLogs({
//             limit: 1,
//             type: AuditLogEvent.RoleUpdate,
//         })

//         const log = fetchedLogs.entries.first()

//         const {executor, target} = log

//         console.log(log)

// }}