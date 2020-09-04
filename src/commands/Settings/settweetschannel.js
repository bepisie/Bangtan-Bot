const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'settweetschannel',
    description: 'Use this command to set an tweets channel to use see BTS\'s tweets  with!',
    usage: '[channel mention]',
    args: true,
    aliases: ['tweetchannel', 'settweetchannel'],
    guildOnly: true,
    accessibleBy: 'Moderators',
    cooldown: 0,
    category: 'Settings',
    permRequirement: 'MANAGE_GUILD',
    run: async(client, message, cmdArgs, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes, command, cmdName, tweetChan) => {
        
        var announcements = message.guild.channels.cache.find(c => c.id === announcementChan);
        const newChannel = message.mentions.channels.first().id;
        if (!newChannel) return message.reply("you need to mention the channel you want to set!")
        try {
            await connection.query(
                `UPDATE guildconfigurable SET tweetchannel = '${newChannel}' WHERE guildId = '${message.guild.id}'`
            );
            tweetChan.set(message.guild.id, newChannel);
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Your tweets channel has been updated to: <#${newChannel}>!`)
            });
        } catch(err) {
            console.log(err);
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`Failed to update tweets channel to: <#${newChannel}>`)
            });
        }
    }

}