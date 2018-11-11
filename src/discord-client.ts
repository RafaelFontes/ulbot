import { injectable, inject } from 'inversify';
import TYPES from './types';
import { Config } from './config';
import * as Discord from 'discord.js';
import { Observable, BehaviorSubject } from 'rxjs';

@injectable()
export class DiscordClient {

    private connector: Discord.Client;
    
    messages: BehaviorSubject<Discord.Message>;

    constructor(
        @inject(TYPES.CONFIG_INTERFACE) private config: Config,
    )
    {
        this.messages = new BehaviorSubject(null);
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
            if (this.config.isDebugEnabled()) {
                const debugStringArray = [];
                
                debugStringArray.push("<")
                debugStringArray.push(new Date().toISOString().
                replace(/T/, ' ').      
                replace(/\..+/, ''))
                debugStringArray.push("> ")
                debugStringArray.push('[');
                debugStringArray.push(msg.author.username);
                debugStringArray.push('] ');
                debugStringArray.push(msg.content);

                console.log(debugStringArray.join(''));
            }

            this.messages.next(msg);
        });
    }
}