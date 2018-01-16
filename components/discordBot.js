const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const jsonfile = require('jsonfile');
const kapitalize = require('./kapitalize');
const client = new Discord.Client();
const users = new Discord.Collection();
const discFile = (__dirname + '\\discordAddresses.json');

let discordInit = () => {

    console.log(`Connecting To Discord...`);

    //MAIN CHANNEL / SERVER
    client.on("message", (message) => {
        //splits args after !
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        //assigns user address to arg1
        const address = message.content.slice(args).split(/ +/g);
        //shifts to LC
        const command = args.shift().toLowerCase();
        //Stops if no prefix, if Author is BOT, or if Channel is not Main-Channel
        if (!message.content.startsWith(config.prefix) || message.author.bot || message.channel.id !== config.mainChannel || message.author.id !== config.yourDiscordID) return;
        
        else if (command === "pay" && (!args[0]) && message.author.id === config.yourDiscordID) {
            message.reply(`(╯°□°）╯︵ʎɐd \n Who?!? \n hint: !pay @username`);
            return;
        }
        
        else if (command === "pay") {
            // Set Tipper As Message Author
            let tipper = message.author.id;
            // Sets @Username as sendTo
            let sendToArg = args[0];
            // Parses Args2 to Integer
            let amtArg = parseFloat(args[1]);
            let amtStr = amtArg.toFixed(4);
            let amt = Number(amtStr);    
            // Finds >
            console.log(`sendToArg: ${sendToArg}`)
            let lastBit = sendToArg.lastIndexOf('>');
            // Strips Off Extra Characters
            let sendTo = sendToArg.substr(2,lastBit-2);
            console.log(`sendTo: ${sendTo}`);
            // Reads Addresses.JSON        
            jsonfile.readFile(discFile, (err, obj) => {
                if (err) {
                    console.log(`Error Reading discordAddresses.json: ${err}`);
                // If No Address
                } else if (!obj[sendTo]) {
                    console.log(`User Address Not Found: Sending DM`);
                    // Message Tip Received
                    client.fetchUser(sendTo)
                    .then(user => {user.send(`Hi ${sendToArg}! \n Someone Just Tried Sending You A Payment \n But You Have No Address Set Up! \n Reply With The Following To Set Up Address: \n !address YourECA_Address`)});
                    return;
                // If Address Is Found
                } else if (obj[sendTo]) {
                    // SEND TIP GOES HERE
                    kapitalize.sendToAddress(obj[sendTo],amt);
                    //Log and Reply Tip Amount and Receiver
                    console.log(`Sent ${amt} ECA Sent To: ${obj[sendTo]}`);
                    message.reply(`Sent ${amt} ECA To ${sendToArg}`);
                    return;
                }
            })
            
        }
    });

    //PRIVATE MESSAGES
    client.on("message", (message) => {
        //Sets currentUser to Author ID
        const currentUser = message.author.id;
        //splits args after !
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        //assigns user address to arg1
        const address = args[1];
        //shifts to LC
        const command = args.shift().toLowerCase();
        //Stops if no prefix, if Author is BOT, or if Channel is not Private
        if (!message.content.startsWith(config.prefix) || message.author.bot || message.channel.id == config.discordBotID) return;
        
        else if(command === "address" && message.channel.id !== config.mainChannel ) {

            if(address === undefined) {
                message.reply(`!address YourAddressHere \n ^^^^^is the correct way^^^^^`);
                console.log(`${message.author.id} Messed Up Up`);
                return;
            }

            else if(address === `Your_Address`) {
                message.reply(`Type Your Public Address...`);
                console.log(`${message.author.id} Messed Up Up`);
                return;
            }

            // Sets UserID as Key, Address as Info
            let newInfo = (`"${currentUser}": "${address}"`);
            jsonfile.readFile(discFile, (err, obj) => {
                if (err) {
                    console.log(`Error Reading discAddresses.json: ${err}`);
                    return;
                // If No Address
                } else if (!obj[currentUser]) {
                    // Adds New Info to Addresses.JSON
                    let newObj = (JSON.parse(JSON.stringify(obj).slice(0,-1)+","+newInfo+"}"));
                    // Writes New Addresses To Addressess.JSON
                    jsonfile.writeFile(discFile, newObj, function(err) {
                        if(err) {
                    //Displays Error If Error
                    console.log(`(ノಠ益ಠ)ノ彡┻━┻ ${err}`);
                    return; 
                        } else {
                    //Logs & Replies With Saved Information
                    console.log(`Information Saved! ${message.author.username} Address: ${newObj[currentUser]}`);        
                    message.reply(`Information Saved! Address: ${newObj[currentUser]}`);
                    return;    
                        }
                    })
                            //This Changes Your Address If Found
                        } else {
                            // Sets Old Address
                    let oldAddress = obj[currentUser];
                            // Define Search Parameters
                    let needle = (`"${currentUser}":"${oldAddress}"`);
                            // Set New Information
                    let newAddress = (`"${currentUser}":"${address}"`);
                            // Parses Edited Address List
                    let saveThis = JSON.parse(JSON.stringify(obj).replace(needle,newAddress));
                            // Saves To Addresses.JSON
                    jsonfile.writeFile(discFile, saveThis, (err) => {
                        if(err) {
                            console.log(`(ノಠ益ಠ)ノ彡┻━┻ ${err}`);
                            return;
                                } else {
                            //Logs & Replies With Saved Information
                            console.log(`(◕‿◕✿) Information Saved ${message.author.username} Address: ${saveThis[currentUser]}`);        
                            message.reply(`(◕‿◕✿) Information Saved! Address: ${saveThis[currentUser]}`);
                            return;    
                        }
                })
            }
        })
    }

        //Checks For Your Address and Returns From JSON
        if(command === "checkaddress") {
            //Reads addresses.JSON
            jsonfile.readFile(discFile, function(err, obj) {
                if (err) {
                    //Provides Error if Error
                    console.log("(ノಠ益ಠ)ノ彡┻━┻" + err);
                    return;
                } else if (!obj[currentUser]) {
                    // Log Not Found And Tells User No Address Set
                    console.log(`(ノಠ益ಠ)ノ彡┻━┻ No Address Set For This Person`);
                    return;
                } else {
                    // Log Found Address + Message User Set Address
                    console.log(obj[currentUser]);
                    message.reply(`(◕‿◕✿) \n You're address is ${obj[currentUser]}`);
                    return;
                }
            });
        }
    });

    // The Code Below Messages Every New User With Their Address
    // If No Address Set It Will Message Them With Greeting
    // If You Have Many Tip Bots In One Room, This Can Get Annoying
    // So I Turned Off. Turn On By Removing // At Beggining Of All Lines

    // // When New User Joins
    // client.on("guildMemberAdd", (member) => {
    // // Adds New Member to Users
    //     users.set(member.id, member.user);
    // // Reads Addresses.JSON
    //     jsonfile.readFile(file, function(err, obj) {
    //         if (err) {
    //             console.log("(ノಠ益ಠ)ノ彡┻━┻" + err);
    //             users.find("id", member.id).send(`ლ(ಠ益ಠლ) \n Hey! ${member.user}, Tell The Bot Owner I Can't Read The Addresses List!`);
    //         // If No ID is Found in Addresses.JSON
    //         } else if(!obj[member.id]) {
    //             console.log(`(ノಠ益ಠ)ノ彡┻━┻ \n No Address Set For ${member.user} : Sending Greeting`)
    //             users.find("id", member.id).send(
    //                 ` (◕‿◕✿)  Hey! ${member.user},  \n \n I Am A Bot That Tips ECA \n \n If You Want To Receive Tips Reply: \n \n !address YourECA_Address \n \n ^^^^^^ DM This To Set Tip Address ^^^^^ \n \n Change Your Address Anytime By Repeating This Command. `);
    //             //Deletes Member From Users Collection
    //             users.delete(member.id);
    //         // If Address Is Found
    //         } else {
    //             // Logs & DMs user with Address and Info How To Change
    //             console.log(`A Wild ${member.user} Has Appeared!`);
    //             users.find("id", member.id).send(`(◕‿◕✿) \n Hey! ${member.user}, Your Address is ${obj[member.id]}. \n \n You can change this with !address Your_Address`);
    //         }
    //         //Deletes Member From Users Collection
    //         users.delete(member.id);
    //         })
    //     });

    // client.on("guildMemberRemove", (member) => {
    //     // If User Leaves and Still is in Users, Removes User
    //     if(users.has(member.id)) users.delete(member.id);
    // });

    // Turns On The Bot, Dude.
    client.login(config.discordToken);
};

module.exports = { 
    discordInit
};