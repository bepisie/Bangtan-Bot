const { MessageEmbed } = require("discord.js");
const { stripIndents } = require('common-tags');
const { Utils } = require('erela.js');
const discord = require("discord.js")

module.exports = {
    name: 'pause',
    description: 'Pauses the song currently playing on the bot!',
    args: false,
    usage: '',
    guildOnly: true,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Music',
    run: async(client, message, args, PREFIX) => {
        if(!message.author.bot) {
            const guildId = message.guild.id;
            const player = client.music.players.get(guildId);
            const { channel } = message.member.voice;
            if (player && channel) {
                if (player.voiceChannel.id === channel.id) {
                    player.pause(true);
                    message.channel.send({
                        embed: new discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription("Song paused")
                    });
                }
            }
        }
    }
}