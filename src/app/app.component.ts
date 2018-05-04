import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
/* import { Events } from 'ionic-angular';
import { NavController } from 'ionic-angular'; */
//import { Tabs } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any = TabsPage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, keyboard: Keyboard, modalCtrl: ModalController) { //, public events: Events, public navCtrl: NavController
    
    statusBar.styleDefault();
    splashScreen.hide();
    keyboard.disableScroll(true);
    /* this.videoOpts = {scalingMode: 1};
    this.videoPlayer.play('file:///android_asset/www/splash.mp4').then(() => {

    }).catch(err => {
      console.log(err);
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
    }); */

  }

  /* changeTab(index) {
    var t: Tabs = this.navCtrl.parent;
    t.select(index);
    //
    //setTimeout(function () {
    //data.changeTabTrue = 0;
    //}, 100);
  } */
}
