import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { ShareService } from '../../services/share/share';
import { TabsPage } from '../tabs/tabs';

@Component({
  templateUrl: 'popover.html'
})

export class PopoverContentPage {
  data: object;
  //TabsPage: TabsPage;
  
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, shareService: ShareService) {
    this.data = shareService.getData();
    this.data["shareService"] = shareService;
  }
  close() {
    this.viewCtrl.dismiss();
    this.navCtrl.push(TabsPage, {}, {animate: false});
  }
}