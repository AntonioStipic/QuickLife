import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
/* import { Events } from 'ionic-angular';
import { NavController } from 'ionic-angular'; */
import { Tabs } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, keyboard: Keyboard) { //, public events: Events, public navCtrl: NavController
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      keyboard.disableScroll(true);
    });

    /* events.subscribe("goToHome", () => {
      this.changeTab(0);
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
