const discord = require("discord.js")
const fetch = require("node-fetch");

module.exports = {
    name: 'fml',
    description: 'Sends an fml to the channel!',
    args: false,
    guildOnly: false,
    cooldown: 5,
    accessibleBy: 'Everyone',
    category: 'Fun',
    run: async(client, message, args) => {
        fetch('https://api.alexflipnote.dev/fml', headers={"User-Agent": "Mybot 1.0"}).then(response => response.text()).then(data => {
            console.log(data)
        })
        /*let url = await (await fetch('https://api.alexflipnote.dev/fml')).json();
        let fml = JSON.stringify(url.text)
        let fml2 = fml.replace(/^"|"$/g, '');

        message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(fml2)
        });*/
    }
}