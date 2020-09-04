const { MessageEmbed } = require("discord.js");
const { stripIndents } = require('common-tags');
const { Utils } = require('erela.js');
const discord = require('discord.js')

module.exports = {
    name: 'leave',
    description: 'Makes the bot leave the voice channel!',
    args: false,
    guildOnly: true,
    cooldown: 0,
    aliases: ['disconnect', 'dc'],
    accessibleBy: 'Everyone',
    category: 'Music',
    run: async(client, message, args, PREFIX) => {
            if(!message.author.bot) {
            const { id } = message.guild;
            const player = client.music.players.get(id);
            const { channel } = message.member.voice;
            if (player && channel) {
                if (player.voiceChannel.id === channel.id) {
                    client.music.players.destroy(id);
                }
            }
        }
    }
}