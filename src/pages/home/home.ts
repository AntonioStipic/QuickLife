import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverContentPage } from '../popover/popover';
import { ShareService } from '../../services/share/share';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: object;
  names: object;
  jobs: object;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, shareService: ShareService, public alertCtrl: AlertController, private http: Http) {
    this.data = shareService.getData();
    this.data["shareService"] = shareService;

    //this.http.get('assets/resources/names.json').map(response => response.json()).subscribe(result => this.names = result);
    //this.http.get('assets/resources/names.json').subscribe(result => this.names =result.json());

    this.http.get("assets/resources/names.json")
      .subscribe(res => {
        this.names = res.json();
        this.names = Array.of(this.names);
        this.names = this.names[0];
        //console.log(this.names);
        this.data = this.data["shareService"].createMe(this.data, this.names);
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
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverContentPage);
    popover.present({
      ev: myEvent,
    });
  }



  age(data) {
    data.age += 1;
    data.years.push({ "year": data.age, "events": [] });
    data.gotJobNum = -1;

    this.data["shareService"].updateJobs(this.data, this.jobs);

    if (data.isWorking == 1) {
      data.finance += (data.myJob[2] * 1000) * (1 - data.tax);
      data.workExperience += 1;
      data.jobService += 1;
    }

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
        data.years[data.age].events.push("I failed from high school. I was kicked out of it.");
      }
    }

    if (data.isLearning == 1) {
      if (data.age < 14) data.learnedElementary += 1;
      else if (data.age < 18) data.learnedHighSchool += 1;

      if (data.intelligence <= 99.7) data.intelligence += 0.3;
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
          data.years[data.age].events.push("I failed from elementary school. I was kicked out of it.");
        }
      }

      //you have got enough qualifications to go to high school. Will you go?

    } /* else if (data.age == 18) {
      
    } */

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
          role: 'cancel'
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
