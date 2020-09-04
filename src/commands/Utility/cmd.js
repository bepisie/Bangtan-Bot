const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'cmd',
    description: 'Find out more info about a command!',
    args: true,
    usage: '[command name]',
    guildOnly: false,
    cooldown: 5,
    aliases: ['command'],
    accessibleBy: 'Everyone',
    category: 'Utility',
    run: async(client, message, args, PREFIX) => {
        const name = args[0].toLowerCase();
        const command = client.commands.get(name) || client.commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        let cmdname = command.name;

        let embed = new MessageEmbed()
            .setTitle(`${cmdname.charAt(0).toUpperCase() + cmdname.slice(1)}`)
            .setColor("RANDOM")
            .addField(`Description:`, command.description || `No description`)
            .addField(`Catagory:`, command.category || `No category`)
            .addField(`Aliases:`, command.aliases ? command.aliases.join(', ') : `No aliases`)
            .addField(`Usage:`, `${PREFIX}${command.name} ${command.usage}`)
            .addField(`Cooldown:`, `${command.cooldown || 0} second(s)`)
            .addField(`Accessible by:`, command.accessibleBy)
            .addField(`Guild Only:`, command.guildOnly ? `Yes` : `No`)
            .setFooter(` | Help`, message.author.displayAvatarURL({ dynamic: true }))

       message.channel.send(embed)
    }
}