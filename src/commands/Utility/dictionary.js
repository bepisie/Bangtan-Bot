const googleDictionaryApi = require("google-dictionary-api")
const discord = require("discord.js");

module.exports = {
    name: 'dictionary',
    description: 'Search for the meaning of a word!',
    args: true,
    usage: '<word>',
    guildOnly: false,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Utility',
    aliases: ['definition', 'definitions', 'define'],
    run: async(client, message, args) => {
        let word = args[0]

        let nounDefinitions = []
        let exclaimationDefinitions = []
        let verbDefinitions = []
        let pronounDefinitions = []
        let adjectiveDefinitions = []
        let adverbDefinitions = []
        let prepositionDefinitions = []
        let conjunctionDefinitions = []
        let transativeverbDefinitions = []

        let nounExamples = []
        let exclaimationExamples = []
        let verbExamples = []
        let pronounExamples = []
        let adjectiveExamples = []
        let adverbExamples = []
        let prepositionExamples = []
        let conjunctionExamples = []
        let transativeverbExamples = []


        let embed = new discord.MessageEmbed()
            .setTitle(word.charAt(0).toUpperCase() + word.slice(1))
            .setColor("RANDOM")


        googleDictionaryApi.search(word, 'en').then(results=>{
            if (results[0].meaning.noun) {
                let i = 0;
                results[0].meaning.noun.forEach(word => {
                    nounDefinitions.push(word.definition)
                    if (word.example === undefined) {
                        nounExamples.push(`No example given`)
                    } else {
                        nounExamples.push(word.example)
                    }
                })

                let string = [];
                nounDefinitions.forEach(noun => {
                    i = i + 1;
                    string.push(`**${i} -** ${noun}\n**Example** - ${nounExamples[i-1]}`)
                })

                embed.addField("**Noun:**", string.join('\n\n'))
                
            }

            if (results[0].meaning.exclamation) {
                let i = 0;
                results[0].meaning.exclamation.forEach(word => {
                    exclaimationDefinitions.push(word.definition)
                    if (word.example === undefined) {
                        exclaimationExamples.push(`No example given`)
                    } else {
                        exclaimationExamples.push(word.example)
                    }
                })
                let string = [];
                exclaimationDefinitions.forEach(exclaimation => {
                    i = i + 1;
                    string.push(`**${i} -** ${exclaimation}\n**Example** - ${exclaimationExamples[i-1]}`)
                })

                embed.addField("**Exclaimation:**", string.join('\n\n'))
                
            }

            if (results[0].meaning.verb) {
                let i = 0;
                results[0].meaning.verb.forEach(word => {
                    verbDefinitions.push(word.definition)
                    if (word.example === undefined) {
                        verbExamples.push(`No example given`)
                    } else {
                        verbExamples.push(word.example)
                    }
                })

                let string = [];
                verbDefinitions.forEach(verb => {
                    i = i + 1;
                    string.push(`**${i} -** ${verb}\n**Example** - ${verbExamples[i-1]}`)
                })

                embed.addField("**Verb:**", string.join('\n\n'))
                
            }

            if (results[0].meaning.pronoun) {
                let i = 0;
                results[0].meaning.pronoun.forEach(word => {
                    pronounDefinitions.push(word.definition)
                    if (word.example === undefined) {
                        pronounExamples.push(`No example given`)
                    } else {
                        pronounExamples.push(word.example)
                    }
                })

                let string = [];
                pronounDefinitions.forEach(pronoun => {
                    i = i + 1;
                    string.push(`**${i} -** ${pronoun}\n**Example** - ${pronounExamples[i-1]}`)
                })

                embed.addField("**Pronoun:**", string.join('\n\n'))
                
            }

            if (results[0].meaning.adjective) {
                let i = 0;
                results[0].meaning.adjective.forEach(word => {
                    adjectiveDefinitions.push(word.definition)
                    if (word.example === undefined) {
                        adjectiveExamples.push(`No example given`)
                    } else {
                        adjectiveExamples.push(word.example)
                    }
                })

                let string = [];
                adjectiveDefinitions.forEach(adjective => {
                    i = i + 1;
                    string.push(`**${i} -** ${adjective}\n**Example** - ${adjectiveExamples[i-1]}`)
                })

                embed.addField("**Adjective:**", string.join('\n\n'))
                
            }

            if (results[0].meaning.adverb) {
                let i = 0;
                results[0].meaning.adverb.forEach(word => {
                    adverbDefinitions.push(word.definition)
                    if (word.example === undefined) {
                        adverbExamples.push(`No example given`)
                    } else {
                        adverbExamples.push(word.example)
                    }
                })

                let string = [];
                adverbDefinitions.forEach(adverb => {
                    i = i + 1;
                    string.push(`**${i} -** ${adverb}\n**Example** - ${adverbExamples[i-1]}`)
                })

                embed.addField("**Adverb:**", string.join('\n\n'))
                
            }

            if (results[0].meaning.preposition) {
                let i = 0;
                results[0].meaning.preposition.forEach(word => {
                    prepositionDefinitions.push(word.definition)
                    if (word.example === undefined) {
                        prepositionExamples.push(`No example given`)
                    } else {
                        prepositionExamples.push(word.example)
                    }
                })

                let string = [];
                prepositionDefinitions.forEach(preposition => {
                    i = i + 1;
                    string.push(`**${i} -** ${preposition}\n**Example** - ${prepositionExamples[i-1]}`)
                })

                embed.addField("**Preposition:**", string.join('\n\n'))
                
            }

            if (results[0].meaning.conjunction) {
                let i = 0;
                results[0].meaning.conjunction.forEach(word => {
                    conjunctionDefinitions.push(word.definition)
                    if (word.example === undefined) {
                        conjunctionExamples.push(`No example given`)
                    } else {
                        conjunctionExamples.push(word.example)
                    }
                })

                let string = [];
                conjunctionDefinitions.forEach(conjunction => {
                    i = i + 1;
                    string.push(`**${i} -** ${conjunction}\n**Example** - ${conjunctionExamples[i-1]}`)
                })

                embed.addField("**Conjunction:**", string.join('\n\n'))
                
            }

            if (results[0].meaning["transitive verb"]) {
                let i = 0;
                results[0].meaning["transitive verb"].forEach(word => {
                    transativeverbDefinitions.push(word.definition)
                    if (word.example === undefined) {
                        transativeverbExamples.push(`No example given`)
                    } else {
                        transativeverbExamples.push(word.example)
                    }
                })

                let string = [];
                transativeverbDefinitions.forEach(transativeverb => {
                    i = i + 1;
                    string.push(`**${i} -** ${transativeverb}\n**Example** - ${transativeverbExamples[i-1]}`)
                })

                embed.addField("**Transative Verb:**", string.join('\n\n'))
                
            }

            message.channel.send(embed)
        }).catch(error=>{
            console.log(error)
        })
    }
}







