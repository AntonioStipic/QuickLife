import { NavController, PopoverController, Tabs, AlertController, Content, App } from 'ionic-angular';
import { Component, ViewChild, KeyValueDiffers } from '@angular/core';
import { PopoverContentPage } from '../popover/popover';
import { ShareService } from '../../services/share/share';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { Platform } from 'ionic-angular';

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
  allPets: object;
  popover = this.popoverCtrl.create(PopoverContentPage);
  private _differ: any;
  causes = ["a heart attack", "a lung cancer", "a tuberculosis", "a stroke", "a chronic obstructive pulmonary disease", "a lower respiratory infection", "a tetanus", "a colon cancer", "a leukemia", "a meningitis", "a liver cancer", "a pertussis", "a bladder cancer"];
  babyCauses = ["a sudden infant death syndrome", "a malnutrition", "a blood infection", "a pneumonia"];
  firstWords = ["Dad", "Dada", "Daddy", "Papa", "Mom", "Mama", "Mommy", "Mum", "Hi", "Hiya", "Hey", "Buba", "Bub", "Baba", "Dog", "Doggy", "Puppy", "Ball", "No", "Cat", "Kitty", "Nana", "Bye", "Duck", "Ta", "Tata", "Baby", "Uh oh", "Car", "Apple", "Banana", "Bee", "Dance"];

  @ViewChild(Content) content: Content;

  constructor(platform: Platform, public navCtrl: NavController, public popoverCtrl: PopoverController, shareService: ShareService, public alertCtrl: AlertController, private http: Http, public KeyValueDiffers: KeyValueDiffers, public events: Events, public app: App) {
    //this.data["years"] = [];
    //, private googlePlayGamesServices: GooglePlayGamesServices
    /* try {
      this.googlePlayGamesServices.auth()
      console.log('Logged in to Play Games Services')

      this.googlePlayGamesServices.showPlayer().then((data: Player) => {
        console.log('Player data', data);
     });
    } catch(error) {
      console.log('Error logging in Play Games Services', error);
    } */

    /* try {
      this.googlePlayGamesServices.auth();
      console.log("Hehe")

      console.log(this.googlePlayGamesServices.showPlayer());
      alert(this.googlePlayGamesServices.showPlayer()['displayName'])
    } catch(err) {
      console.log("Bad bad", err)
    } */

    this.data = shareService.getData();

    /* if (platform.is('core') || platform.is('mobileweb')) {
      
    } else {
      this.data["shareService"].googlePlayLogin();
    } */



    console.log(KeyValueDiffers);
    this._differ = KeyValueDiffers.find({}).create();
    this.data["shareService"] = shareService;
    //this.http.get('assets/resources/names.json').map(response => response.json()).subscribe(result => this.names = result);
    //this.http.get('assets/resources/names.json').subscribe(result => this.names =result.json());
    this.data["navCtrl"] = this.navCtrl.parent;

    this.http.get("assets/resources/countries.json")
      .subscribe(res => {
        this.countries = res.json();
        this.data["countries"] = this.countries;
        //console.log(this.jobs[0])
        //console.log(this.jobs);

        this.http.get("assets/resources/names.json")
          .subscribe(res => {
            this.names = res.json();
            this.names = Array.of(this.names);
            this.names = this.names[0];
            //console.log(this.names);
            this.data = this.data["shareService"].createMe(this.data, this.names, this.randomId(8));

            // this.data["shareService"].checkSaveGame(this.data);
          }, error => {
            console.log(error);
          });

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

    this.http.get("assets/resources/pets.json")
      .subscribe(res => {
        this.allPets = res.json();
        this.data["allPets"] = this.allPets;
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
    else if (data.age > 60) chance = 10;
    else if (data.age > 70) chance = 13;
    else if (data.age > 80) chance = 20;
    else if (data.age > 100) chance = 30;
    else if (data.age > 105) chance = 45;
    else if (data.age > 110) chance = 60;
    else if (data.age > 115) chance = 85;
    else if (data.age > 122) data.alive = 0;

    if (data.homeless == 1) {
      // chance += data.homelessFor;

      let homelessChanceMessage = 30;

      if (data.shareService.randomAtoB(1, 100) < homelessChanceMessage) {
        data.years[data.age].events.push(`I'm homeless. I should find a job and home to live so I live longer.`);
      }
    }

    let rollDice = data.shareService.randomAtoB(1, 10000) / 100;

    //console.log(chance, rollDice);

    if (rollDice <= chance) {
      data.alive = 0;
    }
  }

  offerDrugs(data) {
    let chance = 0;

    if (data.age >= 18) {
      chance = 8; // 7
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
        enableBackdropDismiss: false,
        title: 'Drugs',
        message: text,
        buttons: [{
          text: 'Take',
          handler: () => {
            data.update += 1;

            let police = 20; // 10

            if (data.shareService.randomAtoB(0, 100) <= police) {
              let penalty = data.shareService.randomAtoB(1, 5);
              let preposition = "";

              if (penalty == 1) preposition = "year";
              else preposition = "years";

              let textToAdd = "";

              if (data.goingToCollege == 1) {
                //I have been expelled from University
                data.goingToCollege = 0;
                data.goingToCollegeYears = 0;
                data.listOfColleges.splice(-1, 1);
                textToAdd = `<br>I have been expelled from college.`;
                data.currentCollegeMajor = "";
              }

              if (data.isWorking == 1) {
                data.income -= (data.myJob[2] / 12 * 1000) * (1 - data.tax);
                data.jobHistory.push({ title: data.myJob[1]["title"], years: data.jobService, firm: data.myJob[0] });
                data.jobService = 0;
                //data.years[data.age].events.push("I quit my job as " + data.myJob[1]["title"] + ".");
                data.myJob = ["", { "title": "", "salary": "", "experience": 0, "education": 0, "skills": [] }, ""];
                data.isWorking = 0;
                textToAdd += `<br>I was fired from my job.`;
              }

              data.years[data.age].events.push(`Person offering you drugs was undercover police officer. ${gender} imprisoned you for ${penalty} ${preposition}.${textToAdd}`);
              data.inPrison = 1;
              data.numOfCrimes += 1;
              data.prisonYears += penalty;
            } else {
              let crazyDrugs = 40; // 10

              if (data.shareService.randomAtoB(0, 100) <= crazyDrugs) {
                let stories = ["You thought your bed was trying to eat you. You ended up taking the sheets off and laying on the floor curled in a ball. You woke up with the worst back pain you've ever had.",
                  "You bumped into a wall and spent the next 30 minutes apologising to it in case it decided to fall on top of you in retaliation.",
                  "You went to a grocery store across town in a bathrobe to buy groceries.",
                  "You donated your shoes to some ducks because you thought they needed them. You threw them into a river and walked home barefoot.",
                  "You went to a club and had sex with a transsexual girl in the back alley.",
                  "You had a threesome with your close friends.",
                  "You threw yourself on grass and looked at the stars for 3 hours straight.",
                  "You masturbated in a public park.",
                  "You masturbated on public transport."
                ]

                let story = stories[data.shareService.randomAtoB(0, stories.length - 1)];
                //console.log(story)

                let titles = [`"I don't do drugs. I am drugs"`, `"I'm not drunk, just a little stoned"`, `"Drugs are a bet with your mind"`, `"I used to have a drug problem, now I make enough money"`, `"Wasted? So is your life"`];

                let title = titles[data.shareService.randomAtoB(0, titles.length - 1)];

                let alert = this.alertCtrl.create({
                  subTitle: title,
                  message: story,
                  buttons: [{
                    text: 'Ok',
                    handler: () => {
                      //console.log("Clicked OK")
                    }
                  }]
                });
                alert.present();
              }
              data.years[data.age].events.push(`I took ${drug}.`);
              data.shareService.checkAchievement("Druggie");
            }
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
      else if (data.father.age > 95) fatherChance = 40;
      else if (data.father.age > 97) fatherChance = 60;
      else if (data.father.age > 100) fatherChance = 80;

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
      else if (data.mother.age > 95) motherChance = 40;
      else if (data.mother.age > 97) motherChance = 60;
      else if (data.mother.age > 100) motherChance = 80;

      let motherRollDice = data.shareService.randomAtoB(1, 100);

      if (motherRollDice < motherChance) {
        data.mother.alive = 0;
        data.years[data.age].events.push("My mother died at the age of " + data.mother.age + ".");
      }
    }
  }

  willChildDie(data, age) {
    let chance = 0.4;

    if (age > 40) chance = 3;
    else if (age > 50) chance = 7;
    else if (age > 60) chance = 10;
    else if (age > 70) chance = 15;
    else if (age > 80) chance = 20;
    else if (age > 95) chance = 40;
    else if (age > 97) chance = 60;
    else if (age > 100) chance = 80;

    let rollDice = data.shareService.randomAtoB(1, 10000) / 100;

    if (rollDice <= chance) {
      let cause = this.causes[data.shareService.randomAtoB(0, this.causes.length - 1)];

      return cause;
    } else {
      return false;
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
    data.paintingsThisYear = 0;
    data.numOfAlbums = 0;

    if (data.homeless == 1) {
      data.homelessFor += 1;
    }

    if (data.age == 122) {
      data.alive = 0;
    }

    /* if (data.age == 1) {
      console.log(data.shareService.verifyLifeId(data));
    } */

    if (data.changeThisLifeIdNextYear == 1) {
      data.shareService.changeThisLifeId(data);
    }

    if (data.age == 100) {
      data.shareService.checkAchievement("Centenarian");
    }

    if (data.happiness == 100 && data.appearance == 100 && data.intelligence == 100 && data.fitness == 100 && data.sociability == 100 && data.musicality == 100) {
      data.shareService.checkAchievement("Superhuman")
    }

    if (data.outcome < 0) data.outcome = 0;

    data.finance += data.allowance * 12;

    if (data.finance < 0 && data.age > 17) {
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
      let child = data.children[i];
      if (child.alive == 1) {
        child.age += 1;

        let willDie = this.willChildDie(data, child.age);
        if (willDie) {
          child.alive = 0;
          data.years[data.age].events.push(`My child ${child.name} died from ${willDie} at the age of ${child.age}.`);
          data.shareService.handleHappiness(data, "-", 70);
        } else {
          if (child.goingToCollege == 1) {
            child.goingToCollegeYears += 1;

            if (child.goingToCollegeYears == 3) {
              child.goingToCollege = 0;

              child.colleges.push(child.studying);
              data.years[data.age].events.push(`${child.name} graduated from college in ${child.studying}.`);
              child.studying = "";
            }
          }

          if (child.age == 6) {
            child.goingToElementary = 1;
            data.years[data.age].events.push(`My child ${child.name} started going to school.`);

            let chanceToLearn = data.shareService.randomAtoB(0, 2);
            if (child.intelligence > 60) {
              if (chanceToLearn > 0) {
                child.learnedElementary = data.shareService.randomAtoB(4, 8);
              } else {
                child.learnedElementary = data.shareService.randomAtoB(1, 5);
              }
            } else {
              child.learnedElementary = data.shareService.randomAtoB(1, 3);
            }
          } else if (child.age == 14) {
            if (child.goingToElementary == 1) {
              let grade = data.shareService.decideGrade(data, child, "elementary");
              if (grade != "F") {
                data.years[data.age].events.push(`${child.name} graduated from elementary school at grade ${grade}.`);
                child.passedElementarySchool = 1;
              } else {
                data.years[data.age].events.push(`${child.name} failed elementary school.`);
                child.passedElementarySchool = 0;
              }

              child.goingToElementary = 0;

              if (child.passedElementarySchool == 1) {
                child.goingToHighSchool = 1;
                data.years[data.age].events.push(`${child.name} started high school.`);

                let chanceToLearn = data.shareService.randomAtoB(0, 2);
                if (child.intelligence > 60) {
                  if (chanceToLearn > 0) {
                    child.learnedHighSchool = data.shareService.randomAtoB(4, 8);
                  } else {
                    child.learnedHighSchool = data.shareService.randomAtoB(1, 5);
                  }
                } else {
                  child.learnedHighSchool = data.shareService.randomAtoB(1, 3);
                }
              }

            }
          } else if (child.age == 18) {
            if (child.goingToHighSchool == 1) {
              let grade = data.shareService.decideGrade(data, child, "high");
              child.goingToHighSchool = 0;

              if (grade != "F") {
                data.years[data.age].events.push(`${child.name} graduated from high school at grade ${grade}.`);
                child.passedHighSchool = 1;
              } else {
                data.years[data.age].events.push(`${child.name} failed high school.`);
                child.passedHighSchool = 0;
              }

              let chanceForCollege = 0;
              if (grade == "A+") {
                chanceForCollege = 90;
              } else if (grade == "A") {
                chanceForCollege = 75;
              } else if (grade == "B") {
                chanceForCollege = 60;
              } else if (grade == "C") {
                chanceForCollege = 40;
              } else if (grade == "D") {
                chanceForCollege = 30;
              } else {
                chanceForCollege = 0;
              }

              if (data.shareService.randomAtoB(0, 100) <= chanceForCollege) {
                let randomCollege = data.shareService.randomAtoB(0, data.majors.length - 1);
                let college = data.majors[randomCollege]["value"];
                let wantsToBeADoctor = 0;
                if (grade == "A+") {
                  if (data.shareService.randomAtoB(0, 4) < 1) {
                    wantsToBeADoctor = 1;
                  }
                }

                data.years[data.age].events.push(`${child.name} started studying ${college}.`); //.toLowerCase()
                child.goingToCollege = 1;
                child.goingToCollegeYears = 0;
                child.studying = college;
              }
            }
          }
        }
      }
    }

    //decideGrade

    for (let i = 0; i < data.friends.length; i++) {
      if (data.friends[i].alive == 1) {
        data.friends[i].age += 1;

        let amount = data.shareService.randomAtoB(1, 5);
        let prefix = data.shareService.randomAtoB(1, 5);

        let character = "";
        if (prefix < 3) {
          character = "-";
        } else {
          character = "+";
        }

        data.shareService.handleFriendshipStrength(data, i, character, amount);

      }
    }

    for (let i = 0; i < data.pets.length; i++) {
        data.pets[i].age += 1;

        let chanceOfDying = 4;

        if (data.pets[i].specie == "Cat") {
          if (data.pets[i].age > 13) {
            chanceOfDying += data.shareService.randomAtoB(8, 15);
          }
        }

        if (data.pets[i].specie == "Dog") {
          if (data.pets[i].age > 10) {
            chanceOfDying += data.shareService.randomAtoB(8, 15);
          }
        }

        if (chanceOfDying > data.shareService.randomAtoB(1, 100)) {
          data.years[data.age].events.push(`My ${data.pets[i].specie.toLowerCase()} ${data.pets[i].name} died.`);
          data.pets.splice(i, 1);
          data.shareService.update(data);
        }
    }

    for (let i = 0; i < data.cars.length; i++) {
      data.cars[i]["age"] += 1;

      if (data.cars[i]["age"] > 50) data.cars[i]["value"] = data.cars[i]["price"] * 0.15;
      else if (data.cars[i]["age"] > 40) data.cars[i]["value"] = data.cars[i]["price"] * 0.2;
      else if (data.cars[i]["age"] > 30) data.cars[i]["value"] = data.cars[i]["price"] * 0.3;
      else if (data.cars[i]["age"] > 25) data.cars[i]["value"] = data.cars[i]["price"] * 0.35;
      else if (data.cars[i]["age"] > 20) data.cars[i]["value"] = data.cars[i]["price"] * 0.38;
      else if (data.cars[i]["age"] > 18) data.cars[i]["value"] = data.cars[i]["price"] * 0.42;
      else if (data.cars[i]["age"] > 16) data.cars[i]["value"] = data.cars[i]["price"] * 0.5;
      else if (data.cars[i]["age"] > 14) data.cars[i]["value"] = data.cars[i]["price"] * 0.55;
      else if (data.cars[i]["age"] > 10) data.cars[i]["value"] = data.cars[i]["price"] * 0.6;
      else if (data.cars[i]["age"] > 8) data.cars[i]["value"] = data.cars[i]["price"] * 0.65;
      else if (data.cars[i]["age"] > 5) data.cars[i]["value"] = data.cars[i]["price"] * 0.68;
      else if (data.cars[i]["age"] > 4) data.cars[i]["value"] = data.cars[i]["price"] * 0.7;
      else if (data.cars[i]["age"] > 3) data.cars[i]["value"] = data.cars[i]["price"] * 0.75;
      else if (data.cars[i]["age"] > 1) data.cars[i]["value"] = data.cars[i]["price"] * 0.8;

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

    if (data.alive == 1 && data.ownedProperties.length > 0 && data.inPrison == 0) {
      // let chanceOfBurglary = 5;
      let chanceOfBurglary = 2;

      if (chanceOfBurglary > data.shareService.randomAtoB(1, 100)) {
        let numOfBurglars = data.shareService.randomAtoB(1, 2);

        let oneOrTwo = "";
        let oneOrTwo2 = "";
        let oneOrTwo3 = "";
        let oneOrTwo4 = "";
        let buttonText = "";
        if (numOfBurglars == 1) {
          oneOrTwo = "Burglar";
          oneOrTwo3 = "him";

          buttonText = "Attack him";
          oneOrTwo4 = "He";
        } else {
          oneOrTwo = "Burglars";
          oneOrTwo2 = `<br>There are ${numOfBurglars} of them.`;
          oneOrTwo3 = "them";

          buttonText = "Attack them";

          oneOrTwo4 = "They";
        }

        let textToAdd = "";

        let chanceOfWeapon = 50;
        if (chanceOfWeapon > data.shareService.randomAtoB(1, 100)) {
          let weapons = ["pistol", "knife", "baseball bat", "knuckle duster", "taser"];
          let weapon = weapons[data.shareService.randomAtoB(0, weapons.length - 1)];

          if (numOfBurglars == 1) {
            textToAdd += `<br>He is threatening you with a ${weapon}.`;
          } else {
            textToAdd += `<br>They are threatening you with a ${weapon}.`;
          }
        }

        let alert = this.alertCtrl.create({
          enableBackdropDismiss: false,
          subTitle: 'Fight or flight',
          message: `${oneOrTwo} broke into your home.${oneOrTwo2}${textToAdd}<br><br>What are you going to do?`,
          buttons: [
            {
              text: buttonText,
              handler: () => {
                //console.log("I started High School");
                //data.shareService.takeDrivingTest(data);
                //console.log(pension);
                //console.log("Retired");
                // data.shareService.retire(data, pension);

                let chanceOfGood = 43;

                if (chanceOfGood > data.shareService.randomAtoB(1, 100)) {

                  let textToAdd = ``;

                  let isBroken = 60;
                  if (isBroken > data.shareService.randomAtoB(1, 100)) {
                    let brokens = ["arm", "leg", "hip", "jaw bone", "head", "finger", "ribs"];

                    let broken = brokens[data.shareService.randomAtoB(0, brokens.length - 1)];

                    textToAdd += `<br>I broke his ${broken}.`;
                  }

                  let text = `I managed to defend myself.<br>I attacked ${oneOrTwo3} unexpectedly.<br>${textToAdd}<br>${oneOrTwo4} escaped.`;

                  let alert = this.alertCtrl.create({
                    enableBackdropDismiss: false,
                    subTitle: 'Take that!',
                    message: text,
                    buttons: [
                      {
                        text: 'Ok'
                      }
                    ]
                  });
                  alert.present();
                } else {
                  // let chanceOfDeath = 5;
                  let chanceOfDeath = 10;
                  if (chanceOfDeath > data.shareService.randomAtoB(1, 100)) {
                    data.alive = 0;

                    data.deathCause = "injuries";

                    data.years[data.age].events.push(`I died in the fight with the ${oneOrTwo.toLowerCase()}.`);

                    data.shareService.saveGame(data);
                  } else {
                    let brokens = ["arm", "leg", "hip", "jaw bone", "head", "finger", "ribs"];

                    let id = data.shareService.randomAtoB(0, brokens.length - 1);
                    let broken = brokens[id];

                    brokens.splice(id, 1);

                    let textToAdd = `<br><br>${oneOrTwo4} broke my ${broken}`;
                    if (data.shareService.randomAtoB(1, 100) < 50) {
                      let id2 = data.shareService.randomAtoB(0, brokens.length - 1);
                      let broken2 = brokens[id2];

                      textToAdd += ` and ${broken2}.`;
                    } else {
                      textToAdd += `.`;
                    }

                    let money: number = Math.abs(data.finance) * data.shareService.randomAtoB(1, 100) / data.shareService.randomAtoB(300, 600);

                    if (money > 1000000000) money /= data.shareService.randomAtoB(2, 10);
                    else if (money > 10000000) money /= data.shareService.randomAtoB(1, 4);

                    data.finance -= money;

                    textToAdd += `<br><br>${oneOrTwo4} stole $${data.shareService.formatMoney(money)} worth of items and money from me.`;

                    let text = `I attacked ${oneOrTwo3}.<br>${oneOrTwo4} overcame me.${textToAdd}`;

                    let alert = this.alertCtrl.create({
                      enableBackdropDismiss: false,
                      subTitle: 'Uh-oh!',
                      message: text,
                      buttons: [
                        {
                          text: 'Ok'
                        }
                      ]
                    });
                    alert.present();
                  }

                }

              }
            },
            {
              text: 'Surrender',
              handler: () => {
                let money: number = Math.abs(data.finance) * data.shareService.randomAtoB(1, 100) / data.shareService.randomAtoB(300, 600);

                data.finance -= money;

                textToAdd = `${oneOrTwo4} stole $${data.shareService.formatMoney(money)} worth of items and money from me.`;

                let text = `${textToAdd}`;

                let alert = this.alertCtrl.create({
                  enableBackdropDismiss: false,
                  subTitle: 'Uh-oh!',
                  message: text,
                  buttons: [
                    {
                      text: 'Ok'
                    }
                  ]
                });
                alert.present();
              }
            }
          ]
        });
        alert.present();
      }
    }

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
    data.shareService.calculateNetWorth(data);

    this.willIDie(data);








    if (data.homeless == 0) {
      if (data.father.alive == 0 && data.mother.alive == 0 && data.posjedi.length == 0) {
        data.homeless = 1;
        data.livingText = "You're homeless.";

        data.years[data.age].events.push(`I became homeless.`);
      }

      if (data.age > 18 && (data.father.alive == 1 || data.mother.alive == 1) && data.posjedi.length == 0) {
        let chance = 2;

        if (data.age > 20) chance = 2;
        else if (data.age > 30) chance = 5;
        else if (data.age > 40) chance = 10;
        else if (data.age > 45) chance = 20;
        else if (data.age > 50) chance = 20;
        else if (data.age > 60) chance = 20;
        else if (data.age > 70) chance = 20;
        else if (data.age > 80) chance = 20;
        else if (data.age > 90) chance = 20;

        let rollDice = data.shareService.randomAtoB(1, 10000) / 100;

        //console.log(chance, rollDice);

        if (rollDice <= chance) {
          data.homeless = 1;
          data.livingText = "You're homeless.";

          if (data.father.alive == 1 && data.mother.alive == 1) {
            data.years[data.age].events.push(`My parents kicked me out of my home. I am now homeless.`);
          } else if (data.father.alive == 0 && data.mother.alive == 1) {
            data.years[data.age].events.push(`My mother kicked me out of my home. I am now homeless.`);
          } else if (data.father.alive == 1 && data.mother.alive == 0) {
            data.years[data.age].events.push(`My father kicked me out of my home. I am now homeless.`);
          }
        }
      }
    }










    if (data.alive && data.inPrison == 0) {
      this.data["shareService"].updateJobs(this.data, this.jobs);

      this.offerDrugs(data);


      if (data.retirementAge == data.age && data.isWorking == 1) {
        let upOrDown = data.shareService.randomAtoB(0, 1);
        if (upOrDown == 0) upOrDown = -1;
        else upOrDown = 1;


        let pension = (data.myJob[2] / 12 * 1000 * 0.7) + upOrDown * (data.myJob[2] / 12 * 1000 * 0.1);

        let alert = this.alertCtrl.create({
          enableBackdropDismiss: false,
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
        data.shareService.calculateNetWorth(data);
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

        data.shareService.checkAchievement("Academic");
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
          data.shareService.checkAchievement("Little Einstein");
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
        data.shareService.calculateNetWorth(data);
      }

      if (data.instruments.length > 0) {
        data.finance -= data.instruments.length * 100 * 12;
        data.shareService.calculateNetWorth(data);
      }

      if (data.sports.length > 0) {
        data.finance -= data.sports.length * 60 * 12;
        data.shareService.calculateNetWorth(data);
      }

      if (data.age == 1) {
        let firstWord = this.firstWords[data.shareService.randomAtoB(0, this.firstWords.length - 1)];
        //console.log(firstWord);
        data.years[data.age].events.push(`I said my first word! I said "${firstWord}".`);
      } else if (data.age == 3) {
        data.years[data.age].events.push(`I started going to kindergarten.`);
        //console.log(data.shareService.createPerson(data));

        if (data.sociability > 25) {
          let numOfFriends = data.shareService.randomAtoB(0, 6);
          let preposition = "";
          if (numOfFriends < 4) {
            numOfFriends = 1;
            preposition = "friend";
          } else if (numOfFriends < 6) {
            numOfFriends = 2;
            preposition = "friends";
          } else {
            numOfFriends = 3;
            preposition = "friends";
          }

          let friends = [];
          let text = "";
          for (let i = 0; i < numOfFriends; i++) {
            friends.push(data.shareService.createPerson(data));
            friends[i].friendIndex = i;
            data.friends.push(friends[i]);
          }

          if (numOfFriends == 1) {
            text = friends[0]["name"];
          } else if (numOfFriends == 2) {
            text = friends[0]["name"] + " and " + friends[1]["name"];
          } else {
            text = friends[0]["name"] + ", " + friends[1]["name"] + " and " + friends[2]["name"];
          }

          data.years[data.age].events.push(`I've become best ${preposition} with ${text}.`);
        }

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
            data.shareService.checkAchievement("Aced it!");
          } else if (percent >= 1) {
            data.elementaryGrade = "A+";
            data.passed.elementary = 1;
            data.shareService.checkAchievement("Our little genius");
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

    } else if (data.alive && data.inPrison == 1) {
      data.prisonYears -= 1;
      data.yearsServed += 1;
      if (data.prisonYears == 0) {
        data.years[data.age].events.push(`I have finished my sentence and I've been released.`);
        data.inPrison = 0;
      }
    } else {
      let cause = "";

      if (data.age > 3) {
        cause = this.causes[data.shareService.randomAtoB(0, this.causes.length - 1)];
      } else {
        cause = this.babyCauses[data.shareService.randomAtoB(0, this.babyCauses.length - 1)];
      }
      data.shareService.disableAll(data);
      data.deathCause = cause;
      data.years[data.age].events.push(`I died from ${cause}.`);

      data.shareService.googlePlaySubmitScore(data);
      data.shareService.deleteSaveGame();


      //this.events.publish("goToObituary");
    }

    if (data.age > 5 && data.age < 12 && data.alive == 1) {
      if (data.friends.length > 0) {
        let chanceOfAsking = 35; //35

        if (data.shareService.randomAtoB(1, 100) < chanceOfAsking) {
          let friendIndex = data.shareService.randomAtoB(0, data.friends.length - 1);
          let friend = data.friends[friendIndex];

          let activities = ["is calling me to go play outside",
            "wants to go skateboarding together",
            "wants to go rollerblading together",
            "is calling me out to play football on the playground",
            "is calling me out to play basketball",
            "wants to go to the playground",
            "wants to ride bicycles together"];

          let finishedActivities = ["playing outside",
            "skateboarding",
            "rollerblading",
            "out to play football",
            "out to play basketball",
            "out to the playground",
            "riding bicycle"];

          let activityIndex = data.shareService.randomAtoB(0, activities.length - 1);
          let activity = activities[activityIndex];

          let alert = this.alertCtrl.create({
            enableBackdropDismiss: false,
            subTitle: "Hangout",
            message: `${friend.name} ${activity}.<br><br>Will I go?`,
            buttons: [
              {
                text: 'Yes',
                handler: () => {
                  data.years[data.age].events.push(`I went ${finishedActivities[activityIndex]} with ${friend.name}.`);
                  data.shareService.handleHappiness(data, "+", data.shareService.randomAtoB(5, 15));
                  data.shareService.update(data);

                  data.shareService.handleFriendshipStrength(data, friendIndex, "+", data.shareService.randomAtoB(10, 15));
                  //console.log(data.friends[friendIndex]);
                }
              },
              {
                text: 'No',
                handler: () => {
                  data.shareService.handleFriendshipStrength(data, friendIndex, "-", data.shareService.randomAtoB(5, 15));
                },
                role: 'cancel'
              }
            ]
          });
          alert.present();
        }
      }
    }


    data.shareService.calculateNetWorth(data);

    if (data.alive == 1) {
      data.shareService.saveGame(data);
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
