const Discord = require('discord.js');
const client = new Discord.Client();
const https = require('https');

const kletvice = ["fak", "fuck", "shit", "pizda", "kurac", "jebemti", "bitch", "sranje", "picka", "jebote", "fml", "fuk"];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    for (const kletvica of kletvice) {
        if (msg.content.toLowerCase().includes(kletvica) && !msg.author.bot && !(msg.content.toLowerCase().includes("faks"))) {
            msg.reply("Listen here you little imbecile bastard! Who the fuck do you think you are?! I will" +
                " not allow this in my house! Now go to your room and don't come back ever again!");
            break;
        }
    }

    if (msg.content.toLowerCase() === "dad joke") {
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
    } else if (msg.content.toLowerCase() === "programming dad joke") {
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
    } else if (msg.content.toLowerCase().startsWith("i'm") || msg.content.toLowerCase().startsWith("i am")) {
        msg.reply("Hi " + msg.content.substring(4, msg.content.length) + ", I'm dad!")
    }
});

client.login('NjUwNzA4Mjk5ODI1Njc2Mjg4.XePRyg.8C7pGE_UmazQc6sSlQzuEwH3_ws');
