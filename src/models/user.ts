import { DefaultSerializationMixin, Serializable } from './base';
import { Task, Category } from './index';


export class User extends DefaultSerializationMixin implements Serializable<User> {
    public id: number
    public tasks : Task[]
    public categories: Category[]

    constructor() {
        super();
    }

    deserialize(input) {
        if (input == null || input == undefined)
            return this;

        this.tasks = [];
        if (input.tasks != null) {
            for (var task of input.tasks) {
                this.tasks.push(
                    new Task().deserialize(task))
            }
        }

        this.categories = [];
        if (input.categories != null) {
            for (var category of input.categories) {
                this.categories.push(
                    new Category().deserialize(category))
            }
        }

        this.id = input.id;

        return this;
    }

    
}
