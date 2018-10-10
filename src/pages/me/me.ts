import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController, Tabs } from 'ionic-angular';
import { PopoverContentPage } from '../popover/popover';
import { ShareService } from '../../services/share/share';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
  data: object;
  meTabs: string;
  assetsTabs: string;
  popover = this.popoverCtrl.create(PopoverContentPage);
  
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, shareService: ShareService, public events: Events) {
    this.data = shareService.getData();
    this.data["shareService"] = shareService;

    this.meTabs = "Info";
    this.assetsTabs = "House";

    events.subscribe("goToHome", () => {
      this.changeTab(0);
    });

    events.subscribe("goToHomeNewLife", () => {
      console.log("goToHomeNewLife")
    })

    events.subscribe("goToObituary", () => {
      this.changeTab(5);
    });

  }

  ionViewDidEnter() {
    if (this.data["reloadLife"] == 1) {
      console.log("reloadLife1");
      console.log(this.data["name"]);
      this.data["shareService"].createMe(this.data, "");
      this.changeTab(0);
    } else if (this.data["reloadLife"] == 2) {
      console.log("reloadLife2");
      console.log(this.data["name"]);
      this.data["reloadLife"] = 0;
      this.changeTab(0);
    }

    this.checkDiseases(this.data);

  }
  
  checkDiseases(data) {

    if (data.diseases.length == 0) {
      data.diseasesLabel = "None";
    } else {
      let tmp = "";

      for (let i = 0; i < data.diseases.length; i++) {
        if (i != data.diseases.length - 1) {
          tmp += data.diseases[i] + ", ";
        } else {
          tmp += data.diseases[i];
        }
      }

      data.diseasesLabel = tmp;
    }
  }


  openPopover(myEvent) {
    this.popover.present({
      ev: myEvent
      //, animate: false
    });
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  changeTab(index) {
    var t: Tabs = this.navCtrl.parent;
    t.select(index);
    //
    //setTimeout(function () {
    //data.changeTabTrue = 0;
    //}, 100);
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
