const Discord = require('discord.js');
const unirest = require('unirest');
const schedule = require('node-schedule');
const sleep = require('sleep');


const client = new Discord.Client();

let date = new Date();
let day_string = date.getDate().toString().padStart(2, '0');
let month_string = (date.getMonth() + 1).toString().padStart(2, '0');
let year_string = date.getFullYear().toString();

let gameTime = "";
let awayTeam = '';
let homeTeam = '';
let gameId = 0;
let isGame = false;

let updateDateRule = new schedule.RecurrenceRule();
updateDateRule.hour = 7;
updateDateRule.minute = 0;

let updateDateJob = schedule.scheduleJob(updateDateRule, function () {
    date = new Date();
    day_string = date.getDate().toString().padStart(2, '0');
    month_string = (date.getMonth() + 1).toString().padStart(2, '0');
    year_string = date.getFullYear().toString();
});

client.on('message', msg => {
    if (msg.content === "!game") {
        console.log(day_string);
        let req = unirest("GET", "https://www.balldontlie.io/api/v1/games?seasons[]=2019&team_ids[]=7&dates[]=" + year_string + "-" + month_string + "-" + day_string);
        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            if (res.body.data.length > 0) {
                isGame = true;
                res.body.data.forEach(game => {
                    let start_time = timeConverter(parseInt(game.status.substring(0, 2))) + game.status.substring(1, 4);
                    gameId = game.id;
                    gameTime = start_time;
                    awayTeam = game.visitor_team.full_name;
                    homeTeam = game.home_team.full_name;
                    client.channels.get('566703016443510798').send("Today's game: " + game.visitor_team.full_name + " @  " + game.home_team.full_name + "\nGame starts at " + start_time);
                })
            } else {
                client.channels.get('566703016443510798').send("The Dallas Mavericks do not play today");
            }
        });
    }
});

let rule2 = new schedule.RecurrenceRule();
rule2.hour = 8;
rule2.minute = 5;

// check if there are any games
let job = schedule.scheduleJob(rule2, function () {
    let req = unirest("GET", "https://www.balldontlie.io/api/v1/games?seasons[]=2019&team_ids[]=7&dates[]=" + year_string + "-" + month_string + "-" + day_string);

    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        if (res.body.data.length > 0) {
            isGame = true;
            res.body.data.forEach(game => {
                gameTime = timeConverter(parseInt(game.status.substring(0, 1))) + game.status.substring(1, 4);
                gameId = game.id;
                homeTeam = game.home_team.full_name;
                awayTeam = game.visitor_team.full_name;
            })
        } else {
            isGame = false;
        }
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

// send the results after 4 hours
let resultsRule = new schedule.RecurrenceRule();
resultsRule.hour = parseInt(gameTime.substring(0, 2)) + 2;

if (isGame) {
    let resultsJob = schedule.scheduleJob(resultsRule, function () {
        while (res.body.status !== "Final") {
            let req = unirest("GET", "https://www.balldontlie.io/api/v1/games/" + gameId.toString());
            req.end(function (res) {
                if (res.error) throw new Error(res.error);
                if (res.body.status === "Final") {
                    date = new Date();
                    client.channels.get("566703016443510798").send("FINAL SCORE:\n" + res.body.home_team.full_name + " " + res.body.home_team_score
                        + " : " + res.body.visitor_team_score + " " + res.body.visitor_team.full_name);
                }
            });
            sleep.sleep(300);
        }

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

client.login('NjUyODU3NzA1MTMxNjcxNTYy.XeujiQ.XBDHGFLsMWo_vB8xrREjUe8c3aE');
