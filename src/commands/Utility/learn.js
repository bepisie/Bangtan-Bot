const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'learn',
    description: 'Resources to help you learn how to code.',
    usage: '',
    accessibleBy: 'Everyone',
    category: 'Utility',
    args: false,
    guildOnly: false,
    run: async (client, message, args) => {
        message.channel.send({
            embed: new MessageEmbed()
            .setColor("BLUE")
            .setTitle("Learning resources!")
            .addField("**Discord.js**", 'I learned how to code this bot in discord.js, initially using [this](https://www.youtube.com/playlist?list=PL_cUvD4qzbkyRjnbtXehTDHLgnJw-SCvk) video series from [Anson the Developer](https://www.youtube.com/user/DatAdam93). **Note:** While this is an amazing video series, it\'s written in discord.js v11 which is now depreciated. There are resources online to help you translate that into v12 code :)', true)
            .addField("**General coding and computers**", "For general coding and computer tips and knowledge, I recommend following Code Sapien on [Instagram](https://www.instagram.com/code_sapien/) and [Twitter](https://twitter.com/Code_sapien)! They give great advice, and supply people with coding knowledge that's not normally taught in schools, at least here in the UK, so go check them out!", true)
        })
    }
}