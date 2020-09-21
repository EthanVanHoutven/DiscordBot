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

    const roll = args.join().replace(",","");

    console.log(roll);
    console.log(args);
    const operator = roll.includes('-')?-1:1;
    const rollValues = roll.split(new RegExp('[d+-]','g'))
    
    if(rollValues.legnth < 2)return;
    
    const numDice = rollValues[0];
    const dice = rollValues[1];
    const mod = (rollValues.length==3?rollValues[2].replace(',',''):0)*operator;

    console.log(numDice);
    console.log(dice);
    console.log(mod);

    function rollDice(){
        const results = [];
        for (i=0; i < numDice; i++){
            results.push(Math.floor(Math.random()*Math.floor(dice)) +1);
        }
        return results;
    }
    function addMods(diceRes){
        const sum = diceRes.reduce(function(a,b){return a + b}, 0) + mod ; 
        return "[ "+ diceRes + "] " + mod + " = " + sum;
    }
    const embed = {
        "title": `You rolled...`,
        "description": addMods(rollDice()),
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