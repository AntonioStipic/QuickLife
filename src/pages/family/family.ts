import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController, Tabs } from 'ionic-angular';
import { PopoverContentPage } from '../popover/popover';
import { ShareService } from '../../services/share/share';

@Component({
  selector: 'page-family',
  templateUrl: 'family.html'
})
export class FamilyPage {
  data: object;
  familyTabs: string = "Parents";
  popover = this.popoverCtrl.create(PopoverContentPage);

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, shareService: ShareService) {
    this.data = shareService.getData();
    this.data["shareService"] = shareService;

    // this.familyTabs = "Parents";
  }

  changeTab(index, data) {
    var t: Tabs = this.navCtrl.parent;
    t.select(index);
    //
    //setTimeout(function () {
    //data.changeTabTrue = 0;
    //}, 100);
  }

  openPopover(myEvent) {
    this.popover.present({
      ev: myEvent
      //, animate: false
    });
  }

}
