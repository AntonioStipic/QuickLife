import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController, Tabs } from 'ionic-angular';
import { PopoverContentPage } from '../popover/popover';
import { ShareService } from '../../services/share/share';
import { AlertController, Content } from 'ionic-angular';
import { Http } from '@angular/http';
import { KeyValueDiffers } from '@angular/core';
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: object;
  names: object;
  jobs: object;
  cars: object;
  countries: object;
  popover = this.popoverCtrl.create(PopoverContentPage);
  private _differ: any;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, shareService: ShareService, public alertCtrl: AlertController, private http: Http, public KeyValueDiffers: KeyValueDiffers) {
    //this.data["years"] = [];
    this.data = shareService.getData();
    console.log(KeyValueDiffers);
    this._differ = KeyValueDiffers.find({}).create();
    this.data["shareService"] = shareService;
    //this.http.get('assets/resources/names.json').map(response => response.json()).subscribe(result => this.names = result);
    //this.http.get('assets/resources/names.json').subscribe(result => this.names =result.json());
    this.data["navCtrl"] = this.navCtrl.parent;
    this.http.get("assets/resources/names.json")
      .subscribe(res => {
        this.names = res.json();
        this.names = Array.of(this.names);
        this.names = this.names[0];
        //console.log(this.names);
        this.data = this.data["shareService"].createMe(this.data, this.names, this.randomId(8));
      }, error => {
        console.log(error);
      });

    this.http.get("assets/resources/cars.json")
      .subscribe(res => {
        this.cars = res.json();
        this.data["shareService"].setCars(this.data, this.cars);
        //console.log(res.json());
        //console.log(this.cars);
      }, error => {
        console.log(error);
      });

    this.http.get("assets/resources/jobs.json")
      .subscribe(res => {
        this.jobs = res.json();
        this.jobs = Array.of(this.jobs);
        this.jobs = this.jobs[0];
        this.data["jsonJobs"] = this.jobs;
        //console.log(this.jobs[0])
        //console.log(this.jobs);
        this.data["shareService"].updateJobs(this.data, this.jobs);
      }, error => {
        console.log(error);
      });

    this.http.get("assets/resources/countries.json")
      .subscribe(res => {
        this.countries = res.json();
        this.data["countries"] = this.countries;
        //console.log(this.jobs[0])
        //console.log(this.jobs);
      }, error => {
        console.log(error);
      });
  }
  ngDoCheck() {
    const change = this._differ.diff(this.data);
    if (change) {
      let content = this.content;
      setTimeout(function () {
        content.scrollToBottom()
      }, 50);
      /* change.forEachChangedItem(
        (record: KeyValueChangeRecord<any, any>) => {
          //console.log(record.key + ': ' + record.previousValue + '=>' + record.currentValue)
        });

      change.forEachRemovedItem(
        (record: KeyValueChangeRecord<any, any>) => {
          //console.log(record.key + ': ' + record.previousValue + '=>' + record.currentValue)
        });

      change.forEachAddedItem((record: KeyValueChangeRecord<any, any>) => {
        //console.log(record.key + ': ' + record.previousValue + '=>' + record.currentValue)
      }); */
    }
  }

  changeTab(index) {
    var t: Tabs = this.data["navCtrl"];
    t.select(index);
    //
    //setTimeout(function () {
    //data.changeTabTrue = 0;
    //}, 100);
  }

  randomId(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }


  /* ngOnInit() {
    this.scrollToBottom();
  } */

  /* ngAfterViewChecked() {
    this.content.scrollToBottom();
  } */

  /* ngAfterViewInit() {
    this.scrollToBottom();
  } */

  scrollToBottom(): void {
    /* try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      console.log(this.myScrollContainer.nativeElement.scrollHeight)
    } catch (err) { } */
    this.content.scrollToBottom();
  }



  /* scrollToBottom() {
    //@ViewChild("scrollMe" + i) scrollMe: any;
    //let content = this.content;
    //console.log('scrollMe' + i);
    //console.log(scrollMe);

  } */

  openPopover(myEvent) {

    this.popover.present({
      ev: myEvent
      //, animate: false
    });
  }

  /* changeTabFalse(data) {
    setTimeout(function () {
      data.changeTabTrue = 0;
    }, 500);
    //data.changeTabTrue = 0;
  } */

  willIDie(data) {
    let chance = 0.4;

    if (data.age > 50) chance = 4;
    else if (data.age > 60) chance = 14;
    else if (data.age > 70) chance = 18;
    else if (data.age > 80) chance = 20;
    else if (data.age > 100) chance = 30;
    else if (data.age > 105) chance = 45;
    else if (data.age > 110) chance = 60;
    else if (data.age > 115) chance = 85;
    else if (data.age > 122) chance = 101;

    let rollDice = data.shareService.randomAtoB(1, 10000) / 100;

    //console.log(chance, rollDice);

    if (rollDice <= chance) {
      data.alive = 0;
    }
  }

  offerDrugs(data) {
    let chance = 0;

    if (data.age >= 18) {
      chance = 6;
    }

    if (data.shareService.randomAtoB(1, 100) <= chance) {
      let places = ["on the street", "on the sidewalk", "in downtown", "by the bus station", "by the tram station", "in the park"];
      let place = places[data.shareService.randomAtoB(0, places.length - 1)];

      let gender = data.shareService.randomAtoB(0, 1);
      if (gender == 1) gender = "He";
      else gender = "She";

      let drugs = ["weed", "ecstasy", "meth", "cocaine", "heroin", "crack", "MDMA", "LSD"];
      let drug = drugs[data.shareService.randomAtoB(0, drugs.length - 1)];
      let text = `A stranger approaches you ${place}. ${gender} offers you ${drug}.`;

      let alert = this.alertCtrl.create({
        title: 'Drugs',
        subTitle: text,
        buttons: [{
          text: 'Take',
          handler: () => {
            data.update += 1;
            data.years[data.age].events.push(`I took ${drug}.`);
          }
        }, {
          text: 'Leave',
          handler: () => {
            //console.log("You left it")
          }
        }]
      });
      alert.present();
    }
  }

  willParentsDie(data) {
    let fatherChance = 1;
    let motherChance = 1;

    if (data.father.alive == 1) {
      if (data.father.age > 50) fatherChance = 3;
      else if (data.father.age > 60) fatherChance = 10;
      else if (data.father.age > 70) fatherChance = 15;
      else if (data.father.age > 80) fatherChance = 20;
      else if (data.father.age > 95) fatherChance = 30;

      let fatherRollDice = data.shareService.randomAtoB(1, 100);

      if (fatherRollDice < fatherChance) {
        data.father.alive = 0;
        data.years[data.age].events.push("My father died at the age of " + data.father.age + ".");
      }
    }

    if (data.mother.alive == 1) {
      if (data.mother.age > 50) motherChance = 3;
      else if (data.mother.age > 60) motherChance = 10;
      else if (data.mother.age > 70) motherChance = 15;
      else if (data.mother.age > 80) motherChance = 20;
      else if (data.mother.age > 95) motherChance = 30;

      let motherRollDice = data.shareService.randomAtoB(1, 100);

      if (motherRollDice < motherChance) {
        data.mother.alive = 0;
        data.years[data.age].events.push("My mother died at the age of " + data.mother.age + ".");
      }
    }
  }

  regulateHappiness(data) {
    let result = -1 * (data.shareService.randomAtoB(1, 100) / 75);
    if (data.income - data.outcome <= 0 && data.age > 20) result -= 0.5;
    if (data.inDebt == 1) result -= 1;
    if (data.instruments.length > 0) result += 0.4;
    if (data.sports.length > 0) result += 0.4;
    if (data.isLearning == 1) result += 0.4;
    if (data.isReadingBooks == 1) result += 0.2;
    if (data.goingToGym == 1) result += 0.3;
    if (data.havePartner == 1) result += 0.25;
    data.shareService.handleHappiness(data, "", result);
  }

  childPlay(data) {
    let surfaces = ["on concrete", "on rock", "going down the stairs", "off my bicycle", "from a tree"]

    let surfaceChosen = surfaces[data.shareService.randomAtoB(0, surfaces.length - 1)];
    let breakLegChance = data.shareService.randomAtoB(1, 100);
    if (breakLegChance < 4) {
      data.years[data.age].events.push(`I went out to play with my friends. I fell ${surfaceChosen} and broke my leg.`);
      data.brokeLegLastYear = 1;
    }


    surfaceChosen = surfaces[data.shareService.randomAtoB(0, surfaces.length - 1)];
    let breakArmChance = data.shareService.randomAtoB(1, 100);
    if (breakArmChance < 4) {
      data.years[data.age].events.push(`I went out to play with my friends. I fell ${surfaceChosen} and broke my arm.`);
      data.brokeArmLastYear = 1;
    }
  }

  willPartnerBreakUp(data) {
    let chances = data.shareService.randomAtoB(1, 100);

    if (chances < 2) {
      data.shareService.breakUp2(data);
    }
  }

  age(data) {
    data.age += 1;
    data.years.push({ "year": data.age, "events": [] });
    data.gotJobNum = -1;
    data.selfiesPerYear = 0;
    data.numOfAlbums = 0;

    if (data.changeThisLifeIdNextYear == 1) {
      data.shareService.changeThisLifeId(data);
    }

    data.finance += data.allowance * 12;

    if (data.finance < 0) {
      data.inDebt = 1;
      let alert = this.alertCtrl.create({
        title: 'You are in debt!',
        subTitle: 'Find a job with a better salary or start saving.',
        buttons: [{
          text: 'Ok',
          handler: () => {
            data.shareService.inDebt(data);
          }
        }]
      });
      alert.present();
    } else {
      data.inDebt = 0;
    }

    for (let i = 0; i < data.children.length; i++) {
      if (data.children[i].alive == 1) {
        data.children[i].age += 1;
      }
    }

    if (data.startSmokingAgain == 1) {
      data.smoking = 1;
      data.startSmokingAgain = 0;
      data.years[data.age].events.push("I tried to quit smoking but I didn't make it. I started smoking again.");
    }

    if (data.smoking == 1) {
      data.smokingFor += 1;
    }

    this.willParentsDie(data);
    this.regulateHappiness(data);
    this.offerDrugs(data);

    if (data.havePartner == 1) {
      data.shareService.handleStability(data, "+", data.shareService.randomAtoB(0, 4));
      if (data.lover.isPregnant == 1) {
        data.lover.isPregnant = 0;

        data.shareService.gaveBirth(data, 1);
      }
      this.willPartnerBreakUp(data);
    }

    if (data.brokeLegLastYear == 1) {
      data.years[data.age].events.push("My leg healed.");
      data.brokeLegLastYear = 0;
    }

    if (data.brokeArmLastYear == 1) {
      data.years[data.age].events.push("My arm healed.");
      data.brokeArmLastYear = 0;
    }

    if (data.age > 4 && data.age < 13) {
      this.childPlay(data);
    }

    // Reduce finance by property maintenance cost for a whole year for each property
    for (let i = 0; i < data.posjedi.length; i++) {
      data.finance -= parseFloat(data.posjedi[i].maintenance) * 12;
    }

    this.willIDie(data);
    if (data.alive) {
      this.data["shareService"].updateJobs(this.data, this.jobs);

      if (data.retirementAge == data.age && data.isWorking == 1) {
        let upOrDown = data.shareService.randomAtoB(0, 1);
        if (upOrDown == 0) upOrDown = -1;
        else upOrDown = 1;


        let pension = (data.myJob[2] / 12 * 1000 * 0.7) + upOrDown * (data.myJob[2] / 12 * 1000 * 0.1);

        let alert = this.alertCtrl.create({
          enableBackdropDismiss: true,
          title: 'Hard work pays off!',
          message: `You're old enough to retire. You will receive $${data.shareService.formatMoney(pension)} per month.<br>Do you want to retire?`,
          buttons: [
            {
              text: 'Yes',
              handler: () => {
                //console.log("I started High School");
                //data.shareService.takeDrivingTest(data);
                //console.log(pension);
                //console.log("Retired");
                data.shareService.retire(data, pension);
              }
            },
            {
              text: 'No',
              role: 'cancel'
            }
          ]
        });
        alert.present();
      }

      if (data.repaymentTerm > 0) {
        data.finance -= parseFloat(data.monthlyPayment) * 12;
        data.repaymentTerm -= 1;
        if (data.repaymentTerm == 0) {
          data.outcome -= parseFloat(data.monthlyPayment);
          data.years[data.age].events.push("I've paid off my mortgage.");
        }
      }

      if (data.isPregnant == 1) {
        data.isPregnant = 0;
        data.shareService.gaveBirth(data, 0);
      }

      if (data.father.alive == 1) {
        data.father.age += 1;
      }

      if (data.mother.alive == 1) {
        data.mother.age += 1;
      }

      if (data.havePartner == 1) {
        data.lover.time += 1;
      }

      if (data.isWorking == 1) {
        data.finance += (data.myJob[2] * 1000) * (1 - data.tax);
        data.workExperience += 1;
        data.jobService += 1;
      }

      if (data.inRetirement == 1) {
        data.finance += parseFloat(data.pension) * 12;
      }

      if (data.goingToHighSchool == 1) {
        data.goingToHighSchoolYears += 1;
      }

      if (data.goingToCollege == 1) {
        data.goingToCollegeYears += 1;
      }

      if (data.goingToCollegeYears == 3) {
        data.educationLevel = 2;
        data.goingToCollege = 0;
        data.goingToCollegeYears = 0;
        data.myMajors[data.currentCollegeMajor] = 1;
        data.mySkills.push(data.currentCollegeMajor);
        data.years[data.age].events.push("I graduated from college in " + data.currentCollegeMajor + ".");
        data.currentCollegeMajor = "";
      }

      if (data.goingToHighSchoolYears == 4) {

        // If this is true wait for player to select which college and then ask for driving.
        data.dontAskForDrivingTestOn18 = 1;

        var percentH = ((data.learnedHighSchool / 1.2) + (data.intelligence / 12)) / 12;
        //console.log(data.learnedHighSchool);
        if (percentH < 0.1) {
          data.highSchoolGrade = "F";
          data.passed.highschool = 0;
        } else if (percentH < 0.3) {
          data.highSchoolGrade = "D";
          data.passed.highschool = 1;
        } else if (percentH < 0.5) {
          data.highSchoolGrade = "C";
          data.passed.highschool = 1;
        } else if (percentH < 0.7) {
          data.highSchoolGrade = "B";
          data.passed.highschool = 1;
        } else if (percentH < 0.9) {
          data.highSchoolGrade = "A";
          data.passed.highschool = 1;
        } else if (percentH >= 0.9) {
          data.highSchoolGrade = "A+";
          data.passed.highschool = 1;
        }
        //console.log("High School", percentH);

        if (data.passed.highschool == 1) {
          data.educationLevel = 1;
          data.goingToHighSchool = 0;
          data.goingToHighSchoolYears = 0;
          data.years[data.age].events.push("I graduated from high school at grade " + data.highSchoolGrade + ".");
          this.checkGoToCollege(data);
          //this.checkGoToHighSchool(data);
        } else {
          data.goingToHighSchool = 0;
          data.goingToHighSchoolYears = 0;
          data.years[data.age].events.push("I failed from high school. I was kicked out of it.");
        }
      }

      if (data.isLearning == 1) {
        if (data.age < 14) data.learnedElementary += 1;
        else if (data.age < 18) data.learnedHighSchool += 1;

        if (data.intelligence <= 99.7) data.intelligence += 0.3;
      }

      if (data.instruments.length > 0) {
        var toAddInstruments = data.instruments.length * 0.4;
        if (data.musicality <= (100 - toAddInstruments)) {
          data.musicality += toAddInstruments;
        } else {
          data.musicality = 100;
        }
      }

      if (data.sports.length > 0) {
        var toAddSports = data.sports.length * 0.3;
        if (data.fitness <= (100 - toAddSports)) {
          data.fitness += toAddSports;
        } else {
          data.fitness = 100;
        }
      }

      if (data.isReadingBooks == 1) {
        if (data.intelligence <= 99.8) data.intelligence += 0.2;
      }

      if (data.goingToGym == 1) {
        data.finance -= 50 * 12;
        if (data.fitness <= 99.3) data.fitness += 0.7;
      }

      if (data.instruments.length > 0) {
        data.finance -= data.instruments.length * 100 * 12;
      }

      if (data.sports.length > 0) {
        data.finance -= data.sports.length * 60 * 12;
      }

      if (data.age == 3) {
        data.years[data.age].events.push("I started going to kindergarten.");
      } else if (data.age == 6) {
        data.kindergarten = 1;
        data.goingToElementary = 1;
        data.years[data.age].events.push("I started going to school.");
      } else if (data.age == 12) {
        this.checkSexuality(data);
      } else if (data.age == 14) {

        if (data.goingToElementary == 1) {
          var percent = ((data.learnedElementary / 2) + (data.intelligence / 10)) / 12;
          //console.log(data.learnedElementary);
          if (percent < 0.1) {
            data.elementaryGrade = "F";
            data.passed.elementary = 0;
          } else if (percent < 0.3) {
            data.elementaryGrade = "D";
            data.passed.elementary = 1;
          } else if (percent < 0.5) {
            data.elementaryGrade = "C";
            data.passed.elementary = 1;
          } else if (percent < 0.7) {
            data.elementaryGrade = "B";
            data.passed.elementary = 1;
          } else if (percent < 1) {
            data.elementaryGrade = "A";
            data.passed.elementary = 1;
          } else if (percent >= 1) {
            data.elementaryGrade = "A+";
            data.passed.elementary = 1;
          }
          //console.log("Elementary", percent);
          if (data.passed.elementary == 1) {
            data.educationLevel += 1;
            data.goingToElementary = 0;
            data.years[data.age].events.push("I graduated from elementary school at grade " + data.elementaryGrade + ".");
            this.checkGoToHighSchool(data);
          } else {
            data.goingToElementary = 0;
            data.goingToElementaryYears = 0;
            data.years[data.age].events.push("I failed from elementary school. I was kicked out of it.");
          }
        }

      } else if (data.age == 10) {
        data.allowance = parseFloat((data.shareService.randomAtoB(7000, 14000) / 100).toFixed(2));
        data.income += data.allowance;
        data.years[data.age].events.push(`My parents started giving me allowance. I'm getting $${data.allowance} per month.`);
      } else if (data.age == 18) {
        data.years[data.age].events.push(`My parents stopped giving me allowance.`);
        data.income -= data.allowance;
        data.allowance = 0;
        if (data.dontAskForDrivingTestOn18 == 0) this.checkDrivingTest(data);
      }

    } else {
      let causes = ["a heart attack", "a lung cancer", "a tuberculosis", "a stroke", "a chronic obstructive pulmonary disease"];
      let cause = causes[data.shareService.randomAtoB(0, causes.length - 1)];
      data.shareService.disableAll(data);
      data.years[data.age].events.push(`I died from ${cause}.`);
    }

  }

  checkDrivingTest(data) {
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Back on track',
      message: `You're old enough to take a driving test.<br>Will you take it?`,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            //console.log("I started High School");
            data.shareService.takeDrivingTest(data);
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  checkGoToHighSchool(data) {
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Next step',
      message: 'You have got enough qualifications to go to high school. Will you go?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            //console.log("I started High School");
            data.shareService.goToHighSchool(data);
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  checkGoToCollege(data) {
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Next step',
      message: 'You have got enough qualifications to go to college. Will you go?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            //console.log("I started High School");
            data.shareService.enrollCollege(data);
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            if (data.dontAskForDrivingTestOn18 == 1) {
              this.checkDrivingTest(data);
              data.dontAskForDrivingTestOn18 = 0;
            }
          }
        }
      ]
    });
    alert.present();
  }

  checkSexuality(data) {
    let confirm = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'What is your sexuality?',
      /* message: 'What is your sexuality?', */
      buttons: [
        {
          text: 'Heterosexual',
          handler: () => {
            data.sexuality = "Heterosexual";
            data.oldSexuality = "Heterosexual";
            data.shareService.sexualityConfirm(data);
          }
        },
        {
          text: 'Bisexual',
          handler: () => {
            data.sexuality = "Bisexual";
            data.oldSexuality = "Bisexual";
            data.shareService.sexualityConfirm(data);
          }
        },
        {
          text: 'Homosexual',
          handler: () => {
            data.sexuality = "Homosexual";
            data.oldSexuality = "Homosexual";
            data.shareService.sexualityConfirm(data);
          }
        },
        {
          text: 'Asexual',
          handler: () => {
            data.sexuality = "Asexual";
            data.oldSexuality = "Asexual";
            data.shareService.sexualityConfirm(data);
          }
        }
      ]
    });
    confirm.present();
  }

}
