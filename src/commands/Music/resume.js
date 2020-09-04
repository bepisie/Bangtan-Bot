const { MessageEmbed } = require("discord.js");
const { stripIndents } = require('common-tags');
const { Utils } = require('erela.js');
const discord = require('discord.js')

module.exports = {
    name: 'resume',
    description: 'Resumes the song currently paused on the bot!',
    args: false,
    usage: '',
    guildOnly: true,
    cooldown: 0,
    aliases: ['r'],
    accessibleBy: 'Everyone',
    category: 'Music',
    run: async(client, message, args, PREFIX) => {
        if(!message.author.bot) {
            const guildId = message.guild.id;
            const player = client.music.players.get(guildId);
            const { channel } = message.member.voice;
            if (player && channel) {
                if (player.voiceChannel.id === channel.id) {
                    player.pause(false);
                    message.channel.send({
                        embed: new discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription("Song resumed")
                    });
                }
            }
        }
    }
}