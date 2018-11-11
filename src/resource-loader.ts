import * as fs from 'fs';
import * as path from 'path';
import { injectable } from 'inversify';
import { Observable } from 'rxjs';
import { ResourceNotFoundException } from './exception/resource-not-found.exception';

@injectable()
export class ResourceLoader implements ResourceLoader
{
    private baseDir = '';

    constructor()
    {
        this.baseDir = path.join(__dirname, 'resource');
    }

    load(resourceName: string) : Observable<Buffer>
    { 
        return new Observable(observer => {
            
            const resourcePath = path.join(this.baseDir, resourceName);

            if (!fs.existsSync(resourcePath))
            {
                Observable.throw(new ResourceNotFoundException(resourcePath));
            }

            fs.readFile(resourcePath, (err, data) => {
                if (err) 
                {
                    Observable.throw(err);
                }

                observer.next(data);
                observer.complete();
            });
        });
    }
}