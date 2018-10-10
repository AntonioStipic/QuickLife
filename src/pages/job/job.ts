import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController, ViewController } from 'ionic-angular';
import { PopoverContentPage } from '../popover/popover';
import { ShareService } from '../../services/share/share';

@Component({
  selector: 'page-job',
  templateUrl: 'job.html'
})
export class JobPage {
  data: object;
  jobTabs: string;
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, shareService: ShareService, public viewCtrl: ViewController) {
    this.data = shareService.getData();
    this.data["shareService"] = shareService;

    this.jobTabs = "Current";
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverContentPage);
    popover.present({
      ev: myEvent
    });
  }

  backButtonAction() {
    this.viewCtrl.dismiss();
  }

}
