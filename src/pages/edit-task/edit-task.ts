import { Component, OnInit, Injector } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Category, Task } from '../../models/index';
import { BasePage, CategoryCreationPage } from '../index';
import { CategoryService, UserService } from '../../providers/index';
import { DatePicker } from '@ionic-native/date-picker';
import { ViewController } from 'ionic-angular/navigation/view-controller';


@Component({
  selector: 'page-edit-task',
  templateUrl: 'edit-task.html'
})
export class EditTaskPage extends BasePage implements OnInit {

  categories: Category[];
  selectedCategory: string;
  task : Task;
  searchTask : Task;
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
    this.task = this.navParams.get('task');
    this.searchTask = this.task;
    this.selectedCategory = this.task.category.id;
  }

  ngOnInit(){
  }

  ionViewDidLoad(){
    this.categories = this.userService.user.categories;
  }

  saveTask() {
    if(this.selectedCategory != this.task.category.id){
      this.task.category = this.userService.user.categories.filter((category) => category.id == this.selectedCategory)[0]
    }

    var index = this.userService.user.tasks.findIndex(task => task == this.searchTask);
    if(index != undefined){
      this.userService.user.tasks[index] = this.task;
      this.userService.saveUser();
      this.showToast("Task Saved");
      this.dismissPage(true);
    }
    else
    this.somethingWentWrong();
  }

  showDatePicker(){
    this.datePicker.show({
        date: new Date(),
        mode: 'date',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
      }).then(
        date => {this.task.dueDate = date.toLocaleDateString();},
        err => this.showToast('Error occurred while getting date')
      );
  }
  
  dismissPage(status?: boolean){
    this.viewCtrl.dismiss(status);
  }

  deleteTask(){
    this.showConfirm("Are you sure?", "Press Yes to delete the task?", [
      {
        text: 'No',
        role: 'cancel',
        value: false,
        handler: () => {
        }
      },
      {
        cssClass: 'yes_button',
        text: 'Yes',
        role: 'ok',
        value: true,
        handler: () => {
          var indexOfTaskToBeDeleted = this.userService.user.tasks.findIndex(task => task == this.task);
          if(indexOfTaskToBeDeleted != undefined){
            this.userService.user.tasks.splice(indexOfTaskToBeDeleted,1)
            this.userService.saveUser();
            this.showToast("Task Deleted")
            this.dismissPage(true)
          }
          else
          this.somethingWentWrong();
      }
    }
    ]);
  }

  completeTask(){
    this.showConfirm("Are you sure?", "Press Yes to Complete the task?", [
      {
        text: 'No',
        role: 'cancel',
        value: false,
        handler: () => {
        }
      },
      {
        cssClass: 'yes_button',
        text: 'Yes',
        role: 'ok',
        value: true,
        handler: () => {
          var indexOfTaskToBeCompleted = this.userService.user.tasks.findIndex(task => task == this.task);
          if(indexOfTaskToBeCompleted != undefined){
            this.userService.user.tasks[indexOfTaskToBeCompleted].isCompleted = true;
            this.userService.saveUser();
            this.showToast("Task Completed")
            this.dismissPage(true)
          }
          else
          this.somethingWentWrong();
      }
    }
    ]);

  }

  restoreTask(){
    this.showConfirm("Are you sure?", "Press Yes to restore the task?", [
      {
        text: 'No',
        role: 'cancel',
        value: false,
        handler: () => {
        }
      },
      {
        cssClass: 'yes_button',
        text: 'Yes',
        role: 'ok',
        value: true,
        handler: () => {
          var indexOfTaskToBeRestored = this.userService.user.tasks.findIndex(task => task == this.task);
          if(indexOfTaskToBeRestored != undefined){
            this.userService.user.tasks[indexOfTaskToBeRestored].isCompleted = false;
            this.userService.saveUser();
            this.showToast("Task Restore")
            this.dismissPage(true)
          }
          else
          this.somethingWentWrong();
      }
    }
    ]);

  }


  newCategory(){
    this.present(CategoryCreationPage, {});
  }
}
