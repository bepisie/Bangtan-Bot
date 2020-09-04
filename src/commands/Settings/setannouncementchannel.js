const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'setannouncementchannel',
    description: 'Use this command to set an announcement channel to use ?announce with!',
    usage: '[channel mention]',
    args: true,
    aliases: ['setannouncementschannel'],
    guildOnly: true,
    accessibleBy: 'Moderators',
    cooldown: 0,
    category: 'Settings',
    permRequirement: 'MANAGE_GUILD',
    run: async(client, message, cmdArgs, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        
        var announcements = message.guild.channels.cache.find(c => c.id === announcementChan);
        const newChannel = message.mentions.channels.first().id;
        if (!newChannel) return message.reply("you need to mention the channel you want to announce in!")
        try {
            await connection.query(
                `UPDATE guildconfigurable SET announcementChannel = '${newChannel}' WHERE guildId = '${message.guild.id}'`
            );
            announcementChan.set(message.guild.id, newChannel);
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Your announcements channel has been updated to: <#${newChannel}>!`)
            });
        } catch(err) {
            console.log(err);
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`Failed to update announcements channel to: <#${newChannel}>`)
            });
        }
    }

}