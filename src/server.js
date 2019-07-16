const Discord = require('discord.js');
const { prefix, token, ownerID, DBLAPI } = require('../config.json');
const chalk = require('chalk');
const fs = require('fs');
const os = require('os-utils');
const DBL = require('dblapi.js');

class Server extends Discord.Client {
    constructor(options) {
        super(options);
        //Define Commands
        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
        //config
        this.ownerID = ownerID;
        this.prefix = prefix;
        //OS Resource Uses Stats
        this.os = os;
        //webhook
        this.hook = new Discord.WebhookClient('550178643041583105', 'VnHF1yYzAvCRc7-qvflAWW60u92_oGryrUTrG5GTpHtEAkL2Fw1uTYYabCrMPrXNCsZ7');
        //Other Stuff
        this.embed = Discord;
        this.dbl = new DBL(`${DBLAPI}`, this);

        this._init();
    };
    //Command Handler
    loadCMDs() {
        const load = dir => {
            const commands = fs.readdirSync(`./commands/${dir}/`).filter(d => d.endsWith('.js'));
            for (let file of commands) {
                const cache = require.resolve(`../commands/${dir}/${file}`);
                delete require.cache[cache];
                const pull = require(`../commands/${dir}/${file}`);
                this.commands.set(pull.config.name, pull);
                if (pull.config.aliases) pull.config.aliases.forEach(a => this.aliases.set(a, pull.config.name));
                this.info(`Loaded Command: ${pull.config.name}`);
            }
        }
        ['main', 'owner'].forEach(a => load(a));
        this.info('All Commands Successfully loaded', true);
        return ('Reloaded all Commands');
    };
    //Event Handler
    _loadEvents() {
        const load = dir => {
            const events = fs.readdirSync(`./events/${dir}/`).filter(d => d.endsWith('.js'));
            for (let file of events) {
                const evt = require(`../events/${dir}/${file}`);
                let eName = file.split('.')[0];
                if (eName === 'ready') {
                    this.once(eName, evt.bind(null, this));
                    this.info(`Loaded Event: ${eName}`);
                    continue;
                }
                if (eName === 'posted') {
                    this.dbl.on(eName, evt.bind(null, this));
                    this.info(`Loaded Event: ${eName}`);
                    continue;
                }
                if (eName === 'error') {
                    this.dbl.on(eName, evt.bind(null, this));
                    this.info(`Loaded Event: ${eName}`);
                    continue;
                }
                this.on(eName, evt.bind(null, this));
                this.info(`Loaded Event: ${eName}`);
            }
        };
        ['client', 'guild', 'shard', 'dbl'].forEach(a => load(a));
        this.info('All Events Successfully loaded', true);
        return ('Loaded All Events');
    };
    //Console Logging
    error(error) {
        console.log(new Date().toLocaleTimeString(), `[${chalk.bold.red('Error')}]:`, chalk.bold.red(error));
    };
    warning(warning) {
        console.log(new Date().toLocaleTimeString(), `[${chalk.bold.yellow('Warning')}]:`, chalk.bold.yellow(warning));
    };
    info(info, zucc) {
        if (zucc) return console.log(new Date().toLocaleTimeString(), `[${chalk.bold.green('Success')}]:`, chalk.bold.green(info));

        console.log(new Date().toLocaleTimeString(), `[${chalk.whiteBright('Info')}]:`, chalk.whiteBright(info));
    };
    //Initialize Bot
    async _init() {
        process.on('unhandledRejection', console.error);
        process.on('uncaughtException', console.error);
        this._loadEvents();
        this.loadCMDs();
        this.login(token).catch(this.error);
        this.info(this.ws.shards.size);
    };

};

module.exports = Server;