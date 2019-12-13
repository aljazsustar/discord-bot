const Discord = require('discord.js');
const client = new Discord.Client();
const https = require('https');
const schedule = require('node-schedule');

let message = "";
let rule = new schedule.RecurrenceRule();
rule.hour = 6;
rule.minute = 0;

let motivationJob = schedule.scheduleJob(rule, function () {
    https.get('https://api.kanye.rest/?format=text', (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            client.channels.get('651822721457586188').send(data);
        })
    })
});

client.on('message', msg => {
    if (msg.content === 'Marco') {
        msg.reply('Polo!');
    }
});

client.on('message', msg => {
    if (msg.content === 'jabolj play despacito') {
        msg.reply('https://www.youtube.com/watch?v=kJQP7kiw5Fk');
    }
});

client.on('message', msg => {
    if (msg.content.substring(0, 11) === 'jabolj play') {
        message = msg.content;
        console.log(message);
        var query = message.substring(12, message.length);
        console.log(query);
        var formatted = query.replace(/ /gi, "+");
        console.log(formatted);
        var reply = 'https://www.youtube.com/results?search_query=' + formatted;
        msg.reply(reply);
    }
});
client.login('NTYzMTI1NzkyMDIwNzU4NTI4.XKU46g.dFleGkHP3CoAX9jZSje23pvgjdM');
