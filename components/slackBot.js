const { RtmClient, CLIENT_EVENTS, RTM_EVENTS, WebClient } = require('@slack/client');
const config = require("./config.json");
const jsonfile = require('jsonfile');
const kapitalize = require('./kapitalize');
const slackAddresses = ('./components/slackAddresses.json');


let slackInit = () => {

// An access token (from your Slack app or custom integration - usually xoxb)
const token = config.slackToken;
// Cache of data
const appData = {};
// Initialize the RTM client with the recommended settings. Using the defaults for these
// settings is deprecated.
const rtm = new RtmClient(token, {
  dataStore: false,
  useRtmConnect: true,
});
// The client will emit an RTM.AUTHENTICATED event on when the connection data is avaiable
// (before the connection is open)
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (connectData) => {
  // Cache the data necessary for this app in memory
  appData.selfId = connectData.self.id;
  console.log(`Logged in as ${appData.selfId} of team ${connectData.team.id}`);
});

rtm.on(RTM_EVENTS.MESSAGE, (message) => {
    // Determins If Channel Or Direct Message
    let msgFinder = message.channel.charAt(0);
    if (msgFinder === 'C') {
        console.log(`\n Slack Channel Message Detected..`);
    } else if (msgFinder === 'D') {
        console.log(`\n Slack Direct Message Detected...`);
    }
    const args = message.text.slice(config.prefix.length).trim().split(/ +/g);
    //assigns user address to arg1
    const command = args.shift().toLowerCase();

    console.log(`\n New Message: 
    User: ${message.user}
    Channel: ${message.channel}
    Text: ${message.text}`);
    if (!message.text.startsWith(config.prefix)) { 
        console.log(`No Prefix Detected..`);
        return;
    }

    else if (command === 'address' && (!args[0])) {
        console.log(`User Did Not Enter Address Correctly... Sending Reply`);
        rtm.sendMessage(`Try This: !address YourECAaddress`, message.channel);
        return;
    }

    else if (command === 'address' && args[0]) {
        let address = args[0];
        let newInfo = (`"${message.user}": "${address}"`);
        console.log(`Address Detected: User ${message.user} Address ${address}`);
        jsonfile.readFile(slackAddresses, (err, obj) => {
            if (err) {
                console.log(`Error Reading slackaddresses.json: ${err}`);
                return;
            } else if (!obj[message.user]) {
                let newObj = (JSON.parse(JSON.stringify(obj).slice(0,-1)+","+newInfo+"}"));
                jsonfile.writeFile(slackAddresses, newObj, (err) => {
                    if (err) {
                    console.log(`Error Writing to slackaddresses.json: ${err}`);
                    return;
                    } else {
                        console.log(`Info Saved: User: ${message.user} Address: ${address}`);
                        rtm.sendMessage(`Information Saved: ${message.user} Address: ${address}`, message.channel);
                        return;
                    }
                });
            } else if (obj[message.user]) {
                // Sets Old Address
                let oldAddress = obj[message.user];
                // Define Search Parameters
                let needle = (`"${message.user}":"${oldAddress}"`);
                        // Set New Information
                let newAddress = (`"${message.user}":"${address}"`);
                        // Parses Edited Address List
                let saveThis = JSON.parse(JSON.stringify(obj).replace(needle,newAddress));
                        // Saves To Addresses.JSON
                    jsonfile.writeFile(slackAddresses, saveThis, (err) => {
                        if (err) {
                            console.log(`Error Saving to slackaddresses.json: ${err}`);
                        } else {
                            console.log(`Information Updated: User ${message.user} Address: ${address}`);
                            rtm.sendMessage(`Information Saved: ${message.user} Address: ${address}`, message.channel);
                        }
                    })
                

            }
        })
    }


    else if (command === 'pay' && message.user !== config.slackOwnerID) {
        console.log(`Someone might be trying to use your bot`);
        rtm.sendMessage(`I do not think you are the owner...`, message.channel);
        return;
    }

    else if (command === 'pay' && message.user === config.slackOwnerID && !args[0]) {
        console.log(`You did not specify who: !pay @user amount`);
        rtm.sendMessage(`Try This: !pay @user amount`, message.channel);
        return;
    }

    else if (command === 'pay' && message.user === config.slackOwnerID && !args[1]) {
        console.log(`You did not specify amount: !pay @user amount`);
        rtm.sendMessage(`Try This: !pay @user amount`, message.channel);
        return;
    }

    else if (command === 'pay' && message.user === config.slackOwnerID) {
        let payTo = args[0].slice(2, -1);
        let amtArg = parseFloat(args[1]);
        let amtStr = amtArg.toFixed(4);
        let amt = Number(amtStr);
        jsonfile.readFile(slackAddresses, (err, obj) => {
            if (err) {
                console.log(`Error Reading slackaddresses.json: ${err}`);
                return;
            } else if (!obj[payTo]) {
                console.log(`Address Not Found: Sending Message..`);
                rtm.sendMessage(`Address Not Found: !address YourECAaddress`, message.channel);
                return;
            } else if (obj[payTo]) {
                kapitalize.sendToAddress(obj[payTo], amt);
                console.log(`Payment Sent To User: ${payTo} Address: ${obj[payTo]} Amount: ${amt}`);
                rtm.sendMessage(`Sent ${amt} ECA`, message.channel);
            }
        })

    }
});

// The client will emit an RTM.RTM_CONNECTION_OPEN the connection is ready for
// sending and recieving messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPEN, () => {
  console.log(Ready);
});
 
// Start the connecting process
rtm.start(token);   

}

module.exports = { 
    slackInit
};