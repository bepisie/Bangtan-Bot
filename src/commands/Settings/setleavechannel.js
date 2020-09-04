const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'setleavechannel',
    description: 'Use this command to set a channel in which to see who leaves your server (optional)',
    usage: '[channel mention]',
    args: true,
    aliases: ['setleaveschannel'],
    guildOnly: true,
    accessibleBy: 'Moderators',
    cooldown: 0,
    category: 'Settings',
    permRequirement: 'MANAGE_GUILD',
    run: async(client, message, cmdArgs, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        
        var announcements = message.guild.channels.cache.find(c => c.id === leaveChan);
        const newChannel = message.mentions.channels.first().id;
        if (!newChannel) return message.reply("you need to mention the channel you want to announce in!")
        try {
            await connection.query(
                `UPDATE guildconfigurable SET leaveChannel = '${newChannel}' WHERE guildId = '${message.guild.id}'`
            );
            leaveChan.set(message.guild.id, newChannel);
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Your leave channel has been updated to: <#${newChannel}>`)
            });
        } catch(err) {
            console.log(err);
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`Failed to update leave channel to: <#${newChannel}>`)
            });
        }
    }

}