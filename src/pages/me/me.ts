import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController, Tabs } from 'ionic-angular';
import { PopoverContentPage } from '../popover/popover';
import { ShareService } from '../../services/share/share';

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
  data: object;
  meTabs: string;
  assetsTabs: string;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, shareService: ShareService) {
    this.data = shareService.getData();
    this.data["shareService"] = shareService;

    this.meTabs = "Info";
    this.assetsTabs = "House";
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverContentPage);
    popover.present({
      ev: myEvent
    });
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  changeTab(index) {
    var t: Tabs = this.navCtrl.parent;
    t.select(index);
  }

  /* sexualityConfirm (data) {
    data.years[data.age].events.push("I declared myself as " + data.sexuality + ".");
  } */

  sexualityChanged(data, sexuality) {
    data.sexuality = sexuality;
    //console.log(sexuality, data.oldSexuality);
    if (data.oldSexuality != sexuality) data.shareService.sexualityConfirm(data);
    data.oldSexuality = sexuality;
    //console.log(sexuality, data.oldSexuality);
  }
}
