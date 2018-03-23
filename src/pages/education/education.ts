import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverContentPage } from '../popover/popover';
import { ShareService } from '../../services/share/share';

@Component({
  selector: 'page-education',
  templateUrl: 'education.html'
})
export class EducationPage {
  data: object;
  popover = this.popoverCtrl.create(PopoverContentPage);
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, shareService: ShareService) {
    this.data = shareService.getData();
  }

  openPopover(myEvent) {
    this.popover.present({
      ev: myEvent
      //, animate: false
    });
  }

}
