import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ShareService } from '../../services/share/share';



/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class Splash {
  data: object;


  constructor(public navCtrl: NavController, public navParams: NavParams, public splashScreen: SplashScreen, public viewCtrl: ViewController, shareService: ShareService) {
    this.data = shareService.getData();
    this.data["shareService"] = shareService;

    this.data["splashScreenOn"] = 1;
  }

  ionViewDidEnter() {


    //this.viewCtrl.dismiss();

    /* this.videoPlayer.play("assets/video/splash.mp4").then(() => {
      console.log('video completed');
      this.viewCtrl.dismiss();
      
    }).catch(err => {
      alert("Error!")
      console.log(err)
    }); */

  }

  splashEnded() {
    this.data["splashScreenOn"] = 0;
    this.viewCtrl.dismiss();
  }

}
