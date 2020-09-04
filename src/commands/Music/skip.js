const { MessageEmbed } = require("discord.js");
const { stripIndents } = require('common-tags');
const { Utils } = require('erela.js');
const discord = require('discord.js')

module.exports = {
    name: 'skip',
    description: 'Skips the song currently playing on the bot!',
    args: false,
    usage: '',
    guildOnly: true,
    cooldown: 0,
    aliases: ['s'],
    accessibleBy: 'Everyone',
    category: 'Music',
    run: async(client, message, args, PREFIX) => {
        if(!message.author.bot) {
            let USED = false;

            const guildId = message.guild.id;
            const player = client.music.players.get(guildId);
            const { channel } = message.member.voice;
            if (player && channel) {
                if (player.voiceChannel.id === channel.id) {
                    const members = channel.members.filter(m => !m.user.bot);
                    if (members.size === 1 || message.member.hasPermission("KICK_MEMBERS")) {
                        player.stop();
                        message.channel.send({
                            embed: new discord.MessageEmbed()
                            .setColor("RANDOM")
                            .setDescription(`Skipping... ${player.queue[0].title}`)
                        });
                    } else {
                        if (!USED) {
                            USED = true;
                            const votesRequired = Math.ceil(members.size * .6);
                            const skipembed = new MessageEmbed()
                                .setDescription(`Total votes required to skip: ${votesRequired}`);
                            const msg = await message.channel.send(skipembed);
                            await msg.react('👍');
                            await msg.react('👎');

                            const filter = (reaction, user) => {
                                if (user.bot) return false;
                                const { channel } = message.guild.members.cache.get(user.id).voice;
                                if (channel) {
                                    if (channel.id === player.voiceChannel.id) {
                                        return ['👍'].includes(reaction.emoji.name);
                                    }
                                    return false;
                                } else {
                                    return false;
                                }
                            }

                            try {
                                const reactions = await msg.awaitReactions(filter, { max: votesRequired, time: 10000, errors: ['time']});
                                const totalVotes = reactions.get('👍').users.cache.filter(u => !u.bot);
                                if (totalVotes.size >= votesRequired) {
                                    player.stop();
                                    USED = false;
                                }
                            } catch (err) {
                                console.log(err);
                                USED = false;
                            }
                        } else {
                        }  
                    }
                }
            } else {
                message.channel.send({
                    embed: new discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription("You need to be in a voice channel to use this command!")
                });
            }
        }
    }
}