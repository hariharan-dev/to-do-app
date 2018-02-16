import { Component, OnInit, Injector } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { UserService } from '../../providers/index';
import { Task } from '../../models/index';
import { BasePage, TaskCreationPage, EditTaskPage } from '../index';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { Badge } from '@ionic-native/badge';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html'
})
export class TasksPage extends BasePage implements OnInit {

  status: string;
  in_progress_status:string;
  tasks: Task[] = [];
  todayTasks: Task[] = [];
  overDueTasks: Task[] = [];

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public injector: Injector,
    public userService: UserService,
    public badge: Badge,
    public localNotifications: LocalNotifications,
    public platform: Platform
  ) {
    super(injector)
  }

  ngOnInit() {
    this.status = this.navParams.get('status');
    this.in_progress_status = 'today';
  }

  categorizeTasks(){
    switch (this.status) {
      case "open":
        {
        this.tasks = this.userService.user.tasks.filter(
          (task) => (task.dueDate == undefined && !task.isCompleted) || (task.dueDate > new Date().toLocaleDateString() && !task.isCompleted));
        break;
        }
        case "in_progress": {
          this.tasks = [];
          this.todayTasks =[];
          this.overDueTasks =[];
          for(let task of this.userService.user.tasks){
            if(task.dueDate == new Date().toLocaleDateString() && task.isCompleted != true){
              this.todayTasks.push(task);
            }
            else{
              if(task.dueDate < new Date().toLocaleDateString() && task.isCompleted != true){
                this.overDueTasks.push(task)
              }
            }
          }
          break;
        }
      case "complete":
        { 
          this.tasks = this.userService.user.tasks.filter((task) => task.isCompleted == true);
          break;
        }
    }
  }

  ionViewDidLoad() {
    this.categorizeTasks();
    this.updateNotification();
  }

  goToTaskCreationPage() {
    this.present(TaskCreationPage, {}, () => {
      this.ionViewDidLoad()
    });
  }

  showTask(task: Task) {
    this.present(EditTaskPage, { task: task }, (data) => {
      if(data){
        console.log("Edited")
        this.ionViewDidLoad();
      }
    });
  }

  updateNotification() {
    this.localNotifications.update({
      id: this.userService.user.id,
      text: this.getNotificationText()
    });
  }



  getNotificationText() {
    var tomorrowsDate = new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString();
    //filtering only tomorrow`s tasks
    var length = this.userService.user.tasks.
    filter((task) => task.dueDate == tomorrowsDate && task.isCompleted != true).length;

    if (length){
      if(length == 1)
      return "1 Task Today"
      else
      return length + " Tasks Today"
    }
    else
      return "No Tasks Today"
  }

}
