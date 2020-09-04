const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'partner',
    description: 'See who your current partner is, or someone elses!!',
    args: false,
    guildOnly: true,
    cooldown: 0,
    usage: '<member>',
    aliases: ["married"],
    accessibleBy: 'Everyone',
    category: 'Marriage',
    run: async(client, message, args) => {
        if (!args) {
            args = [`<@${message.author.id}>`];
        }
        let usr;
        try {
            usr = await client.users.fetch(client.getID(args[0]))
        } catch (err) {
            usr = await client.users.fetch(args[0]).catch((x) => {});
        };
        if (!usr) {
            usr = {
                id: message.author.id,
            }
        }

        let spouse = await client.db.get("spouse" + usr.id);

        if (usr.id === message.author.id) {
            if (!spouse) return message.channel.send({
                embed: new MessageEmbed()
                .setDescription(`${message.author.tag} isn't married to anyone.`)
                .setColor("RANDOM")
            })
        } else {
            if (!spouse) return message.channel.send({
                embed: new MessageEmbed()
                .setDescription(`${usr.tag} isn't married to anyone.`)
                .setColor("RANDOM")
            })
            
        }
        let user = await client.users.fetch(spouse);
        let tag = `${user.username}#${user.discriminator}`;

        if (usr.id === message.author.id) {
            message.channel.send({
                embed: new MessageEmbed()
                .setDescription(`:two_hearts: ${message.author.tag} is currently married to ${tag}`)
                .setColor("RANDOM")
            })
        } else {
            message.channel.send({
                embed: new MessageEmbed()
                .setDescription(`:two_hearts: ${usr.tag} is currently married to ${tag}`)
                .setColor("RANDOM")
            })
        }
    }
}