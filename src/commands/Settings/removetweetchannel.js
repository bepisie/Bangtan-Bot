const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'removetweetchannel',
    description: 'Use this command to remove your tweets channel from our databases',
    usage: '',
    args: false,
    guildOnly: true,
    accessibleBy: 'Moderators',
    cooldown: 0,
    category: 'Settings',
    permRequirement: 'MANAGE_GUILD',
    run: async(client, message, cmdArgs, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes, command, cmdName, tweetChan) => {
        
        if (tweetChan.get(message.guild.id) === "NULL") return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("You don't have a tweet channel, to set one please use `?settweetschannel`")
        })

        try {
            await connection.query(
                `UPDATE guildconfigurable SET tweetchannel = 'NULL' WHERE guildId = '${message.guild.id}'`
            );
            tweetChan.set(message.guild.id, "NULL");
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Your tweets channel has been removed`)
            });
        } catch(err) {
            console.log(err);
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`Failed to remove tweets channel. Please message @ItIsShadow#0001 to rectify this`)
            });
        }
    }

}