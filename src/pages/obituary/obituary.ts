import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController, Tabs, ModalController } from 'ionic-angular';
import { PopoverContentPage } from '../popover/popover';
import { ShareService } from '../../services/share/share';
import { Events } from 'ionic-angular';
import { customLifeModal } from '../popover/popover';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';

@Component({
  selector: 'page-obituary',
  templateUrl: 'obituary.html'
})
export class ObituaryPage {
  data: object;
  popover = this.popoverCtrl.create(PopoverContentPage);
  prisonText = "";
  childrenText = "";
  speech = "";
  gender = "";
  preposition = "";
  preposition2 = "";
  preposition3 = "";
  lifeId;
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, shareService: ShareService, public events: Events, public modalCtrl: ModalController, private firebaseAnalytics: FirebaseAnalytics) {
    this.data = shareService.getData();
    this.data["shareService"] = shareService;

    this.lifeId = this.data["lifeId"];

    this.refresh();
  }
  ionViewDidEnter() {
    if (this.lifeId != this.data["lifeId"]) {
      this.refresh();
      this.lifeId = this.data["lifeId"];
    }
  }
  refresh() {
    this.speech = "";
    if (this.data["numOfCrimes"] > 0) {
      let preposition = "";
      if (this.data["yearsServed"] == 1) preposition = "year";
      else preposition = "years"

      let preposition2 = "";
      if (this.data["numOfCrimes"] == 1) preposition2 = "crime";
      else preposition2 = "crimes";
      this.prisonText = `${this.data["name"]} served ${this.data["yearsServed"]} ${preposition} in prison for committing ${this.data["numOfCrimes"]} ${preposition2}.`;
    }

    if (this.data["gender"] == "M") {
      this.preposition = "He";
      this.preposition2 = "his";
      this.preposition3 = "him";
      this.gender = "man";
    } else {
      this.preposition = "She";
      this.preposition2 = "her";
      this.preposition3 = "her";
      this.gender = "woman";
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

    let eulogies = [`${this.preposition} never made rash decisions, but thought long and hard before giving us advice—sound advice that has helped to shape my life profoundly.`,
                    `${this.preposition} was always walking around saying that “life is too short to be hunched over a desk all your life, you must go out into the world and experience its beauty and learn its mysteries”.`,
                    `${this.data["name"]} was strong, independent, and self-driven. ${this.preposition} experienced so much disappointment and heartbreak in ${this.preposition2} short time with us, yet still had the biggest smile on ${this.preposition2} face and the greatest spirit to greet you.`,
                    `${this.data["name"]}, wherever you are, thank you for being the brightest light during our darkest days. We love you, forever and always.”`,
                    `${this.data["name"]} was easy to talk to, a good listener and a wonderful communicator.`,
                    `${this.data["name"]} was a very patient and kindhearted ${this.gender}. ${this.preposition} cared greatly for every soul on earth – ${this.preposition2} friends, family and pets. It was so important to ${this.preposition3} that everyone around ${this.preposition3} was happy and loved.`,
                    `${this.data["name"]}’s ability to make everyone feel comfortable, secure and loved were ${this.preposition2} greatest strengths.`,
                    `${this.preposition} was kind, smart, loving, and compassionate; pretty much all the good words I can think of apply to ${this.preposition3}.`,
                    `My ${this.data["name"]} was strong until the end, never losing ${this.preposition2} faith even on some of the most painful days.`
                  ];
    // console.log(this.data["jobHistory"]);
    
    if (this.checkJob("Nurse", this.data)) {
      eulogies.push(`${this.data["name"]} was a good hearted person who truly loved helping others. That is why ${this.preposition.toLowerCase()} put in decades as a nurse taking care of people who couldn’t take care of themselves.`);
    }

    let numOfEulogies = this.data["shareService"].randomAtoB(1, 3);
    //let numOfEulogies = 4;

    let space = "";
    for (let i = 0; i < numOfEulogies; i++) {
      let index = this.data["shareService"].randomAtoB(0, eulogies.length - 1);
      if (i != 0) {
        space = "<br><br>"
      }
      this.speech += (space + eulogies[index]);
      eulogies.splice(index, 1);
    }
  }

  checkJob(job, data) {
    let result = false;
    if (data.myJob[1]["title"] == job) result = true;
    else {
      for (let i = 0; i < data.jobHistory.length; i++) {
        if (data.jobHistory[i]["title"] == job) result = true;
      }
    }

    return result;
  }

  changeTab(index) {
    var t: Tabs = this.navCtrl.parent;
    t.select(index);
    //
    //setTimeout(function () {
    //data.changeTabTrue = 0;
    //}, 100);
  }

  newLife() {
    //this.events.publish("goToHomeNewLife");
    this.data = this.data["shareService"].createMe(this.data, "", "", "obituary", "force");
    this.changeTab(0);

    this.firebaseAnalytics.logEvent("newLife", {});
  }

  customLife(data) {
    let customLife = this.modalCtrl.create(customLifeModal, { data: data }, {
      showBackdrop: false,
      enableBackdropDismiss: true,
      enterAnimation: 'modal-scale-up-enter',
      leaveAnimation: 'modal-scale-up-leave'
    });
    customLife.present();

    //this.navCtrl.push(TabsPage, {}, { animate: false });
  }


  openPopover(myEvent) {
    this.popover.present({
      ev: myEvent
      //, animate: false
    });
  }

}
