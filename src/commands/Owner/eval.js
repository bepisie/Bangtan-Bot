const discord = require("discord.js");
const money = require("../../../database/sql")
const beautify = require("beautify");
const { type } = require("os");

module.exports = {
    name: 'eval',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '[code to run]',
    args: true,
    guildOnly: false,
    category: 'Owner',
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        if(message.author.id !== '372653142912794626') return;
        try {
            const code = args.join(" ");
            let evaled = eval(code);
        
            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
        
            let embed = new discord.MessageEmbed()
                .setColor("#ffd1dc")
                .setTimestamp()
                .setTitle("Eval")
                .addField("To evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``)
                .addField("Evaluated:", `\`\`\`${typeof(evaled)}\n${evaled}\n\`\`\``)
                .addField("Type of:", typeof(evaled));
            message.channel.send(embed)
        } catch(e) {
            let embed = new discord.MessageEmbed()
                .setColor("ffd1dc")
                .setTitle("\:x: Error!")
                .setDescription(e)
            message.channel.send(embed)
        }
    }
}
function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}