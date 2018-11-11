import { Observable } from 'rxjs';

export interface ResourceLoaderInterface
{
    load(resourceName: string) : Observable<any>;
}