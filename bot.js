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

client.on('message', async msg => {
    if (msg.content === 'Marco') {
        msg.reply('Polo!');
    }
    if (msg.content === 'jabolj play despacito') {
        msg.reply('https://www.youtube.com/watch?v=kJQP7kiw5Fk');
    }

    if (msg.content.startsWith('!remind')) {
        remind(msg);
    }
});


function remind(msg) {
    let params = parse(msg);
    console.log(params);
    if (isNaN(params[0]) || isNaN(params[1]) || isNaN(params[2])) {
        msg.reply('NaNaNaNaNaNaNaN BATMAAAAAN');
        return;
    }
    if (params[0] <= 0 && params[1] <= 0 && params[2] <= 0) {
        msg.reply('Wait, that\'s illegal!');
        return;
    }
    msg.reply('Ayy ayy, captain!');
    let reminder_rule = schedule.scheduleJob(setDate(params[0], params[1], params[2]), () => {
        msg.reply(params[3]);
    });

}

function parse(msg) {
    let raw = msg.content.substring(7);
    let days = parseInt(raw.substring(0, raw.indexOf('d')));
    let hours = parseInt(raw.substring(raw.indexOf('d') + 1, raw.indexOf('h')));
    let minutes = parseInt(raw.substring(raw.indexOf('h') + 1, raw.indexOf('m')));
    let message = raw.substring(raw.indexOf('m') + 2);
    return [days, hours, minutes, message]
}

function addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
}

function addHours(date, hours) {
    date.setHours(date.getHours() + hours);
    return date;
}

function addMinutes(date, minutes) {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
}

function setDate(d, h, m) {
    let date = new Date();
    let days = addDays(date, d);
    let hours = addHours(days, h);
    console.log(addMinutes(hours, m));
    return addMinutes(hours, m);
}


client.login('NTYzMTI1NzkyMDIwNzU4NTI4.XKU46g.dFleGkHP3CoAX9jZSje23pvgjdM');
