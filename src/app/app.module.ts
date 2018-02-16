import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { DatePicker } from '@ionic-native/date-picker';
import { Badge } from '@ionic-native/badge';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { 
  TasksPage,
  TabsPage,
  BasePage,
  AlertPopoverPage,
  TaskCreationPage,
  EditTaskPage,
  CategoryCreationPage
} from '../pages'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//providers
import { IonicStorageModule } from '@ionic/storage';

import { 
  UserService,
  CategoryService,
  StorageService
  } from '../providers'

@NgModule({
  declarations: [
    MyApp,
    TasksPage,
    TabsPage,
    BasePage,
    AlertPopoverPage,
    TaskCreationPage,
    EditTaskPage,
    CategoryCreationPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TasksPage,
    TabsPage,
    BasePage,
    AlertPopoverPage,
    TaskCreationPage,
    EditTaskPage,
    CategoryCreationPage
  ],
  providers: [
    Badge,
    DatePicker,
    LocalNotifications,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    CategoryService,
    StorageService
  ]
})
export class AppModule {}
