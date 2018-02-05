import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { ShareService } from '../../services/share/share';
@Component({
  templateUrl: 'popover.html'
})

export class PopoverContentPage {
  data: object;
  
  constructor(public viewCtrl: ViewController, shareService: ShareService) {
    this.data = shareService.getData();
    this.data["shareService"] = shareService;
  }
  close() {
    this.viewCtrl.dismiss();
  }
}