import { Component, Injector } from '@angular/core';
import { Category } from '../../models/index';
import { BasePage } from '../index';
import { UserService } from '../../providers/index';
import { ViewController } from 'ionic-angular/navigation/view-controller';


@Component({
    selector: 'page-category-creation',
    templateUrl: 'category-creation.html'
})
export class CategoryCreationPage extends BasePage {

    name: string;
    constructor(
        public injector: Injector,
        public viewCtrl: ViewController,
        public userService: UserService
    ) {
        super(injector)
        this.name = "";
    }

    createCategory() {
        if (this.name == undefined || !this.name.match(/[a-z]/i))
            this.showToast("Please enter category name");
        else {
            this.userService.addCategory(
                new Category().deserialize({
                    name: this.name,
                    id: '_' + Math.random().toString(36).substr(2, 9)
                }))
            this.showToast("Category Created");
            this.dismissPage();
        }
    }

    dismissPage() {
        this.viewCtrl.dismiss();
    }
}
