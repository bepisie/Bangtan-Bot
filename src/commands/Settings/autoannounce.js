const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'autoannounce',
    description: 'Make Bangtan Bot automatically publish every message you put in an announcement channel. This requires Bangtan Bot to have the permissions "Manage Messages", "Send Messages" and "Read Messages" in your announcement channels.',
    usage: '',
    args: false,
    guildOnly: true,
    accessibleBy: 'Moderators',
    cooldown: 0,
    aliases: ['autopublish'],
    category: 'Settings',
    permRequirement: 'MANAGE_GUILD',
    run: async(client, message, cmdArgs, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes, command, cmdName, tweetChan, inviteCensor, autoannounce) => {
       
        let option;

        if (autoannounce.get(message.guild.id) === 'true') {
            option = 'no';
        } else {
            option = 'yes';
        }
        
        try {
            await connection.query(
                `UPDATE guildconfigurable SET autoannounce = '${option}' WHERE guildId = '${message.guild.id}'`
            );
            autoannounce.set(message.guild.id, option);
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Auto Publish: ${option}.`)
            });
        } catch(err) {
            console.log(err);
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`Failed to change your settings.`)
            });
        }
    }

}