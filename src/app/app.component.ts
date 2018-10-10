import { Component } from '@angular/core';
import { Platform, ModalController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { App } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any = TabsPage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, keyboard: Keyboard, modalCtrl: ModalController, public app: App, public alertCtrl: AlertController, public events: Events) { //, public events: Events, public navCtrl: NavController

    statusBar.styleDefault();
    splashScreen.hide();
    keyboard.disableScroll(true);
    /* this.videoOpts = {scalingMode: 1};
    this.videoPlayer.play('file:///android_asset/www/splash.mp4').then(() => {

    }).catch(err => {
      console.log(err);
    }); */
    // platform.ready().then(() => {

    //   platform.registerBackButtonAction(() => {
    //     // Catches the active view
    //     let nav = this.app.getActiveNavs()[0];
    //     let activeView = nav.getActive();
    //     // Checks if can go back before show up the alert
    //     // if (activeView.name === "HomePage") {
    //     if (nav.canGoBack()) { //Can we go back?
    //       nav.pop();
    //     } else {
    //       let alert = this.alertCtrl.create({
    //         title: 'Exit QuickLife',
    //         message: 'Are you sure?',
    //         buttons: [{
    //           text: 'Yes',
    //           handler: () => {
    //             platform.exitApp();
    //           }
    //         }, {
    //           text: 'No',
    //           role: 'cancel',
    //           handler: () => {

    //           }
    //         }]
    //       });
    //       alert.present();
    //     }
    //     // } else {
    //     //   // this.events.publish("goToHome");
    //     //   // alert(JSON.stringify(activeView, null, 4));
    //     // }
    //   });

    // });


    platform.registerBackButtonAction(() => {
      let nav = app.getActiveNavs()[0];
      let activeView = nav.getActive();

      if (activeView != null) {
        if (nav.canGoBack())
          nav.pop();
        else if (typeof activeView.instance.backButtonAction === 'function')
          activeView.instance.backButtonAction();
        else if (activeView.name != "HomePage")
          nav.parent.select(0); // goes to the first tab
        else {
          let alert = this.alertCtrl.create({
            title: 'Exit QuickLife',
            message: 'Are you sure?',
            buttons: [{
              text: 'Yes',
              handler: () => {
                platform.exitApp();
              }
            }, {
              text: 'No',
              role: 'cancel',
              handler: () => {

              }
            }]
          });
          alert.present();
        }
      }
    });


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
