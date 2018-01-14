# ECA Social Pay V0.2.0

![Electra Social Pay](https://i.imgur.com/rwlGj2r.png)

Send Payments with Electracoin across various social media platforms. 
Currently Supports Twitter, Discord

In Progress: Telegram, Slack

## Getting Started

1. Download nodejs
2. Set Up Config File.JS & Wallet
3. Run app.js or apptest.JS

Youtube Tutorial: https://youtu.be/LI2XdWNMWDY

General Commands To Use:

Twitter:
- Tweet The Following To Set Address:
    - !address @yourBotName address

- Tweet The Following to Pay
    - !pay @theirScreenName Amount

    There are a few bugs with twitter such as socket time outs. Will need further improvements, but currently works.

Discord:
- Direct Message This to Set Address:
    - !address YourAddress

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

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* ECA