const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'checkservers',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '',
    args: false,
    guildOnly: false,
    category: 'Owner',
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        let guilds = [];
        let i = 0;
        client.guilds.cache.forEach(async (guild) => {
            try {
                await connection.query(`SELECT cmdPrefix FROM guildconfigurable WHERE guildId = '${guild.id}';`
                ).then(result => {
                    if (!result[0][0].cmdPrefix) {
                        guilds.push(`Error with ${guild.name}`)
                    }
                    i = i + 1;
                    if (i === client.guilds.cache.size && guilds.length != 0) {
                        message.channel.send(guilds)
                    } else if (i === client.guilds.cache.size && guilds.length === 0) {
                        message.channel.send(`All guilds are in the database!`)
                    }
                })
            } catch(err) {
                message.channel.send(`err with ${guild.name} (${guild.id})`)
            }
            
        });
    }
}