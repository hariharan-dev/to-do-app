import { Component } from '@angular/core';
import {ViewController, NavController,  NavParams} from 'ionic-angular';

/**
 * Generated class for the AlertPopover page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-alert-popover',
  templateUrl: 'alert-popover.html',
})
export class AlertPopoverPage {

   title: string;
  iconName: string;
  iconColor: string = "green";
  content: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ){
    this.title = this.navParams.get('title');
    this.iconName = this.navParams.get('iconName');
    this.content = this.navParams.get('content');
    this.iconColor = this.navParams.get('iconColor')
  }

  closeMe(){
    this.viewCtrl.dismiss();
  }
}
