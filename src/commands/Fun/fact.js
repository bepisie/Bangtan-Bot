const discord = require("discord.js")

module.exports = {
    name: 'fact',
    description: 'Sends a fact to yourself or someone else!',
    args: false,
    usage: '<member>',
    guildOnly: false,
    cooldown: 5,
    accessibleBy: 'Everyone',
    category: 'Fun',
    run: async(client, message, args) => {
        var roasts = ["Banging your head against a wall for one hour burns 150 calories.", "The oldest “your mom” joke was discovered on a 3,500 year old Babylonian tablet.", "29th May is officially \“Put a Pillow on Your Fridge Day\".", "7% of American adults believe that chocolate milk comes from brown cows.", "If you lift a kangaroo’s tail off the ground it can’t hop.", "Bananas are curved because they grow towards the sun.", "The inventor of the Frisbee was cremated and made into a Frisbee after he died.", "During your lifetime you will produce enough saliva to fill two swimming pools.", "If Pinocchio says \“My Nose Will Grow Now\” it would cause a paradox. If you think about it Pinocchio’s nose would have to grow to make his statement not a lie but then it can’t grow otherwise the statement would not be a lie.", "Polar bears could eat as many as 86 penguins in a single sitting.", "Movie trailers were originally shown after the movie which is why they were called \"trailers\".", "An eagle can kill a young deer and fly away with it.", "Heart attacks are more likely to happen on a Monday.", "In 2017 more people were killed from injuries caused by taking a selfie than by shark attacks.", "There is a species of spider called the Hobo Spider.", "A lion’s roar can be heard from 5 miles away.", "Saint Lucia is the only country in the world named after a woman.", "A baby spider is called a spiderling.", "The following can be read forward and backwards. Do geese see God?", "A baby octopus is about the size of a flea when it is born.", "The average male gets bored of a shopping trip after 26 minutes meanwhile women don’t get tired of shopping until around 2 hours.", "In the 16th Century, Turkish women could initiate a divorce if their husbands didn’t pour coffee for them.", "Recycling one glass jar saves enough energy to watch television for 3 hours.", "Approximately 10-20% of U.S. power outages are caused by squirrels.", "Facebook, Instagram and Twitter are all banned in China.", "95% of people text things they could never say in person.", "Honeybees can recognize human faces.", "While trying to find a cure for AIDS the Mayo Clinic made glow in the dark cats.", "A swarm of 20,000 bees followed a car for two days because their queen was stuck inside.", "A crocodile can’t poke its tongue out.", "Sea otters hold hands when they sleep so they don’t drift away from each other.", "A small child could swim through the veins of a blue whale.", "There is a total of 1710 steps in the Eiffel Tower.", "A woman tried to commit suicide by jumping off the Empire State Building. She jumped from the 86th floor but was blown back onto the 85th floor by a gust of wind.", "Pirates wore earrings because they believed it improved their eyesight.", "The Twitter bird actually has a name – Larry.", "It snowed in the Sahara desert for 30 minutes on the 18th February 1979.", "The first alarm clock could only ring at 4 a.m.", "Birds don’t urinate.", "Dying is illegal in the Houses of Parliaments.", "The 20th of March is Snowman Burning Day.", "An apple, potato, and onion all taste the same if you eat them with your nose plugged.", "Vincent van Gogh only sold one painting in his lifetime.", "A company in Taiwan makes dinnerware out of wheat, so you can eat your plate.", "The average person walks the equivalent of five times around the world in their lifetime.", "The world record for stuffing drinking straws into your mouth at once is 459.", "Nutella was invented during WWII when hazelnuts were mixed into chocolate to extend chocolate rations.", "According to Genesis 1:20-22 the chicken came before the egg.", "Honeybees can get drunk on fermented tree sap.", "Tears contain a natural pain killer which reduces pain and improves your mood.", "Each year there are more than 40000 toilet related injuries in the United States.", "Strawberries can be red, yellow, green or white.", "In 1998, Sony accidentally sold 700,000 camcorders that had the technology to see through people’s clothes.", "During your lifetime, you will spend around thirty-eight days brushing your teeth."]
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
                .setDescription(`${roasts[Math.floor(Math.random() * roasts.length)]}`)
            });
        }
    }
}