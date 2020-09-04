const discord = require("discord.js")

module.exports = {
    name: 'roast',
    description: 'Randomly roasts the user or a mentioned user!',
    args: false,
    usage: '<member>',
    guildOnly: false,
    cooldown: 2,
    accessibleBy: 'Everyone',
    category: 'Fun',
    run: async(client, message, args) => {
        var roasts = ["You’re the reason God created the middle finger.", "You’re a grey sprinkle on a rainbow cupcake.", " If your brain was dynamite, there wouldn’t be enough to blow your hat off.", "You are more disappointing than an unsalted pretzel.", "Your kid is so annoying that he makes his Happy Meal cry.", "You have so many gaps in your teeth it looks like your tongue is in jail.", "Your secrets are always safe with me. I never even listen when you tell me them.", " I’ll never forget the first time we met. But I’ll keep trying.", "I forgot the world revolves around you. My apologies, how silly of me.", " I only take you everywhere I go just so I don’t have to kiss you goodbye.", "Hold still. I’m trying to imagine you with personality.", "Our kid must have gotten his brain from you! I still have mine.", "Your face makes onions cry.", "The only way my husband would ever get hurt during an activity is if the TV exploded.", "You look so pretty. Not at all gross today. It’s impossible to underestimate you.", "Her teeth were so bad she could eat an apple through a fence.", "I’m not insulting you, I’m describing you.", "I’m not a nerd, I’m just smarter than you.", "Keep rolling your eyes, you might eventually find a brain.", "Your face is just fine but we’ll have to put a bag over that personality.", "You bring everyone so much joy, when you leave the room.", "I thought of you today. It reminded me to take out the trash.", "Don’t worry about me. Worry about your eyebrows.", "You are the human version of period cramps.", "If you’re going to be two-faced, at least make one of them pretty.", "You are like a cloud. When you disappear it’s a beautiful day.", "I’d rather treat my baby’s diaper rash than have lunch with you.", "Don't worry, the first 40 years of childhood are always the hardest.", "I may love to shop but I will never buy your bullshit.", "I love what you’ve done with your hair. How do you get it to come out of your nostrils like that?", "OH MY GOD! IT SPEAKS!", "Check your lipstick before you come for me.", "It looks like she went into Claire's Boutique- fell on a sale rack and said: I'll take it!", "You are so full of shit, the toilet's jealous.", "Impersonating Beyoncè is not your destiny, child.", "Don’t get bitter, just get better.", "Child, I’ve forgotten more than you ever knew.", "You just might be why the middle finger was invented in the first place.", 'I feel sorry for the tree that tirelessly works to produce oxygen for you.', 'even I have more common sense than you and i\'m a robot!', 'you suck so much that the room has no oxygen left', 'you have the kinds of looks that make people talk about your personality', 'your body fat is about as evenly distributed as wealth in the US economy.', 'even the shower doesn\'t want to see you naked.', 'when the airforce needs extra landing space they should just rent out your forehead.', 'it looks like your face caught fire and someone tried to put it out with a hammer.', 'your family tree must be a cactus because everyone on it is a prick.', 'I wasn\'t born with enough middle fingers to let you know how I feel about you.', 'you\'re so fat the only letters of the alphabet you know are KFC.', 'I see you were so impressed with your first chin that you added two more.', 'the last time I saw a face like yours I fed it a banana.', "shut yo skin tone chicken bone google chrome no home flip phone disowned ice cream cone garden gnome extra chromosome metronome dimmadome genome full blown monochrome student loan indiana jones overgrown flintstone x and y hormone friend vaccine aquamarine eugene extra green nicotine vaseline jellybean magazine protein lightning-mcqueen vending machine what'chu mean Ocean Man by Ween head ass tf up bitch"]
        message.delete();
        if(message.mentions.members.first() != null) {
            message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${message.mentions.members.first().toString()}, ${roasts[Math.floor(Math.random() * roasts.length)]}`)
            });
        } else {
            message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(roasts[Math.floor(Math.random() * roasts.length)])
            });
        }
    }
}