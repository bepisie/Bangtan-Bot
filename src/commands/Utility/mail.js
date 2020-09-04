const discord = require("discord.js")

module.exports = {
    name: 'mail',
    description: 'Send a message to someone!',
    args: true,
    usage: '[message]',
    guildOnly: true,
    cooldown: 10,
    aliases: ['message'],
    accessibleBy: 'Everyone',
    category: 'Utility',
    run: async(client, message, args) => {
        const recipient = message.mentions.members.first();
        if (!recipient) return message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription("Please tell me who you want to send mail too")
        });
        if(!args[1]) return message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription("You can't send an empty message!")
        });
        const parts = message.content.split(" ");
        const request = parts.slice(2).join(" ");
        recipient.send(`You got mail!\n From <@${message.member.user.tag}>!\n > ` + request);
        message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription("Mail sent sucessfully!")
        });
        message.delete();
    }
}