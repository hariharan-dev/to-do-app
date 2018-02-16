import { Component, Injector } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Category, Task } from '../../models/index';
import { BasePage, CategoryCreationPage } from '../index';
import { CategoryService, UserService } from '../../providers/index';
import { DatePicker } from '@ionic-native/date-picker';
import { ViewController } from 'ionic-angular/navigation/view-controller';


@Component({
  selector: 'page-task-creation',
  templateUrl: 'task-creation.html'
})
export class TaskCreationPage extends BasePage  {

  categories: Category[];
  task: Task = new Task().deserialize({category: new Category().deserialize({name: "Default",id:"default"})});
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public injector: Injector,
    public categoryService: CategoryService,
    public datePicker: DatePicker,
    public viewCtrl: ViewController,
    public userService: UserService
  ) {
    super(injector)
  }


  ionViewWillEnter(){
    this.categories = this.userService.user.categories;
  }

  createTask() {
    if(this.task.name == undefined || !this.task.name.match(/[a-z]/i))
    this.showToast("Please enter task name")
    else {
      this.task.category = this.userService.user.categories.filter((category) => category.id == this.task.category.id)[0]
      this.userService.addTask(this.task)
      this.showToast("Task Created");
      this.dismissPage();
    }
  }

  showDatePicker(){
    this.datePicker.show({
        date: new Date(),
        mode: 'date',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
      }).then(
        date => {
          this.task.dueDate = date.toLocaleDateString();
        },
        err => this.showToast('Error occurred while getting date: ')
      );
  }

  newCategory(){
    this.present(CategoryCreationPage, {});
  }
  
  dismissPage(){
    this.viewCtrl.dismiss();
  }
}
