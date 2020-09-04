const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const { Timers } = require("../../../variable");

module.exports = {
  name: 'timer',
  description: 'Set a timer and be alerted when it finishes!',
  args: true,
  usage: '[time] <title>',
  guildOnly: true,
  cooldown: 2,
  accessibleBy: 'Everyone',
  category: 'Utility',
  run: async(client, message, args) => {
      const title = args.slice(1).join(" ");
      if (!args[0]) {
        return message.channel.send(
          `You did not specify the amount of time you wish to set a timer for!`
        );
      }
      if (!args[0].endsWith("d")) {
        if (!args[0].endsWith("h")) {
          if (!args[0].endsWith("m")) {
            if (!args[0].endsWith("s")) {
              return message.channel.send(
                `You did not use the proper format for the the time!`
              )
            }
          }
        }
      }
      if (isNaN(args[0][0])) {
        return message.channel.send(`That is not a number!`);
      }
      Timers.set(message.author.id + " G " + message.guild.name, {
        Guild: message.guild.name,
        Author: {
          Tag: message.author.tag,
          ID: message.author.id,
        },
        Time: ms(args[0]),
      });
      const embed = new MessageEmbed()
          .setDescription(`<@${message.author.id}>, you have set a timer for ${args[0]}`)
          .setTimestamp()
          if (title) {
              embed.setTitle(title); 
          }
      message.channel.send(embed)
      setTimeout(() => {
          let Embed = new MessageEmbed()
              if (title) {
                  Embed.setTitle(`Timer (${title}) finished in guild: ${message.guild.name}..`)
              } else {
                  Embed.setTitle(`Timer finished in guild ${message.guild.name}..`)
              }
              Embed.setDescription(
                  `Your timer for ${args[0]} has finished!`
              )
              Embed.setColor(`RANDOM`);
          let Embed2 = new MessageEmbed()
              if (title) {
                  Embed2.setTitle(`Timer (${title}) has finished!`)
              } else {
                  Embed2.setTitle(`The timer has finished!`)
              }
              Embed2.setDescription(
                `<@${message.author.id}>, your timer for ${args[0]} has finished!`
              )
              Embed2.setColor(`RANDOM`);
          message.member.send(Embed);
          message.channel.send(Embed2);
          Timers.delete(message.author.id + " G " + message.guild.name);
          console.log(`Timer finished in guild: ${message.guild.name}`)
      }, ms(args[0]));
  }
};