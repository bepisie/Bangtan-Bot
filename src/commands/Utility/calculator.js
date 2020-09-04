const Discord = require("discord.js");
const math = require("mathjs")

module.exports = {
    name: 'calculator',
    description: 'Do math!',
    args: true,
    usage: '[formula]',
    guildOnly: false,
    aliases: ["calculate", 'calc'],
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Utility',
    run: async(client, message, args) => {
        if(!args[0]) return message.channel.send('Please input a calculation');

        let resp;
            try {
              resp = math.evaluate(args.join(' '));
            } catch (error) {
              return message.channel.send('Please enter a valid calculation');
            }
            
        const embed = new Discord.MessageEmbed()
           .setColor(0x4EDB34)
           .setTitle('Calculator')
           .addField('Input', `\`\`\`css\n${args.join('')}\`\`\``)
           .addField('Output', `\`\`\`css\n${resp}\`\`\``)
       
           message.channel.send(embed);
    }
}