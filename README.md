# ECA Social Pay V0.2.0

![Electra Social Pay](https://i.imgur.com/rwlGj2r.png)

Send Payments with Electracoin across various social platforms. 
Currently Supports Twitter, Discord

In Progress: Telegram, Slack

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
        
        USERS MUST MESSAGE BOT FIRST TO RECEIVE MESSAGES FROM BOT
        Telegram is tricky set up. Users MUST has username set, then their username is saved with their userID. You can then @username and you will be able to interact with user. To avoid spam the app is set up to Message Users directly instead of in chat/group.
        

Twitter:
- Tweet The Following To Set Address:
    - !address @yourBotName YourECAaddress

- Tweet The Following to Pay
    - !pay @theirScreenName Amount

    There are a few bugs with twitter such as socket time outs if you connect multiple times too quickly. Will need further improvements, but currently works.

Discord:
- Direct Message This to Set Address:
    - !address YourECAaddress

- Message The Following In Your mainChannel to Pay:
    - !pay @theirName Amount

    There is one bug I've found with getting the userID from their Screen name... Needs further investigation


### Prerequisites

NodeJS
Discord ID if using
Twitter ID if using
Electra Wallet/Funds

## Built With

* [Kapitalize](https://github.com/shamoons/Kapitalize) - Industrious Bitcoin Client For Node
* [DiscordJS](https://discord.js.org/#/) - Discord Bot Module
* [twitter](https://github.com/desmondmorris/node-twitter) - Client Library for Twitter Rest and Streaming API's

## Authors

* ** Scibot-ECA ** - *Developer* - [Scibot-ECA](https://github.com/Scibot-ECA)

We Welcome The Community To Contribute! Feel Free To Fork This and Add More!

## License

This project is licensed under the MIT License

## Acknowledgments

* ECA
