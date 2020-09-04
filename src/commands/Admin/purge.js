const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'purge',
    description: 'Purges a channel!',
    args: true,
    usage: '[amount of messages]',
    guildOnly: true,
    cooldown: 3,
    aliases: ['clear'],
    accessibleBy: 'Moderators',
    category: 'Admin',
    permRequirement: 'MANAGE_MESSAGES',
    run: async(client, message, args) => {
        
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("I need the permission MANAGE_MESSAGES to run this command!")
        })

        if (args[0] === 'all') return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("Please specify a number of messages to delete. Phrases like 'all' won't work")
        })

        if(!args[0]) return message.channel.send('```Error: Please send message number```')

        if (message.mentions.members.first()) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RANDOM")
            .setDescription("You're looking for the command `?delete` :)")
        })

        if (args[0] > 100) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RANDOM")
            .setDescription("The maximum messages you can purge at once is 100!")
        })

        let amount = args[0];

        message.channel.messages.fetch({
            limit: amount,
           }).then((messages) => {
            message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
           });
           message.delete().catch(O_o => { });
        
    }
}