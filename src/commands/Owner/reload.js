module.exports = {
    name: 'reload',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '[command]',
    args: true,
    category: 'Owner',
    guildOnly: false,
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes, command2, cmdName) => {

        const commandName = args[0].toLowerCase();

        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);

        delete require.cache[require.resolve(`../${command.category}/${command.name}.js`)];

        try {
            const newCommand = require(`../${command.category}/${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
        } catch (error) {
            console.log(error);
            message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }

        message.channel.send(`Command \`${command.name}\` was reloaded!`);
    }
}