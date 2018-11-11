import { Observable } from 'rxjs';

export interface ConfigInterface
{
    isDebugEnabled(): boolean;
    getDiscordToken(): string;
    load() : Observable<void>
}