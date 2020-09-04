const Discord = require("discord.js");

module.exports = {
    name: 'serverinfo',
    description: 'Find out infomation about the server you\'re currently in!',
    args: false,
    usage: '',
    guildOnly: true,
    cooldown: 2,
    aliases: ['server'],
    accessibleBy: 'Everyone',
    category: 'Utility',
    run: async (client, message, args) => {
        let verificationLevel;
        if (message.guild.verificationLevel === 'NONE') {
            verificationLevel = 0
        } else if (message.guild.verificationLevel === 'LOW') {
            verificationLevel = 1
        } else if (message.guild.verificationLevel === 'MEDIUM') {
            verificationLevel = 2
        } else if (message.guild.verificationLevel === 'HIGH') {
            verificationLevel = 3
        } else if (message.guild.verificationLevel === 'VERY_HIGH') {
            verificationLevel = 4
        } else {
            console.log("Error")
        }
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        };
        let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
        let region = {
            "brazil": ":flag_br: Brazil",
            "eu-central": ":flag_eu: Central Europe",
            "singapore": ":flag_sg: Singapore",
            "us-central": ":flag_us: U.S. Central",
            "sydney": ":flag_au: Sydney",
            "us-east": ":flag_us: U.S. East",
            "us-south": ":flag_us: U.S. South",
            "us-west": ":flag_us: U.S. West",
            "eu-west": ":flag_eu: Western Europe",
            "vip-us-east": ":flag_us: VIP U.S. East",
            "london": ":flag_gb: London",
            "amsterdam": ":flag_nl: Amsterdam",
            "hongkong": ":flag_hk: Hong Kong",
            "russia": ":flag_ru: Russia",
            "southafrica": ":flag_za:  South Africa",
            "europe": ":flag_eu: Europe" 
        };
        if (args[0] && message.author.id === '372653142912794626') {
            let server = client.guilds.cache.find(g => g.id === args[0])
            const embed = new Discord.MessageEmbed()
            .setAuthor(server.name, server.iconURL)
            .addField("Name", server.name, true)
            .addField("ID", server.id, true)
            .addField("Owner", `${server.owner.user.username}#${server.owner.user.discriminator}`, true)
            .addField("Region", region[server.region], true)
            .addField("Total | Humans | Bots", `${server.memberCount} | ${server.memberCount - server.members.cache.filter(member => member.user.bot).size} | ${server.members.cache.filter(member => member.user.bot).size}`, true)
            .addField("Verification Level", verifLevels[verificationLevel], true)
            .addField("Channels | Categories", `${server.channels.cache.filter(c => c.parent).size} | ${server.channels.cache.filter(c => !c.parent).size}`, true)
            .addField("Roles", server.roles.cache.size, true)
            .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
            if (message.guild.iconURL()) {
                embed.setThumbnail(`${message.guild.iconURL({ dynamic: true })}`)
            }
        message.channel.send({embed});
        } else {
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL)
                .addField("Name", message.guild.name, true)
                .addField("ID", message.guild.id, true)
                .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
                .addField("Region", region[message.guild.region], true)
                .addField("Total | Humans | Bots", `${message.guild.memberCount} | ${message.guild.memberCount - message.guild.members.cache.filter(member => member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
                .addField("Verification Level", verifLevels[verificationLevel], true)
                .addField("Channels | Categories", `${message.guild.channels.cache.filter(c => c.parent).size} | ${message.guild.channels.cache.filter(c => !c.parent).size}`, true)
                .addField("Roles", message.guild.roles.cache.size, true)
                .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
                if (message.guild.iconURL()) {
                    embed.setThumbnail(`${message.guild.iconURL({ dynamic: true })}`)
                }
            message.channel.send({embed});
        }
    }
}
