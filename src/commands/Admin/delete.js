const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'delete',
    description: 'Deletes a specified user\'s messages!',
    args: true,
    usage: '[user] [amount of messages]',
    guildOnly: true,
    cooldown: 0,
    aliases: ['d'],
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
        
        if (!args[1]) return message.channel.send("You need 2 arguments! A user and an amount of messages")
        let amount = args[1];
        let user = message.mentions.members.first();
        message.channel.messages.fetch({
            limit: 100,
        }).then((messages) => {
            if (user) {
                const filterBy = user ? user.id : Client.user.id;
                messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
            }
            if (messages > 100) return message.channel.send("You can only delete 100 messages at a time")
            message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        });
    }
}