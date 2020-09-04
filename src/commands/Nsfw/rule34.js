const { posts } = require("rule34js");
const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: 'rule34',
    description: 'Search for a picture on Rule34! [NSFW Channels only!]',
    args: true,
    usage: '[search term]',
    guildOnly: false,
    cooldown: 5,
    aliases: ['r34'],
    accessibleBy: 'Everyone',
    category: 'Nsfw',
    run: async (client, message, args) => {
        if(!args[0]) return message.channel.send("You need to give me something to search!");
        let search = args.join("_")

        if (message.channel.type != 'dm') {
            if(!message.channel.nsfw && message.guild.id !== '549685262066778112' && message.guild.id !== '722880379849277471') return message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription("This command can only be used in NSFW channels!")
            })
        }

        if (search.includes("shota") || search.includes("loli")) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("You can't search for that, sicko")
        })
        
        posts({tags:[search]}).then(values => {
            var postsnumber = Math.floor(Math.random() * values.posts.length)
            var post = values.posts[postsnumber].file_url
            var image = new MessageAttachment(post, 'SPOILER_image.webp')

            message.channel.send({
                embed: new MessageEmbed()
                .setTitle("OwO")
                .setDescription("Here you go UwU")
                .setImage(image.attachment)
            })
        }).catch(err => {
            message.channel.send("There were no results for this tag.")
        })
    }
}
