const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'privacypolicy',
    guildOnly: false,
    aliases: ["privacy", "pp"],
    accessibleBy: 'everyone',
    args: false,
    cooldown: 0,
    description: "Displays the bot's privacy policy in accordance to the new Discord ToS",
    category: "Utility",
    usage: "",
    run: async(client, message) => {
        message.channel.send({
            embed: new MessageEmbed()
            .setTitle("**Privacy Policy**")
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription("We have made our best efforts to secure all data we store, however we cannot guarentee that the data will remain secure.\n\nWe store Guild IDs, Channel IDs when provided and User IDs when provided.\nIf you would like to remove your data from our databases:\n\n`Guild ID`: When Bangtan Bot is removed from a server, all the stored information referenced above is deleted. This is the only way to delete your Guild ID from our databases without contacting us.\n\n`Channel IDs`: You can remove these by using the relevant `remove` commands, such as `?removeleavechannel`\n\n`User ID`: If you have chosen to marry another user, you can remove your User ID from our databases by divorcing them, using the `?divorce` command.\n\nAlternatively you can request for your data to be removed at any time by DMing @ItIsShadow#0001 or sending an email to `shadow@hex.run`\n\nWe do not share this information with Discord or any Third Parties\n\nBy adding Bangtan Bot and/or using any of Bangtan Bot's commands, you give us permission to store this data and use it to drive your experiences.")
        })
    }
}