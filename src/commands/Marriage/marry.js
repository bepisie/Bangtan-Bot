const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'marry',
    description: 'Marries you and another user <3!',
    args: true,
    usage: '[member]',
    guildOnly: true,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Marriage',
    run: async(client, message, args, PREFIX) => {
        let spouse = await client.db.get("spouse" + message.author.id);
        let author, tag;
        if (spouse) {
            author = await client.users.fetch(spouse).catch((x)=>{})
            tag = `${author.username}#${author.discriminator}`;
        };
        if (spouse) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Don't even think about cheating on ${tag}. You can divorce them by using: ${PREFIX}divorce`)
        });
        let usr = message.mentions.members.first();
        if(!usr) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RANDOM")
            .setDescription("You must specify a user who you wish to marry!")
        });
        let spouse2 = await client.db.get('spouse' + usr.id);
        let user, Tag;
        if (spouse2) {
            user = await client.users.fetch(spouse2).catch((x)=>{})
            Tag = `${user.username}#${user.discriminator}`;
        };
        if (spouse2) {
            return message.channel.send({
                embed: new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Too late. ${usr.user.tag} is already married to ${Tag}`)
            });
        };
        if (message.author.id === usr.id) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RANDOM")
            .setDescription("You can't marry yourself, go find love!")
        })
        let filter = m => m.author.id === usr.id;
        message.channel.send({
            embed: new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`${message.author.tag} has proposed to ${usr.user.tag}!\n${usr.user.tag} has 60 seconds to accept. Type \`accept\` to accept!`)
        });
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 60 * 1000,
            errors: ['time']
        }).then(async(col) => {
            if (col.first().content.toLowerCase() == 'accept') {
                await client.db.set("spouse" + message.author.id, usr.id);
                await client.db.set('spouse' + usr.id, message.author.id);
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`:sparkling_heart: ${message.author.tag} is now married to ${usr.user.tag}!`)
                });
            } else {
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`It looks like ${usr.user.tag} didn't want to marry you, ${message.author.tag}. Better luck next time!`)
                });
            }
        }).catch((x) => {
            return message.reply({
                embed: new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Welp, ${usr.user.tag} didn't respond in time.`)
            });
        })
    }

}