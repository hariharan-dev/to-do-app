import { Category } from '../../models'
import { Injectable } from "@angular/core";

@Injectable()
export class CategoryService {

    constructor(
    ) {
    }

    masterData(){
        return [
            new Category().deserialize({name: "Default", id: "default"})        ]
    }
}
