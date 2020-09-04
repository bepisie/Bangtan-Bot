const Discord = require("discord.js")

module.exports = {
    name: 'welcome',
    description: 'Sends a welcome message!',
    args: false,
    usage: '<member>',
    guildOnly: true,
    cooldown: 0,
    accessibleBy: 'Moderators',
    category: 'Admin',
    permRequirement: 'KICK_MEMBERS',
    run: async(client, message, args) => {
        var welcome = ["Hello! Welcome to the chat. Feel free to express yourself here :)", "Welcome to the chat. Don't be shy and talk!", "You're back! The chat missed you.", "Welcome back to this amazing chat.", "Welcome back!", "Welcome back! Did you bring any food?", "Welcome! Finally another person so that the chat won't go dead :)", "Welcome! Let's wake the chat up!", "Glad you're back. Welcome!", "Welcome back. How are you today?", "Welcome. Did you bring sweets? I want some.", "Hello and welcome back.", "Welcome. Your friends were waiting for you.", "Welcome. Enjoy the chat!"]
        message.delete();
        if(message.mentions.members.first() != null) {
            message.channel.send(`${message.mentions.members.first().toString()}, ${welcome[Math.floor(Math.random() * welcome.length)]}`)
        } else {
            message.channel.send(welcome[Math.floor(Math.random() * welcome.length)]);
        }
    }
}