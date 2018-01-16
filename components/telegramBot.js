process.env["NTBA_FIX_319"] = 1;
const config = require("./config.json");
const TelegramBot = require ('node-telegram-bot-api');
const token = config.telegramToken;
const teleBot = new TelegramBot(token, {polling: true});
const fs = require('fs');
const jsonfile = require('jsonfile');
const kapitalize = require('./kapitalize');
const teleFile = ('./components/teleAddresses.json');
const teleUsers = ('./components/teleUsers.json');


let teleInit = () => {


teleBot.on('polling_error', (error) => {
    console.log(error); // => 'EFATEL'
});

  teleBot.on('message', (msg) => {

      let unix = Math.floor(new Date() / 1000);
      let callName = '@ECA_Tip_Bot';
      let msgType = msg.chat.type;
      let chatID = msg.chat.id;
      let userID = msg.from.id;
      let BotOwnerID = parseInt(config.telegramOwnerID);
      let userName = msg.from.username;
      let msgCont = msg.text;
      const args = msgCont.slice(config.prefix.length).trim().split(/ +/g);
      let command = args[0].toLowerCase();

      if (!msgCont) {
        console.log(`undefined msg Error is happening`);
        return;
    }

    if (!msgCont.startsWith(config.prefix)) {
        console.log(`No Prefix Was Detected`);
        return;
    }

      
      if (msg.date >= (unix-5)) {
          console.log(`New Telegram Message:
          // msgType: ${msgType}
          // Chat ID: ${chatID}
          // User ID: ${userID}
          // UserName: ${userName}
          // Message Content: ${msgCont}
          // Command: ${command}`);

        if (userName !== 'undefined') {
            
        jsonfile.readFile(teleUsers, (err, obj) => {
            if (err) {
                console.log(`Error @ !undefined: Reading JSON: ${err}`);
            } else if (!obj[userName]) {
                let newInfo = (`"${userName}": "${userID}"`);
                let newObj = (JSON.parse(JSON.stringify(obj).slice(0,-1)+","+newInfo+"}"));
                jsonfile.writeFile(teleUsers, newObj, (err) => {
                    if(err) {
                        console.log(`Error Saving name/id: ${err}`);
                    } else {
                        console.log(`New UserName/UserID Pair Saved ${newInfo}`);
                    }
                })
            } else if (obj[userName]) {
                console.log(`Message Detected: Username & ID Found`)
                return;
            }
        });
        
    };

        if (command === 'pay' && !args[1] && userID === BotOwnerID) {
            console.log(`No User Specified.. !pay @user amount`);
            teleBot.sendMessage(chatID, `Pay Who? Type: !pay @userName amount`);
        }

        else if (command === 'pay' && userID !== BotOwnerID) {
            console.log(`Someone Else is Trying To Pay`);
            teleBot.sendMessage(chatID, `You Do Not Own This Bot`);
        }


        else if (command === 'pay' && userID === BotOwnerID) {
            let payToUN = args[1].substr(1);
            let amtArg = parseFloat(args[2]);
            let amtStr = amtArg.toFixed(4);
            let amt = Number(amtStr);
            console.log(`Pay Called: Reading teleUsers for ID..`);
            jsonfile.readFile(teleUsers, (err, obj) => {
                if (err) {
                    console.log(`Error Reading teleUsers: ${err}`);
                } else if (!obj[payToUN]) {
                    console.log(`Not Found Here....why?`);
                    teleBot.sendMessage(chatID, `No Address Set Up.. Message me: !address YourAddress`)
                } else if (obj[payToUN]) {
                    let theirID = obj[payToUN];
                    console.log(`Getting Address For UserID: ${theirID}`);
                    jsonfile.readFile(teleFile, (err, obj) => {
                        if (err) {
                            console.log(`Error Reading Telefile: ${err}`);
                        } else if (!obj[payToUN]) {
                            console.log(`No Address Saved For This Person`);
                            
                            teleBot.sendMessage(chatID, `Hey @${args[1]}, ${userName} just tried sending you ${amt} ECA! message me with !address YourECAaddress to save and receive payments!`);
                        } else if (obj[payToUN]) {
                            console.log(`Address Found For User: Sending ${amt} ECA to ${obj[payToUN]}`);
                            kapitalize.sendToAddress(obj[payToUN], amt);
                            teleBot.sendMessage(theirID, `Hey @${payToUN}, ${userName} just paid you ${amt} ECA!`)
                        }
                    })
                }
            })
        }

        else if (command === 'address' && msgType == 'group') {
            let address = args[1];
            console.log(`Address Command in Group Detected`);
            teleBot.sendMessage(chatID, `Hey ${userName}, Dont Post in Group! You need to message me with !address YourECAaddress to save!`)
        }

        else if (command === 'address' && msgType == 'private' && !args[1]) {
            let address = args[1];
            console.log(`${userName} did not provide address`);
            teleBot.sendMessage(chatID, `Wrong, Type: !address YourECAaddress`);
        }

        else if (command === 'address' && msgType == 'private' && args[1]) {
            let address = args[1];
            console.log(`\n User: ${userName} \n Address: ${address}`);
            let newInfo = (`"${userName}": "${address}"`);
            console.log(`New Info: ${newInfo}`);
            jsonfile.readFile(teleFile, (err, obj) => {
                if (err) {
                    console.log(`Error Reading: ${err}`);
                } else if (!obj[userName]) {
                    let newObj = (JSON.parse(JSON.stringify(obj).slice(0,-1)+","+newInfo+"}"));
                    jsonfile.writeFile(teleFile, newObj, (err) => {
                        if(err) {
                    //Displays Error If Error
                    console.log(`Error Saving New Address: ${err}`);
                    return; 
                } else {
                    console.log(`Info Saved. Name: ${userName} Address: ${newObj[userName]}`)
                        }
                    })
                } else if (obj[userName]) {
                    // Sets Old Address
                    let oldAddress = obj[userName];
                    // Define Search Parameters
                    let needle = (`"${userName}":"${oldAddress}"`);
                            // Set New Information
                    let newAddress = (`"${userName}":"${address}"`);
                            // Parses Edited Address List
                    let saveThis = JSON.parse(JSON.stringify(obj).replace(needle,newAddress));
                            // Saves To Addresses.JSON
                    jsonfile.writeFile(teleFile, saveThis, (err) => {
                        if (err) {
                            console.log(`Error Replacing Address: ${err}`);
                        } else {
                            console.log(`Info Saved. Name: ${userName} Address: ${saveThis[userName]}`);
                        }
                    })
                }
            })
        }
        }
    })

}

