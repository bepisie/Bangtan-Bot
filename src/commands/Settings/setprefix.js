const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'setprefix',
    description: 'Use this command to change the prefix for your server! Only people with Administrator privileges can use this!',
    usage: '[channel mention]',
    args: true,
    aliases: ['changeprefix'],
    guildOnly: true,
    accessibleBy: 'Moderators',
    cooldown: 0,
    category: 'Settings',
    permRequirement: 'ADMINISTRATOR',
    run: async(client, message, cmdArgs, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        const [ cmdName, newPrefix ] = message.content.split(" "); 
        if (!newPrefix) return message.reply("you need to pass a new prefix!")
        try {
            await connection.query(
                `UPDATE guildconfigurable SET cmdPrefix = '${newPrefix}' WHERE guildId = '${message.guild.id}'`
            );
            guildCommandPrefixes.set(message.guild.id, newPrefix);
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Your prefix has been updated to: ${newPrefix}`)
            });
            message.guild.members.cache.find(m => m.id === '718458821865111624').setNickname(`(${newPrefix}) Bangtan Bot`)
        } catch(err) {
            console.log(err);
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`Failed to update prefix to: ${newPrefix}`)
            });
        }
    }

}