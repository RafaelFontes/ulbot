import { Observable } from 'rxjs';

export interface ConfigInterface
{
    getVersion(): string;
    isDebugEnabled(): boolean;
    getDiscordToken(): string;
    load() : Observable<void>
}