import { injectable, inject } from 'inversify';
import TYPES from './types';
import { Config } from './config';
import * as Discord from 'discord.js';

@injectable()
export class DiscordClient {

    private connector: Discord.Client;

    constructor(
        @inject(TYPES.CONFIG_INTERFACE) private config: Config,
    )
    {
    }

    connect()
    {
        this.config.load().subscribe(() => {
            this.login(this.config.getDiscordToken());
            this.setUpListeners();
        });
    }

    private login(token: string)
    {
        this.connector = new Discord.Client();
        this.connector.login(token);
    }

    private setUpListeners()
    {
        this.connector.on('ready', () => {
            console.log(`Logged in as ${this.connector.user.tag}!`);
        });

        this.connector.on('message', msg => {
            if (msg.content === 'ping') {
                msg.reply('pong');
            }
        });
    }
}