const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'divorce',
    description: 'Divorce your current partner',
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 5,
    accessibleBy: 'Everyone',
    category: 'Marriage',
    run: async(client, message, args, PREFIX) => {
        let spouse = await client.db.get("spouse" + message.author.id);
        if (!spouse) return message.channel.send("You're not married to anyone yet! You can see this using: " + PREFIX  + "partner");
        let author = await client.db.get("spouse" + spouse);
        let usr = await client.users.fetch(spouse);
        let tag = `${usr.username}#${usr.discriminator}`;

        
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`:broken_heart: Are you sure you want to divorce ${tag}?`)
        
        let confirm = await message.channel.send(embed);
        await confirm.react('✅');
        await confirm.react('❎');

        let reactionFilter = (reaction, user) => (user.id === message.author.id) && !user.bot;
        let reaction = (await confirm.awaitReactions(reactionFilter, { max: 1 })).first();
        
        if(reaction.emoji.name === '✅') {
            await client.db.delete("spouse" + message.author.id);
            await client.db.delete("spouse" + spouse);
            if (usr = message.author.id) {}
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`:broken_heart: ${message.author.tag} has divorced ${tag} :sob:`)
            })
        } else {
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`:partying_face: Relationship saved! :tada:`)
            })
        }
    }
}