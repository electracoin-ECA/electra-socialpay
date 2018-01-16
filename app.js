const twitter = require("./components/twitterbot");
const kapitalize = require('./components/kapitalize');
const discord = require("./components/discordBot");
const slack = require("./components/slackBot");
let telegram = require('./components/telegramBot');
const teleUsers = './components/teleUsers.json';
const twitFile = ('./components/twitAddresses.json');
const discFile = ('./components/discordAddresses.json');
const config = require('./components/config.json');
const { spawn } = require('child_process');

if(config.needWallet === 'on') {
    const EconfigInit = require('./configInit.js');
    console.log(`needWallet ON: Setting Up Wallet...`);
    const bat = spawn('cmd.exe', ['/c', 'runme.bat'])
    bat.stderr.on('data', (data) => {
        console.log(`Starting Wallet Bat File:`);
        console.log(data.toString());
    });

        if(config.discordPower === 'on') {
            discord.discordInit();
            console.log(`Discord Has Connected...`);
        } else if (config.discordPower === 'off') {
            console.log(`Discord Set OFF.... Not Initialized...`);
        }

        if(config.telegramPower === 'on') {
            telegram.teleInit();
            console.log(`Telegram Has Connected...`);
        } else if (config.telegramPower === 'off') {
            console.log(`Telegram Set OFF... Not Initialized...`);
        }

        if(config.slackPower === 'on') {
            slack.slackInit();
            console.log(`Slack Has Connected...`);
        } else if (config.telegramPower === 'off') {
            console.log(`Slack Set OFF... Not Initialized...`);
        }

        if(config.twitterPower === 'on') {
            twitter.twitInit();
            console.log(`Twitter Has Connected...`);
            } else if (config.twitterPower === 'off') {
                console.log(`Twitter Set OFF.... Not Initialized...`);
            }

    bat.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
    });

} else if (config.needWallet === 'off') {
    
    console.log(`needWallet OFF... Not Initialized...`);    

        if(config.discordPower === 'on') {
            discord.discordInit();
            console.log(`Discord Has Connected...`);
        } else if (config.discordPower === 'off') {
            console.log(`Discord Set OFF.... Not Initialized...`)
        }

        if(config.telegramPower === 'on') {
            telegram.teleInit();
            console.log(`Telegram Has Connected...`);
        } else if (config.telegramPower === 'off') {
            console.log(`Telegram Set OFF... Not Initialized...`);
        }

        if(config.slackPower === 'on') {
            slack.slackInit();
            console.log(`Slack Has Connected...`);
        } else if (config.telegramPower === 'off') {
            console.log(`Slack Set OFF... Not Initialized...`);
        }

        if(config.twitterPower === 'on') {
            twitter.twitInit();
            console.log(`Twitter Has Connected...`);
            } else if (config.twitterPower === 'off') {
                console.log(`Twitter Set OFF.... Not Initialized...`);
            }

} else {
    console.log(`Not Sure What You Are Trying To Do.... Set Up Config File!`);
}