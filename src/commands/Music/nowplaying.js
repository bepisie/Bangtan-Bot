const { MessageEmbed } = require("discord.js");
const { stripIndents } = require('common-tags');
const { Utils } = require('erela.js');
const discord = require('discord.js')

module.exports = {
    name: 'nowplaying',
    description: 'Find out what song the bot is playing!',
    args: false,
    usage: '',
    guildOnly: true,
    cooldown: 5,
    aliases: ['np'],
    accessibleBy: 'Everyone',
    category: 'Music',
    run: async(client, message, args, PREFIX) => {
        if(!message.author.bot) {
            const guildId = message.guild.id;
            const player = client.music.players.get(guildId);
            const { channel } = message.member.voice;
            if(!player || !player.queue[0]) return message.reply('there is nothing playing!');
            if (player && channel) {
                const { title, author, duration, url, thumbnail } = player.queue[0];

                const npembed = new MessageEmbed()
                    .setAuthor("Current Song Playing:", message.author.displayAvatarURL)
                    .setThumbnail(thumbnail)
                    .setDescription(stripIndents`
                    ${player.playing ? "▶️" : "⏸️"} **[${title}](${url})** \`${Utils.formatTime(duration, true)}\` by ${author}
                    `)
                return message.channel.send(npembed);
            }
        }
    }
}