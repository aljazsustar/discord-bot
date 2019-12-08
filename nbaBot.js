const Discord = require('discord.js');
const unirest = require('unirest');
const schedule = require('node-schedule');


const client = new Discord.Client();

const date = new Date();
const day_string = date.getDate().toString().padStart(2, '0');
const month_string = (date.getMonth() + 1).toString().padStart(2, '0');
const year_string = date.getFullYear().toString();

let gameTime = "";
let awayTeam = '';
let homeTeam = '';
let isGame = false;

client.on('message', msg => {
    if (msg.content === "!game") {
        console.log(day_string);

        let req = unirest("GET", "https://www.balldontlie.io/api/v1/games?seasons[]=" + year_string + "&team_ids[]=7&dates[]=" + year_string + "-" + month_string + "-" + day_string);
        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            if (res.body.data.length > 0) {
                isGame = true;
                res.body.data.forEach(game => {
                    let start_time = timeConverter(parseInt(game.status.substring(0, 2))) + game.status.substring(1, 4);
                    gameTime = start_time;
                    awayTeam = game.visitor_team.full_name;
                    homeTeam = game.home_team.full_name;
                    client.channels.get('566703016443510798').send("Today's game: " + game.visitor_team.full_name + " @  " + game.home_team.full_name + "\nGame starts at " + start_time);
                })
            } else {
                client.channels.get('566703016443510798').send("The Dallas Maverick do not play today");
            }
        });
    }
});

let rule2 = new schedule.RecurrenceRule();
rule2.hour = 8;
rule2.minute = 0;

// check if there are any games
let job = schedule.scheduleJob(rule2, function () {
    let req = unirest("GET", "https://www.balldontlie.io/api/v1/games?seasons[]=" + year_string + "&team_ids[]=7&dates[]=" + year_string + "-" + month_string + "-" + day_string);

    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        res.body.data.forEach(game => {
            gameTime = timeConverter(parseInt(game.status.substring(0, 1))) + game.status.substring(1, 4);
            homeTeam = game.home_team.full_name;
            awayTeam = game.visitor_team.full_name;
        })
    });
});

// sends notification on game start
let rule3 = new schedule.RecurrenceRule();
rule3.hour = parseInt(gameTime.substring(0, 2)) - 1;
rule3.minute = minutesConverter(parseInt(gameTime.substring(2)));

if (isGame) {
    let job2 = schedule.scheduleJob(rule3, function () {
        client.channels.get('566703016443510798').send(game.visitor_team.full_name + " @  " + game.home_team.full_name + " starts now!");
    });
}

function timeConverter(time) {
    if (time + 18 >= 24) {
        return (time + 18) - 24;
    }
    return time + 18;
}

function minutesConverter(mins) {

    if (mins !== mins) {
        return 0;
    }
    return mins;
}

client.login('NjUyODU3NzA1MTMxNjcxNTYy.XeujiQ.XBDHGFLsMWo_vB8xrREjUe8c3aE').then(r => console.log(r));
client.on('login', () => console.log("Logged in as NBA Bot!"));