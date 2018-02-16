import { Injectable } from '@angular/core';
import { Serializable } from '../../models';
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class StorageService {

    constructor(public storage: Storage) { }

    storeData(key: string, value: Serializable<any>) {
        this.storage.set(key, JSON.stringify(value));
    }

    getData(key: string, model): Observable<any> {
        return Observable.fromPromise(
            this.storage.get(key).then(
                data => {
                    var object = new model().deserialize(JSON.parse(data));
                    return object;
                }
            ));
    }

    removeData(key: string) {
        return this.storage.remove(key);
    }

}
