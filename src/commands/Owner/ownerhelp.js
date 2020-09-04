let discord = require('discord.js');

module.exports = {
    name: 'ownerhelp',
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
        let marriagecommands = [];
        marriagecommands = client.commands.filter(cmd => cmd.accessibleBy === 'Owner');
        let embed2 = new discord.MessageEmbed()
            .setTitle("Owner Commands!")
            .setColor('RANDOM')
        marriagecommands.forEach(cmd => {
            embed2.addField('yeet', `${cmd.name} ${cmd.usage}`)
        });
        message.channel.send(embed2)
    }
}