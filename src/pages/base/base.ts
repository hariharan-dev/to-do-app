import {
    AlertController,
    LoadingController,
    ModalController,
    PopoverController,
    ToastController
    } from 'ionic-angular';
  import { Component, Injector } from '@angular/core';
import { AlertPopoverPage } from '../index';
  
  @Component({
    selector: 'page-base',
    templateUrl: 'base.html',
  })
  export class BasePage {
    public loader: any;
    public toast: any;
  
    protected toastCtrl: ToastController;
    protected loadingCtrl: LoadingController;
    protected modalCtrl: ModalController;
    protected alertCtrl: AlertController;
    protected popoverCtrl: PopoverController;
  
    constructor(protected injector: Injector) {
      this.loadingCtrl = injector.get(LoadingController);
      this.toastCtrl = injector.get(ToastController);
      this.modalCtrl = injector.get(ModalController)
      this.alertCtrl = injector.get(AlertController);
      this.popoverCtrl = injector.get(PopoverController);
  
    }
  
    // ionViewCanEnter() {
    //     if (this.storeService.user)
    //         return true;
  
    //     return false;
    // }
  
 
    presentLoader(message: string) {
      this.loader = this.loadingCtrl.create({ content: message });
      this.loader.present();
    }
  
    dismissLoader() {
      if (this.loader != null || this.loader != undefined) {
        this.loader.dismiss();
        this.loader = undefined;
      }
    }
  
    showToast(message: string, duration: number = 3000) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: duration
      });
  
      toast.present();
    }
  
    showAlert(title: string, subTitle: string) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: ['OK']
      });
      alert.present();
    }
  
    showConfirm(title: string, subTitle: string, buttons: any[]) {
      let confirm = this.alertCtrl.create({
        title: title,
        message: subTitle,
        buttons: buttons
      });
      confirm.present();
    }
  
    present(page: any, params: any, callback?: any) {
      let profileModal = this.modalCtrl.create(page, params);
      profileModal.onDidDismiss(callback);
      profileModal.present();
    }
  
    /**
     * A convenience method to show something went wrong!
     */
    somethingWentWrong(err?: any) {
        if (err) {
          var fabric = (<any>window).fabric;
          if (fabric) {
            fabric.Crashlytics.addLog("Oops server request went wrong");
            fabric.Crashlytics.addLog(JSON.stringify(err));
            fabric.Crashlytics.sendNonFatalCrash("Server Request Error");
          }
        }
  
        this.dismissLoader();
        this.presentPopoverAlert(
            'Oops!',
            'Sorry something went wrong!',
            'ios-bug-outline');
    }
  
    presentPopoverAlert(title: string, content: string, iconName?: string, iconColor?: string) {
      let popover = this.popoverCtrl.create(
        AlertPopoverPage,
        {
          iconName: iconName,
          title: title,
          content: content,
          iconColor: iconColor
        });
      popover.present();
    }
  }
  