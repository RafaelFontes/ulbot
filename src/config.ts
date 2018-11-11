import { ConfigInterface } from '@ul-plugin/interface';
import { injectable, inject } from 'inversify';
import { ResourceLoader } from './resource-loader';
import TYPES from './types';
import { Observable } from 'rxjs';

@injectable()
export class Config implements ConfigInterface
{
    discord: any;

    constructor(
        @inject(TYPES.RESOURCE_LOADER) private resourceLoader: ResourceLoader
    ) 
    {
    }
    
    getDiscordToken(): string {
        return this.discord.token;
    }

    load()
    {
        return new Observable(observer => {
            this.resourceLoader.load('config.json').subscribe( configBuffer => {
                const config = JSON.parse(configBuffer.toString());
                this.discord = config.discord;

                observer.next();
                observer.complete();
            });
        })
    }

}