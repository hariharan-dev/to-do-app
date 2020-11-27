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
            this.settingUpNotification();
          }
          else {
            console.log("new user");
            userService.user = new User().deserialize({ id: 1, tasks: [], categories: categoryService.masterData() });
            userService.saveUser();
            this.settingUpNotification()
          }
          this.rootPage = TabsPage
          splashScreen.hide();
        }
      )
    });
  }

  // scheduling the notification to today`s 8am if app is opened before 8am
  // else scheduling the notification to tomorrow`s 8am.

  settingUpNotification() {
    // var notificationTime;

    // if (new Date().getHours() <= 7) {
    //   // getting todays date with 8 am as time
    //   notificationTime = new Date(new Date(new Date().setHours(8, 0, 0, 0)))
    //   this.localNotifications.schedule({
    //     id: this.userService.user.id,
    //     at: notificationTime
    //   })
    // }
    // else {
    //   // getting tomorrow`s date with 8 am as time
    //   notificationTime = new Date(new Date(new Date().setHours(8, 0, 0, 0)).setDate(new Date().getDate() + 1))
    //   this.localNotifications.schedule({
    //     id: this.userService.user.id,
    //     at: notificationTime
    //   })
    // }

  }
}
