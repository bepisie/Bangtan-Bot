const ms = require('ms');
const discord = require("discord.js")

module.exports = {
    name: 'reroll',
    description: 'Rerolls the giveaway in the message ID provided!',
    args: true,
    usage: '[giveaway message ID]',
    guildOnly: true,
    cooldown: 2,
    aliases: ['greroll'],
    accessibleBy: 'Moderators',
    category: 'Utility',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription('You do not have permission to reroll giveaways')
        });

        if(!args[0]) return message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription('No giveaway ID provided')
        });

        let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if(!giveaway) return message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription('Couldn\'t find a giveaway with that ID/name')
        });

        client.giveawaysManager.reroll(giveaway.messageID)
        .then(() => {
            if(!giveaway) return message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription('Giveaway successfully rerolled')
            });
        })
        .catch((e) => {
            if(e.startsWith(`Giveaway with ID ${giveaway.messageID} is not ended`)){
                message.channel.send({
                    embed: new discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription('This giveaway hasn\'t ended yet')
                });
            } else {
                console.error(e);
                message.channel.send({
                    embed: new discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription('An error occured')
                });
            }
        })
    }
}