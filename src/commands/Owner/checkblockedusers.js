const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'checkblockedusers',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '',
    args: false,
    guildOnly: false,
    category: 'Owner',
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        if(message.author.id !== '372653142912794626') return;
        const msg = await message.channel.send(`Fetching Users...`);
        Promise.all(
            client.users.cache.map(async x => [ x, await client.db.get("bl" + x.id) ])
        ).then((x) => {
            msg.edit(`Filtering Results...`)
            return x.filter(a => a[1]);
        }).then((x) => {
            var counter = 1;
            msg.edit('', { embed: new MessageEmbed().setColor(message.author.color).setDescription(x.map(a => `${counter++}. ${a[0].tag} (${a[0].id})`).join('\n')).setTitle("Blacklisted Users:").setFooter(`In ${Date.now() - msg.createdAt} MS`) });
        })
    }
}