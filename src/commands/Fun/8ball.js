const { MessageEmbed } = require("discord.js");

module.exports = {
  name: '8ball',
  description: 'Roll the 8 ball and see what it answers to your question!',
  args: true,
  usage: '[question]',
  guildOnly: false,
  cooldown: 10,
  accessibleBy: 'Everyone',
  category: 'Fun',
  run: async(bot, message, args, PREFIX) => {
    let question = args.join(" ");
    if (!question)
      return message.channel.send(`You did not specify your question!`);
    else {
      let responses = [
        "Yes",
        "No",
        "Definitely",
        "Absoloutely",
        "Not in a million years",
      ];
      let response = responses[Math.floor(Math.random() * responses.length)];
      let Embed = new MessageEmbed()
        .setTitle(`8Ball!`)
        .setDescription(`Your question: ${question}\nMy reply: ${response}`)
        .setColor(`RANDOM`);
      message.channel.send(Embed);
    }
  }
};