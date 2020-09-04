const { MessageEmbed } = require("discord.js");
const { stripIndents } = require('common-tags');
const { Utils } = require('erela.js');

module.exports = {
    name: 'queue',
    description: 'Shows the bot\'s queued songs!',
    args: false,
    usage: '',
    guildOnly: true,
    cooldown: 0,
    aliases: ['q'],
    accessibleBy: 'Everyone',
    category: 'Music',
    run: async(client, message, args, PREFIX) => {
        if(!message.author.bot) {
            const guildId = message.guild.id;
            const player = client.music.players.get(guildId);
            const { channel } = message.member.voice;
            if(!player) return message.reply('there is nothing in the queue!');
            if (player && channel) {
                let index = 1;
                let string = "";
                    if(player.queue[0]) string += `__**Currently Playing**__\n ${player.queue[0].title} - **Requested by ${player.queue[0].requester.username}**. \n`;
                    if(player.queue[1]) string += `__**Rest of queue**__\n ${player.queue.slice(1, 10).map(x => `**${index++}) ${x.title}** - **Requested by ${x.requester.username}**.`).join("\n")}`;
                    
                const queueembed = new MessageEmbed()
                    .setAuthor(`Current Queue for ${message.guild.name}`, message.guild.iconURL)
                    .setThumbnail(player.queue[0].thumbnail) 
                    .setDescription(string);
                
                return message.channel.send(queueembed);
            }
        }
    }
}