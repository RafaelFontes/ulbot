import { injectable, inject } from 'inversify';
import { Observable } from 'rxjs';
import { ResourceLoaderPlugin } from '../resource-loader/resource-loader';
import { ConfigInterface } from '../interface';

@injectable()
export class ConfigPlugin implements ConfigInterface
{
    discord: any;

    private debugEnabled: boolean;
    private version: string;

    constructor(
        @inject(ResourceLoaderPlugin) private resourceLoader: ResourceLoaderPlugin
    ) 
    {
    }
    
    getDiscordToken(): string {
        return this.discord.token;
    }

    getVersion(): string {
        return this.version;
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
                this.version = config.version;

                console.log(this.getVersion());

                observer.next();
                observer.complete();
            });
        })
    }

}