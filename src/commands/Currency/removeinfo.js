const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")

module.exports = {
    name: 'removeinfo',
    description: 'Removes your user information from our databases\nNOTE: This will restart all your currency.',
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, cmdArgs, PREFIX, anChan, Utils, sqlite, keyv, connection,) => {
        await connection.query(
            `DELETE FROM cash WHERE uuid = '${message.member.id}'`
        );
        message.channel.send({
            embed: new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`Delete!`)
            .setDescription(`Your data has been removed.`)
            .setTimestamp()
        });
    }
}