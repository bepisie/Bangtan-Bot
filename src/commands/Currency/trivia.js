/*const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const emoji = require('../../../emojicharacters')
const bb = require('../../bangtanbucks')

module.exports = {
    name: 'trivia',
    description: 'Answer trivia questions to earn Bangtan Bucks.',
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, anChan, PREFIX) => {
        money.lastUse(message.member.id)
        let questions = ['question1', 'question2']
        let canswer = ['canswer1', 'canswer2']
        let fanswer1 = ['fanswer1', 'fanswer12']
        let fanswer2 = ['fanswer2', 'fanswer22']
        let fanswer3 = ['fanswer3', 'fanswer32']
        let answersarray = []

        let question = Math.floor(Math.random() * questions.length)
        answersarray.push(canswer[question], fanswer1[question], fanswer2[question], fanswer3[question]);
        let shuffledanswers = shuffle(answersarray)
        let correct = answersarray.indexOf(canswer[question])

        console.log(answersarray)

        let message1 = await message.channel.send({
            embed: new MessageEmbed()
            .setColor("BLUE")
            .setTitle("Trivia!")
            .setDescription(`**Q:** ${questions[question]}\n\n1️⃣ - ${answersarray[0]}\n2️⃣ - ${answersarray[1]}\n3️⃣ - ${answersarray[2]}\n4️⃣ - ${answersarray[3]}`)
            .setFooter("Trivia")
            .setTimestamp()
        })

        await message1.react('1️⃣');
        await message1.react('2️⃣');
        await message1.react(`${emoji[3]}`);
        await message1.react(`${emoji[4]}`);

        let reactionFilter = (reaction, user) => (user.id === message.author.id) && !user.bot;
        let reaction = (await message1.awaitReactions(reactionFilter, { max: 1 })).first();

        if (reaction.emoji.name === '1️⃣' && answersarray[0] === answersarray[correct]) {
            let amountwon = Math.floor(Math.random() * (500 - 250 + 1) + 250)
            money.addCash(message.member.id, amountwon)
            money.getCash(message.member.id).then(bal => {
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("Trivia!")
                    .setDescription(`**Correct!**\n\nYou won ${amountwon} ${bb.bb}\nYour new balance is: ${parseInt(bal) + parseInt(amountwon)} ${bb.bb}`)
                    .setFooter("Trivia")
                    .setTimestamp()
                })
            })
        } else if (reaction.emoji.name === '1️⃣' && answersarray[0] != answersarray[correct]) {
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("BLUE")
                .setTitle("Trivia!")
                .setDescription(`**Incorrect!**\n\nThe correct answer was ${answersarray[correct]}\nBetter luck next time!`)
                .setFooter("Trivia")
                .setTimestamp()
            })
        }

        if (reaction.emoji.name === '2️⃣' && answersarray[1] === answersarray[correct]) {
            let amountwon = Math.floor(Math.random() * (500 - 250 + 1) + 250)
            money.addCash(message.member.id, amountwon)
            money.getCash(message.member.id).then(bal => {
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("Trivia!")
                    .setDescription(`**Correct!**\n\nYou won ${amountwon} ${bb.bb}\nYour new balance is: ${parseInt(bal) + parseInt(amountwon)} ${bb.bb}`)
                    .setFooter("Trivia")
                    .setTimestamp()
                })
            })
        } else if (reaction.emoji.name === '2️⃣' && answersarray[1] != answersarray[correct]) {
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("BLUE")
                .setTitle("Trivia!")
                .setDescription(`**Incorrect!**\n\nThe correct answer was ${answersarray[correct]}\nBetter luck next time!`)
                .setFooter("Trivia")
                .setTimestamp()
            })
        }

        if (reaction.emoji.name === `${emoji[3]}` && answersarray[2] === answersarray[correct]) {
            let amountwon = Math.floor(Math.random() * (500 - 250 + 1) + 250)
            money.addCash(message.member.id, amountwon)
            money.getCash(message.member.id).then(bal => {
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("Trivia!")
                    .setDescription(`**Correct!**\n\nYou won ${amountwon}${bb.bb}\nYour new balance is: ${parseInt(bal) + parseInt(amountwon)} ${bb.bb}`)
                    .setFooter("Trivia")
                    .setTimestamp()
                })
            })
        } else if (reaction.emoji.name === `${emoji[3]}` && answersarray[2] != answersarray[correct]) {
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("BLUE")
                .setTitle("Trivia!")
                .setDescription(`**Incorrect!**\n\nThe correct answer was ${answersarray[correct]}\nBetter luck next time!`)
                .setFooter("Trivia")
                .setTimestamp()
            })
        }

        if (reaction.emoji.name === `${emoji[4]}` && answersarray[3] === answersarray[correct]) {
            let amountwon = Math.floor(Math.random() * (500 - 250 + 1) + 250)
            money.addCash(message.member.id, amountwon)
            money.getCash(message.member.id).then(bal => {
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("Trivia!")
                    .setDescription(`**Correct!**\n\nYou won ${amountwon} ${bb.bb}\nYour new balance is: ${parseInt(bal) + parseInt(amountwon)} ${bb.bb}`)
                    .setFooter("Trivia")
                    .setTimestamp()
                })
            })
        } else if (reaction.emoji.name === `${emoji[4]}` && answersarray[3] != answersarray[correct]) {
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("BLUE")
                .setTitle("Trivia!")
                .setDescription(`**Incorrect!**\n\nThe correct answer was ${answersarray[correct]}\nBetter luck next time!`)
                .setFooter("Trivia")
                .setTimestamp()
            })
        }
    }
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}*/
