import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShareService } from '../../services/share/share';

@Component({
  selector: 'page-job',
  templateUrl: 'job.html'
})
export class JobPage {
  data: object;
  jobTabs: string;
  constructor(public navCtrl: NavController, shareService: ShareService) {
    this.data = shareService.getData();
    this.data["shareService"] = shareService;

    this.jobTabs = "Current";
  }

}
