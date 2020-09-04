const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'censorinvites',
    description: 'Use this command to toggle whether invite censoring is active in your server!',
    usage: '',
    args: false,
    guildOnly: true,
    accessibleBy: 'Moderators',
    cooldown: 0,
    category: 'Settings',
    permRequirement: 'MANAGE_GUILD',
    run: async(client, message, cmdArgs, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes, command, cmdName, tweetChan, inviteCensor) => {
        
        let option;

        if (inviteCensor.get(message.guild.id) === 'true') {
            option = 'false';
        } else {
            option = 'true';
        }
        
        try {
            await connection.query(
                `UPDATE guildconfigurable SET inviteCensor = '${option}' WHERE guildId = '${message.guild.id}'`
            );
            inviteCensor.set(message.guild.id, option);
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Your invite censoring has been updated to: ${option}`)
            });
        } catch(err) {
            console.log(err);
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`Failed to change your invite censoring settings`)
            });
        }
    }

}