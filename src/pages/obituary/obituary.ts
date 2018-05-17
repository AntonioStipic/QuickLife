import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController, Tabs } from 'ionic-angular';
import { PopoverContentPage } from '../popover/popover';
import { ShareService } from '../../services/share/share';

@Component({
  selector: 'page-obituary',
  templateUrl: 'obituary.html'
})
export class ObituaryPage {
  data: object;
  popover = this.popoverCtrl.create(PopoverContentPage);
  prisonText;
  childrenText;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, shareService: ShareService) {
    this.data = shareService.getData();
    this.data["shareService"] = shareService;

    if (this.data["numOfCrimes"] > 0) {
      let preposition = "";
      if (this.data["yearsServed"] == 1) preposition = "year";
      else preposition = "years"

      let preposition2 = "";
      if (this.data["numOfCrimes"] == 1) preposition2 = "crime";
      else preposition2 = "crimes";
      this.prisonText = `${this.data["name"]} served ${this.data["yearsServed"]} ${preposition} in prison for committing ${this.data["numOfCrimes"]} ${preposition2}.`;
    }

    let numOfChildren = this.data["children"].length;

    if (numOfChildren > 0) {
      let parent = "";
      if (this.data["gender"] == "M") {
        parent = "father";
      } else {
        parent = "mother";
      }

      let preposition = "";
      if (numOfChildren == 1) {
        preposition = "child";
      } else {
        preposition = "children";
      }

      this.childrenText = `${this.data["name"]} was a proud ${parent} of ${numOfChildren} ${preposition}.`;
    }
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
