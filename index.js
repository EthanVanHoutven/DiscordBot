const Discord = require("discord.js");
const config = require("./config.json");
const randomColour = require('random-color');

const client = new Discord.Client();
const prefix = "/";

const commandHandler = {};

commandHandler['flipcoin'] = (args) => {
    function doRandHT() {
        console.log(args)
        if (args.length == 2){
            var rand = [args[0].toUpperCase() + "!", args[1].toUpperCase() + "!"]
        }
        else{
            var rand = ['HEADS!','TAILS!'];
        }
        return rand[Math.floor(Math.random()*rand.length)];
    }
    const embed = {
        "title": `Coinflip says...`,
        "description": doRandHT(),
        "color": randomColour().hexString(),
        };
    return embed;
}

commandHandler['roll'] = (args) =>{
    //todo ; error handling
    const numDice = args[0].split('d')[0];
    const dice = args[0].split('d')[1];
    console.log(args)
    console.log("Rolling " + numDice + " d" + dice)
    function rollDice(){
        const results = [];
        for (i=0; i < numDice; i++){
            results.push(Math.floor(Math.random()*Math.floor(dice)))
        }
        return results.toString();
    }
    const embed = {
        "title": `You rolled...`,
        "description": rollDice() + ' ! ',
        "color": randomColour().hexString(),
    };
    return embed
}

client.on("message",function(message) {
    if (message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const commandStr = args.shift().toLowerCase();

    const commandFunction = commandHandler[commandStr]
    if(!commandFunction) return;

    try{
        const embed = commandFunction(args);
        message.channel.send({ embed });
    } catch(err){
        console.warn('Error handling command');
        console.warn(err);
    }
});


client.login(config.BOT_TOKEN);