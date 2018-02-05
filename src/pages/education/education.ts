import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShareService } from '../../services/share/share';

@Component({
  selector: 'page-education',
  templateUrl: 'education.html'
})
export class EducationPage {
  data: object;
  constructor(public navCtrl: NavController, shareService: ShareService) {
    this.data = shareService.getData();
  }

}
