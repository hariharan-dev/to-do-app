import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { UserService, CategoryService } from '../providers'
import { User } from '../models/index';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public userService: UserService,
    categoryService: CategoryService,
    public localNotifications: LocalNotifications
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#488aff');
      statusBar.styleLightContent();
      // splashScreen.hide();
      userService.loadUser().subscribe(
        (data) => {
          if (data.categories) {
            console.log("Existing USer");
            this.updateNotificationTime();
          }
          else {
            console.log("new user");
            userService.user = new User().deserialize({id: 1, tasks: [], categories: categoryService.masterData() });
            userService.saveUser();
            this.setUpNotification()
          }
          this.rootPage = TabsPage
          splashScreen.hide();
        }
      )
    });
  }

  // setting up the notification for new user, after this only updating of this notification 
  // will take place with notification id as reference

  setUpNotification() {
    var notificationTime = new Date(new Date(new Date().setHours(8,0,0,0)).setDate(new Date().getDate() + 1))
    this.localNotifications.schedule({
      id: this.userService.user.id,
      at: notificationTime
    })
    console.log("notification set");

  }

  // updating notification time only when the app is open after 8am
  // else just updating the text to not disturb the set notfication at 8am

  updateNotificationTime(){
    if(new Date().getHours() <= 7){
    }
    else
    {
      var notificationTime = new Date(new Date(new Date().setHours(8,0,0,0)).setDate(new Date().getDate() + 1))
      this.localNotifications.update({
        id: this.userService.user.id,
        at: notificationTime
      })
    }
  }
}
