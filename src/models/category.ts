import { Serializable } from './base';

export class Category implements Serializable<Category> {
    public name: string;
    public id: string;
    constructor() { }

    deserialize(input) {
        this.name = input.name;
        this.id = input.id;
        return this;
    }
}