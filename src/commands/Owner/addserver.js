const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'addserver',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '[server to add]',
    args: true,
    guildOnly: false,
    category: 'Owner',
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        let serverid = args[0];
        try {
            await connection.query(
                `INSERT INTO guilds VALUES('${serverid}')`
            );
            await connection.query(
                `INSERT INTO guildconfigurable (guildId) VALUES ('${serverid}')`
            );
            if (client.guilds.cache.get(serverid).members.cache.find(m => m.id === "155149108183695360")) {
                try {
                    connection.query(
                        `UPDATE guildconfigurable SET cmdPrefix = 'b?' WHERE guildId = '${serverid}'`
                    )
                } catch(err) {console.log(err)} 
            }
        } catch(err) {
            console.log(err)
        }
        client.guilds.cache.forEach(guild => {
            connection.query(
                `SELECT cmdPrefix FROM guildconfigurable WHERE guildId = '${guild.id}'`
            ).then(result => {
                guildCommandPrefixes.set(guild.id, result[0][0].cmdPrefix);
            }).catch(err => {
                console.log(err)
            });
        })
        message.channel.send("Success!")
    }
}