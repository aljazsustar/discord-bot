const Discord = require('discord.js');
const client = new Discord.Client();
const https = require('https');

let message = "";

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {
    if (msg.content === "dad joke") {
        https.get('https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes', (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                let object = JSON.parse(data);
                msg.reply(object.setup + " " + object.punchline);
            });
        });
    } else if (msg.content === "programming dad joke") {
        https.get('https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/type/programming', (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                let object = JSON.parse(data);
                msg.reply(object[0].setup + " " + object[0].punchline);
            });
        });
    }
});


client.on('message', msg =>{
    if (msg.content === 'Marco') {
        msg.reply('Polo!');
    }
});

client.on('message', msg =>{
    if (msg.content === 'lol') {
        msg.reply('BadJoke++;');
    }
});

client.on('message', msg =>{
    if (msg.content === 'hehe') {
        msg.reply('VeryGoodJoke++;');
    }
});

client.on('message', msg =>{
    if (msg.content === 'jabolj play despacito') {
        msg.reply('https://www.youtube.com/watch?v=kJQP7kiw5Fk');
    }
});

client.on('message', msg =>{
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

function fetchJoke(callback) {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://us-central1-dadsofunny.cloudfunctions.net/DadJokes//random/jokes', true);
    request.send();
    request.onreadystatechange = function () {
        if (request.status === "200") {
            let json = JSON.parse(request.responseText);
            callback(json);
        }
    };
}

client.login('NTYzMTI1NzkyMDIwNzU4NTI4.XKU46g.dFleGkHP3CoAX9jZSje23pvgjdM');
