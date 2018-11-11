import { ConfigInterface, ResourceLoaderInterface } from '@ul-plugin/interface';
import { injectable, inject } from 'inversify';
import TYPES from '../../types';
import { Observable } from 'rxjs';

@injectable()
export class ConfigPlugin implements ConfigInterface
{
    discord: any;

    private debugEnabled: boolean;

    constructor(
        @inject(TYPES.RESOURCE_LOADER) private resourceLoader: ResourceLoaderInterface
    ) 
    {
    }
    
    getDiscordToken(): string {
        return this.discord.token;
    }

    isDebugEnabled(): boolean
    {
        return this.debugEnabled;
    }

    load() : Observable<void>
    {
        return new Observable(observer => {
            this.resourceLoader.load('config.json').subscribe( configBuffer => {
                
                const config = JSON.parse(configBuffer.toString());

                this.discord = config.discord;
                this.debugEnabled = config.debug;

                observer.next();
                observer.complete();
            });
        })
    }

}