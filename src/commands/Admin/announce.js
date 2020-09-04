const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'announce',
    description: 'Sends an announcement to the pre set announcement channel!',
    args: true,
    usage: '[announcement]',
    guildOnly: true,
    cooldown: 0,
    accessibleBy: 'Moderators',
    category: 'Admin',
    permRequirement: 'KICK_MEMBERS',
    run: async(client, message, args, anChan, PREFIX) => {
        
        let announcements = message.guild.channels.cache.find(c => c.id === PREFIX);
        
        let parts = message.content.split(" ");
    
        let search = parts.slice(1).join(" ");

        if (message.mentions.channels.first()) {
            announcements = message.mentions.channels.first()

            parts = message.content.split(" ");
        
            search = parts.slice(2).join(" ");
        }

        if (!announcements) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription(`You do not have a announcement channel, please set one using ${anChan}setannouncementchannel or mention a channel to announce in to continue`)
        });

        if (!announcements.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("I need the permission SEND_MESSAGES in your announcement channel to run this command!")
        })

        announcements.send(search)
        
        message.channel.send({
            embed: new MessageEmbed()
            .setColor("GREEN")
            .setDescription("Announcement successfully sent!")
        });
    }
}