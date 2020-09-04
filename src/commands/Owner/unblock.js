module.exports = {
    name: 'unblock',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '[member/user ID]',
    args: true,
    category: 'Owner',
    guildOnly: false,
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        if(message.author.id !== '372653142912794626') return;
        let user;
        if(message.mentions.members.first()) {
            user = message.mentions.members.first().id;
        } else {
            user = args[0]
        }
        let blacklist = await client.db.get("bl" + user);
        if (!blacklist) return message.channel.send("This user is not blacklisted")
        await client.db.delete("bl" + user);
        message.channel.send(`User: ${user} has been taken off the blacklist!`)
    }
}