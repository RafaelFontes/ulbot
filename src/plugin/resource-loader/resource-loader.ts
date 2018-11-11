import * as fs from 'fs';
import * as path from 'path';
import { injectable } from 'inversify';
import { Observable } from 'rxjs';
import { ResourceNotFoundException } from '../../exception/resource-not-found.exception';
import { ResourceLoaderInterface } from '../interface/resource-loader.interface';

@injectable()
export class ResourceLoaderPlugin implements ResourceLoaderInterface
{
    private baseDir = '';

    constructor()
    {
        this.baseDir = path.join(__dirname, '..', '..', 'resource');
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