import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { ModalController, NavParams, Tabs } from 'ionic-angular';
import { ShareService } from '../../services/share/share';
import { TabsPage } from '../tabs/tabs';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'popover.html'
})

export class PopoverContentPage {
  data: object;
  //TabsPage: TabsPage;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, shareService: ShareService, public modalCtrl: ModalController, public splashscreen: SplashScreen, public events: Events) {
    this.data = shareService.getData();
    this.data["shareService"] = shareService;
  }

  close() {
    /* this.viewCtrl.dismiss();
    this.navCtrl.push(TabsPage, {}, { animate: false }); */
    /* this.splashscreen.show();
    window.location.reload(); */
    this.data["shareService"].createMe(this.data, "", "");
    this.viewCtrl.dismiss();
    this.events.publish("goToHome");
  }

  randomId(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  changeTab(index) {
    var t: Tabs = this.data["navCtrl"];
    t.select(index);
    //
    //setTimeout(function () {
    //data.changeTabTrue = 0;
    //}, 100);
  }

  achievements(data) {
    this.viewCtrl.dismiss();
    let achievementModal = this.modalCtrl.create(achievementsModal, { data: data }, {
      showBackdrop: false,
      enableBackdropDismiss: true,
      enterAnimation: 'modal-scale-up-enter',
      leaveAnimation: 'modal-scale-up-leave'
    });
    achievementModal.present();
  }

  customLife(data) {
    this.viewCtrl.dismiss();
    data.customLifeModal = this.modalCtrl.create(customLifeModal, { data: data }, {
      showBackdrop: false,
      enableBackdropDismiss: true,
      enterAnimation: 'modal-scale-up-enter',
      leaveAnimation: 'modal-scale-up-leave'
    });
    data.customLifeModal.present();

    //this.navCtrl.push(TabsPage, {}, { animate: false });
  }

  about(data) {
    this.viewCtrl.dismiss();
    data.aboutModal = this.modalCtrl.create(aboutModal, { data: data }, {
      showBackdrop: true,
      enableBackdropDismiss: true/* ,
      enterAnimation: 'slide-in-right',
      leaveAnimation: 'modal-scale-up-leave' */
    });
    data.aboutModal.present();
  }
}
@Component({
  templateUrl: '../me/customLife.html'
})
export class customLifeModal {
  data: object;
  name: string;
  surname: string;
  gender = "male";
  nationality = "Croatian";
  constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController, public navCtrl: NavController) {
    this.data = shareService.getData();

    //console.log();
  }

  startCustomLife(data, name, surname, gender, nationality) {
    data.customLife = 1;
    data.customLifeInfo = { name: name, surname: surname, gender: gender, nationality: nationality };
    this.navCtrl.push(TabsPage, {}, { animate: false });
  }

  backButtonAction() {
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  templateUrl: '../me/achievements.html'
})
export class achievementsModal {
  data: object;
  hidden;
  constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController, public navCtrl: NavController) {
    this.data = shareService.getData();

    this.hidden = [];

    for (let i = 0; i < this.data["achievements"].length; i++) {
      if (this.data["achievements"][i]["finished"] == false) {
        this.hidden.push(true);
      } else {
        this.hidden.push(false);
      }
    }
    //this.hidden = new Array(this.data["achievements"].length).fill(true); // fill false
  }

  toggleAchievement(index) {
    this.hidden[index] = !this.hidden[index];
  }

  backButtonAction() {
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
@Component({
  templateUrl: '../../pages/me/about.html'
})
export class aboutModal {
  data: object;
  constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController) {
    this.data = shareService.getData();
    //console.log(this.child);
    //console.log();
  }

  backButtonAction() {
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}