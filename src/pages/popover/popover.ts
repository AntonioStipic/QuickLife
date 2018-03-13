import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { ShareService } from '../../services/share/share';
import { TabsPage } from '../tabs/tabs';

@Component({
  templateUrl: 'popover.html'
})

export class PopoverContentPage {
  data: object;
  //TabsPage: TabsPage;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, shareService: ShareService, public modalCtrl: ModalController) {
    this.data = shareService.getData();
    this.data["shareService"] = shareService;
  }

  close() {
    this.viewCtrl.dismiss();
    this.navCtrl.push(TabsPage, {}, { animate: false });
  }

  customLife(data) {
    this.viewCtrl.dismiss();
    data.customLifeModal = this.modalCtrl.create(customLifeModal, { data: data }, {
      showBackdrop: false,
      enableBackdropDismiss: false,
      enterAnimation: 'modal-scale-up-enter',
      leaveAnimation: 'modal-scale-up-leave'
    });
    data.customLifeModal.present();

    //this.navCtrl.push(TabsPage, {}, { animate: false });
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
    data.customLifeInfo = {name: name, surname: surname, gender: gender, nationality: nationality};
    this.navCtrl.push(TabsPage, {}, { animate: false });
  }

  backButtonAction() {
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}