module.exports = { 
    teleInit
};
      // Check Bot's New Messages For New ID/Username
    //   let newInfo = (`"${userName}": "${userID}"`);
    //   console.log(`New Info: ${msgType}`);
    //   let teleFilestr = JSON.stringify(teleFile);
    //   console.log(`Userlist: ${teleFilestr}`);


    //   jsonfile.readFile(teleFile, (err, obj) => {
    //     if (err) {
    //         console.log("(ノಠ益ಠ)ノ彡┻━┻" + err);
    //         return;
    //     // If No Address
    //     } else {
    //         console.log(`Object: ${JSON.stringify(obj)}`);
    //     } })





        // } else if (!obj[currentUser]) {




//             // Adds New Info to Addresses.JSON
//             let newObj = (JSON.parse(JSON.stringify(obj).slice(0,-1)+","+newInfo+"}"));
//             // Writes New Addresses To Addressess.JSON
//             jsonfile.writeFile(discFile, newObj, function(err) {
//                 if(err) {
//             //Displays Error If Error
//             console.log(`(ノಠ益ಠ)ノ彡┻━┻ ${err}`);
//             return; 
//                 } else {
//             //Logs & Replies With Saved Information
//             console.log(`(◕‿◕✿) Information Saved! ${} Address: ${newObj[]}`);        
//             message.reply(`(◕‿◕✿) Information Saved ${} Address: ${newObj[]}`);
//             return;    
//                 }
//             })
//                     //This Changes Your Address If Found
//                 } else {
//                     // Sets Old Address
//             let oldAddress = obj[currentUser];
//                     // Define Search Parameters
//             let needle = (`"${currentUser}":"${oldAddress}"`);
//                     // Set New Information
//             let newAddress = (`"${currentUser}":"${address}"`);
//                     // Parses Edited Address List
//             let saveThis = JSON.parse(JSON.stringify(obj).replace(needle,newAddress));
//                     // Saves To Addresses.JSON
//             jsonfile.writeFile(discFile, saveThis, (err) => {
//                 if(err) {
//                     console.log(`(ノಠ益ಠ)ノ彡┻━┻ ${err}`);
//                     return;
//                         } else {
//                     //Logs & Replies With Saved Information
//                     console.log(`Information Saved ${} Address: ${}`);        
//                     message.reply(`Information Saved ${} Address: ${}`);
//                     return;    
//                 }
//         })
//     }
// })
// }




    //   // Only Display Recent Messages. Prevents Bot Spam
    //   if (msg.date >= (unix-10)) {

    // console.log(`
    // msgType: ${msgType}
    // Chat ID: ${chatID}
    // User ID: ${userID}
    // UserName: ${userName}
    // Message Content: ${msgCont}
    // Args: ${args}
    // Command: ${command}
    // `);
    // // teleBot.sendMessage(, `This Worked`);
    // } else {
    //     return;
    // }


  
// teleBot.on('channel_post', (msg) => {
//     console.log(`
//     Channel Name: ${msg.chat.title}
//     Channel Chat ID: ${msg.chat.id}
//     Channel Content: ${msg.text}`);
// });

//     // send a message to the chat acknowledging receipt of their message
//     teleBot.sendMessage(chatId, `Received Your Message. ChatId: ${chatId}`);
//   });