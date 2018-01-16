# ECA Social Pay V0.4.0

![Electra Social Pay](https://i.imgur.com/rwlGj2r.png)

Send Payments with Electracoin across various social platforms. 

Currently Supports Twitter, Discord, Slack, Telegram

In Progress: Cross OS Support, UI built w/ Electron

## Getting Started

1. Download nodejs
2. Set Up Config File.JS & Wallet
3. Run app.js or apptest.JS

Youtube Tutorial: https://youtu.be/LI2XdWNMWDY

General Commands To Use:

!!! NEWEST UPDATE !!!

Telegram: 

-Message The Bot To Set Address:
    - !address YourECAaddress
    
- In Group Say This To Pay:
    - !pay @username amount
        -console will show errors
        
        * USERS MUST MESSAGE BOT FIRST TO RECEIVE MESSAGES FROM BOT
        Telegram is tricky set up. Users MUST has username set, then their username is saved with their userID. You can then @username and you will be able to interact with user. To avoid spam the app is set up to Message Users directly instead of in chat/group.
        

Twitter:
* Tweet The Following To Set Address:
    * !address @yourBotName YourECAaddress

* Tweet The Following to Pay
    * !pay @theirScreenName Amount

    * There are a few bugs with twitter such as socket time outs if you connect multiple times too quickly. Will need further improvements, but currently works.

Discord:
* Direct Message This to Set Address:
    * !address YourECAaddress

* Message The Following In Your mainChannel to Pay:
    * !pay @theirName Amount

        *There is one bug I've found with getting the userID from their Screen name... Needs further investigation

Slack:
* Message in chat or directly to Set Address:
    * !address YourECAaddress
    
* To Pay:
    * !pay @username amount
        * No known bugs at this time.

### Prerequisites

* NodeJS
* Discord ID if using
* Twitter ID if using
* Slack ID if using
* Telegram ID if using
* Electra Wallet/Funds

## Release Info

* v0.1 - Support For Only Discord
* v0.2 - Support For Twitter Added, Buttons To Not Use Certain Platforms, Wallet Built In/Optional
* v0.3 - Support For Telegram Added, Payments to 4th (0.0000) added
* v0.4 - Support For Slack Added, Config takes all strings, config keys made more specific. Wallet no 
            longer starts with splash and is minimized

Future Plans: Slack Support, Refractor Code, Add Electron GUI with Wallet Functionality.

## Built With

* [Kapitalize](https://github.com/shamoons/Kapitalize) - Industrious Bitcoin Client For Node
* [DiscordJS](https://discord.js.org/#/) - Discord Bot Module
* [twitter](https://github.com/desmondmorris/node-twitter) - Client Library for Twitter Rest and Streaming API's
* [node-telegram-bot-api] (https://github.com/yagop/node-telegram-bot-api) - Telegram Bot API for NodeJS

## Authors

* ** Scibot-ECA ** - *Developer* - [Scibot-ECA](https://github.com/Scibot-ECA)

We Welcome The Community To Contribute! Feel Free To Fork This and Add More!

## License

This project is licensed under the MIT License

## Acknowledgments

* ECA