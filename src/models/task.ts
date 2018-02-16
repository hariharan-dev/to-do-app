import { Serializable } from './base';
import { Category } from './index';

export class Task implements Serializable<Task> {
    public dueDate: string;
    public description: string;
    public category: Category;
    public name: string;
    public isCompleted: boolean;
    constructor() { }

    deserialize(input) {
        this.dueDate = input.dueDate;
        this.category = new Category().deserialize(input.category);
        this.name = input.name;
        this.description = input.description;
        if(input.isCompleted)
        this.isCompleted = input.isCompleted;

        return this;
    }
}