const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'removeleavechannel',
    description: 'Use this command to remove your leave channel from our databases',
    usage: '',
    args: false,
    guildOnly: true,
    accessibleBy: 'Moderators',
    cooldown: 0,
    category: 'Settings',
    permRequirement: 'MANAGE_GUILD',
    run: async(client, message, cmdArgs, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        
        if (leaveChan.get(message.guild.id) === "NULL") return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("You don't have a leave channel, to set one please use `?setleavechannel`")
        })

        try {
            await connection.query(
                `UPDATE guildconfigurable SET leaveChannel = 'NULL' WHERE guildId = '${message.guild.id}'`
            );
            leaveChan.set(message.guild.id, "NULL");
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Your leave channel has been removed`)
            });
        } catch(err) {
            console.log(err);
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`Failed to remove leave channel. Please message @ItIsShadow#0001 to rectify this`)
            });
        }
    }

}