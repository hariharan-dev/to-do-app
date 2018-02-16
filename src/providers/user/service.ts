import 'rxjs/add/operator/map';
import { User, Category, Task } from '../../models';
import { Injectable } from '@angular/core';
import { CategoryService } from '../category/index';
import { StorageService } from '../storage/index';         

@Injectable()
export class UserService {
    KEY = "user1"
    public user: User;
    constructor(
        public categoryService: CategoryService,
        public storage: StorageService) {
         }

    saveUser() {
        this.storage.storeData(this.KEY, this.user);
    }

    loadUser() {
        return this.storage.getData(this.KEY, User)
            .map(data => {
                this.user = data;
                return this.user;
            });
    }

    logout() {
        this.storage.removeData(this.KEY);
        this.user = new User();
    }

    addCategory(category: Category){
        this.user.categories.push(category);
        this.saveUser();
    }

    addTask(task: Task){
        this.user.tasks.push(task);
        this.saveUser();
    }

}
