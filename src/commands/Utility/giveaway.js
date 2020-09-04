const ms = require('ms');
const discord = require("discord.js")

module.exports = {
    name: 'giveaway',
    description: 'Create a giveaway!',
    args: true,
    usage: '[channel] [time] [no. of winners] [prize]',
    guildOnly: true,
    cooldown: 10,
    aliases: ['gstart'],
    accessibleBy: 'Moderators',
    category: 'Utility',
    permRequirement: 'KICK_MEMBERS',
    run: async(client, message, args) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You are not allowed to start giveaways');

        let channel = message.mentions.channels.first();

        if (!channel) return message.channel.send('Please provide a channel');

        let giveawayDuration = args[1];

        if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send('Pleae provide a valid duration');

        let giveawayWinners = args[2];

        if (isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return message.channel.send('Please provide a valid number of winners!');

        let giveawayPrize = args.slice(3).join(" ");

        if (!giveawayPrize) return message.channel.send('Ok then, I\'ll give away nothing');

        client.giveawaysManager.start(channel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayWinners,
            hostedBy: client.config.DISCORD_BOT.hostedBy ? message.author : null,

            messages: {
                giveaway: (client.config.DISCORD_BOT.everyoneMention ? "@everyone\n\n" : "") + "GIVEAWAY",
                giveawayEned: (client.config.DISCORD_BOT.everyoneMention ? "@everyone\n\n" : "") + "GIVEAWAY ENDED",
                timeRemaining: "Time remaining: **{duration}**",
                inviteToParticipate: "React with ✅ to enter",
                winMessage: "Congrats {winners}, you won **{prize}**",
                embedFooter: "Giveaway time!",
                noWinner: "Couldn't determine a winner",
                hostedBy: "Hosted by {user}",
                winners: "winner(s)",
                endedAt: "Ends at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
            }
        })

        console.log(`New giveaway in channel: ${channel} in server: ${message.guild.name}`)
        message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Giveaway starting in ${channel}`)
        });
    }
}