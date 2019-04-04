const Discord = require('discord.js');
const client = new Discord.Client();

var message = "";

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {
 if (msg.content === 'ping') {
 msg.reply('pong');
 }
 });
 
client.on('message', msg =>{
    if (msg.content == 'Marco'){
        msg.reply('Polo!');
    }
})

client.on('message', msg =>{
    if (msg.content == 'lol'){
        msg.reply('BadJoke++;');
    }
})

client.on('message', msg =>{
    if (msg.content == 'hehe'){
        msg.reply('VeryGoodJoke++;');
    }
})

client.on('message', msg =>{
    if (msg.content == 'jabolj play despacito'){
        msg.reply('https://www.youtube.com/watch?v=kJQP7kiw5Fk');
    }
})

client.on('message', msg =>{
    if (msg.content.substring(0,11) == 'jabolj play'){
        message = msg.content;
        console.log(message);
        var query = message.substring(12, message.length);
        console.log(query);
        var formatted = query.replace(/ /gi, "+");
        console.log(formatted);
        var reply = 'https://www.youtube.com/results?search_query=' + formatted;
        msg.reply(reply);
    }
})  

client.login('NTYzMTI1NzkyMDIwNzU4NTI4.XKU46g.dFleGkHP3CoAX9jZSje23pvgjdM');