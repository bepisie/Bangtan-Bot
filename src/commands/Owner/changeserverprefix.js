module.exports = {
    name: 'changeserverprefix',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '[new prefix] [serverId]',
    args: true,
    guildOnly: false,
    category: 'Owner',
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        if(message.author.id !== '372653142912794626') return;
        let newPrefix = args[0];
        let serverId = args[1];
        if (!newPrefix) return message.reply("you need to pass a new prefix!")
        try {
            await connection.query(
                `UPDATE guildconfigurable SET cmdPrefix = '${newPrefix}' WHERE guildId = '${serverId}'`
            );
            guildCommandPrefixes.set(serverId, newPrefix);
            message.channel.send(`The prefix for the server has been updated to: ${newPrefix}`)
            client.guilds.cache.find(g => g.id === serverId).members.cache.find(m => m.id === '718458821865111624').setNickname(`(${newPrefix}) Bangtan Bot`)

        } catch(err) {
            console.log(err);
            message.channel.send(`Failed to update prefix to: ${newPrefix}`)
        }

    }
}