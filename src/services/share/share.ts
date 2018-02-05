import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ShareService {

    data: object;
    names: object;

    constructor(public alertCtrl: AlertController) {
        this.data = {};
    }

    setData(data) {
        this.data = data;
    }

    getData() {
        return this.data;
    }

    sexualityConfirm(data) {
        data.years[data.age].events.push("I declared myself as " + data.sexuality + ".");
    }

    learningChanged(data) {
        //console.log("Demn, it changed");
        if (data.isLearning == 1) {
            data.years[data.age].events.push("I started learning.");
        } else {
            data.years[data.age].events.push("I stopped learning.");
        }
    }

    readingChanged(data) {
        if (data.isReadingBooks == 1) {
            data.years[data.age].events.push("I started reading books.");
        } else {
            data.years[data.age].events.push("I stopped reading books.");
        }
    }

    formatMoney(amount) {
        return (amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
    }

    gymChanged(data) {
        if (data.goingToGym == 1) {
            data.years[data.age].events.push("I started going to gym.");
            data.outcome += (50);
        } else {
            data.years[data.age].events.push("I stopped going to gym.");
            data.outcome -= (50);
        }
    }

    instrumentsChanged(data) {
        //console.log(data.instruments, data.oldInstruments);;
        //var newInstruments = this.arr_diff(data.instruments, data.oldInstruments);
        var newInstruments1 = data.instruments.filter(item => data.oldInstruments.indexOf(item) < 0);
        var newInstruments2 = data.oldInstruments.filter(item => data.instruments.indexOf(item) < 0);
        data.oldInstruments = data.oldInstruments.concat(newInstruments1);
        data.oldInstruments = data.oldInstruments.filter(function (el) {
            return newInstruments2.indexOf(el) < 0;
        });

        //console.log(newInstruments, "newInstruments");
        if (newInstruments1.length > 0) {

            data.outcome += (newInstruments1.length * 100);

            var startedInstrumentsText = "";
            if (newInstruments1.length == 1) {
                startedInstrumentsText = "I started playing " + newInstruments1[0] + ".";
            } else if (newInstruments1.length == 2) {
                startedInstrumentsText = "I started playing " + newInstruments1[0] + " and " + newInstruments1[1] + ".";
            } else {
                startedInstrumentsText = "I started playing " + newInstruments1[0];
                for (newInstrumentsTmp = 1; newInstrumentsTmp < newInstruments1.length - 1; newInstrumentsTmp++) {
                    startedInstrumentsText += ", " + newInstruments1[newInstrumentsTmp];
                }
                startedInstrumentsText += (" and " + newInstruments1[newInstruments1.length - 1] + ".");
            }
            /* if (data.years[data.age].events[-1] == startedInstrumentsText) {
                console.log("WAIT, ISTI SU");
            } */
            data.years[data.age].events.push(startedInstrumentsText);
        }

        if (newInstruments2.length > 0) {

            data.outcome -= (newInstruments2.length * 100);

            var stoppedInstrumentsText = "";
            if (newInstruments2.length == 1) {
                stoppedInstrumentsText = "I stopped playing " + newInstruments2[0] + ".";
            } else if (newInstruments2.length == 2) {
                stoppedInstrumentsText = "I stopped playing " + newInstruments2[0] + " and " + newInstruments2[1] + ".";
            } else {
                stoppedInstrumentsText = "I stopped playing " + newInstruments2[0];
                for (var newInstrumentsTmp = 1; newInstrumentsTmp < newInstruments2.length - 1; newInstrumentsTmp++) {
                    stoppedInstrumentsText += ", " + newInstruments2[newInstrumentsTmp];
                }
                stoppedInstrumentsText += (" and " + newInstruments2[newInstruments2.length - 1] + ".");
            }



            data.years[data.age].events.push(stoppedInstrumentsText);
        }
        /* console.log("Ovo su dodane stvari", newInstruments1);
        console.log("Ovo su uklonjene stvari", newInstruments2); */

    }

    enrollHighSchoolButton(data) {
        //!data.goingToHighSchool && (data.age < 14 || data.age > 18)
        if (data.age < 14 || data.age >= 18) {
            if (data.goingToHighSchool == 0) {
                return true;
            } else {
                return false;
            }
        } else if (data.goingToHighSchool == 0 && data.passed.elementary == 1) {
            return false;
        } else {
            return true;
        }
    }

    dropoutHighSchoolButton(data) {
        if (data.goingToHighSchool == 1) {
            return false;
        } else {
            return true;
        }
    }

    dropoutElementaryButton(data) {
        //console.log("Elem", data)
        if (data.goingToElementary == 1) {
            return false;
        } else {
            return true;
        }
    }

    dropoutHighSchool(data) {
        data.goingToHighSchool = 0;
        data.goingToHighSchoolYears = 0;
        data.years[data.age].events.push("I dropped out of high school.");
    }

    dropoutElementary(data) {
        data.goingToElementary = 0;
        data.goingToElementaryYears = 0;
        //this.dropoutElementaryButton(data, 'true');
        data.years[data.age].events.push("I dropped out of elementary school.");
    }

    enrollHighSchool(data) {
        this.goToHighSchool(data);
    }

    goToHighSchool(data) {
        data.goingToHighSchool = 1;
        data.years[data.age].events.push("I started high school.");
    }

    newLife(data) {
        //console.log(data.jsonJobs)
        this.createMe(data, this.names);
        this.updateJobs(data, data.jsonJobs);
    }

    createMe(data, names) {
        this.names = names;
        data.gender = this.randomGender(data);
        /* if (data.gender == "M") {
          
          //console.log(this.names["male"]);
        } */
        
        var nameNum = data.shareService.randomAtoB(0, names[data.genderFull].length - 1);
        data.name = names[data.genderFull][nameNum];

        var surnameNum = data.shareService.randomAtoB(0, names["surname"].length - 1);
        data.surname = names["surname"][surnameNum];

        data.age = 0;
        //data.name = "Antonio";
        //data.surname = "Stipić";
        data.nationality = "Croatian";
        data.appearance = this.random1to100();
        data.intelligence = this.random1to100();
        data.fitness = this.random1to100();
        
        // Balance player has at the beggining of game
        data.finance = 100;

        // Player is none sexuality until 12th yo
        data.sexuality = "None";

        // Number of years player has been learning while attending elementary
        data.learnedElementary = 1;

        // Grade from elementary
        data.elementaryGrade = "None";

        // Boolean to indicate if player is going to elementary
        data.goingToElementary = 0;

        // Number of years player has been learning while attending high school
        data.learnedHighSchool = 0;

        // Boolean to indicate if player is going to high school
        data.goingToHighSchool = 0;

        // Number of years in a row player is going to school
        data.goingToHighSchoolYears = 0;

        // Grade with which player finished high school
        data.highSchoolGrade = "None";

        // Boolean to indicate if player is in debt
        data.inDebt = 0;

        // Calculated income and outcome to show to player in Finance tab
        data.income = 0;
        data.outcome = 0;

        // Number of jobs to be listed
        data.numOfJobs = 25;

        // For every year of work this counts up
        data.workExperience = 0;

        // -1 = No school, 0 = Elementary, 1 = High school, 2 = College
        data.educationLevel = -1;

        // This counts how many years has player worked at current job
        data.jobService = 0;

        // List of finished courses at college
        data.mySkills = [];

        // Empty job object
        data.myJob = ["", { "title": "", "salary": "", "experience": 0, "education": 0, "skills": [] }, ""];
        
        // Boolean to indicate if player is currently working
        data.isWorking = 0;

        // Country tax
        data.tax = 0.25;
        //data.listedJobs = {"company": [], "job": [], "salary": [], "education": []};

        // Object which will contain list of jobs to be displayed in list
        data.listedJobs = [];

        // Boolean indicators for passing elementary and high school
        data.passed = { "elementary": 0, "highschool": 0 };
        
        // Boolan is player currently learning
        data.isLearning = 0;

        // Boolan is player currently reading books
        data.isReadingBooks = 0;

        // Boolan is player currently going to gym
        data.goingToGym = 0;

        // List with instruments player played before a change has been made
        data.oldInstruments = [];

        // List with instruments including the ones player has added
        data.instruments = [];

        // Empty log
        data.years = [{ "year": 0, "events": ["You have been born as " + data.name + " " + data.surname + ".", " You are " + data.nationality + ", " + data.genderFull + "."] }];
        
        return data;
    }

    // This function is adjusted for generating appearance and intelligence
    // (Lowered chances of getting numbers under 20)
    random1to100() {
        if (Math.random() < 0.2) {
            return Math.floor(Math.random() * 99) + 1;
        } else {
            return Math.floor(Math.random() * 80) + 20;
        }
    }

    // Generates random gender
    randomGender(data) {
        var num = Math.random(), gender = "";
        if (num > 0.5) {
            data.genderFull = "male";
            gender = "M";
        } else {
            data.genderFull = "female";
            gender = "F";
        }
        return gender;
    }


    // This function is called when player is in debt
    inDebt(data) {
        data.years[data.age].events.push("I'm in debt.");
        if (data.goingToGym == 1) {
            data.goingToGym = 0;
            this.gymChanged(data);
        }

        if (data.instruments.length > 0) {
            data.oldInstruments = data.instruments;
            data.instruments = [];
            this.instrumentsChanged(data);
        }
    }

    // Generate random number in range A to B
    randomAtoB(A, B) {
        return Math.floor(Math.random() * (B - A + 1) + A);
    }

    // Converts education level to string
    numToSchool(lvl) {
        if (lvl == 2) {
            return "College";
        } else if (lvl == 1) {
            return "High school";
        } else if (lvl == 0) {
            return "Elementary school";
        }
    }

    // Update jobs list
    updateJobs(data, jobs) {
        //console.log(jobs);
        //data.listedJobs["company"] = [];
        data.listedJobs = [];
        for (var i = 0; i < data.numOfJobs; i++) {
            var tmpJob = [];
            var companyNum = this.randomAtoB(0, jobs["companies"].length - 1);
            tmpJob.push(jobs["companies"][companyNum]);
            //var jobsKeys = Object.keys(jobs["jobs"]);
            //console.log(jobsKeys)
            var jobNum = this.randomAtoB(0, jobs["jobs"].length - 1);
            tmpJob.push(jobs["jobs"][jobNum]);

            var range = jobs["jobs"][jobNum]["salary"].split("-");
            //console.log(range);
            var salaryNum = this.randomAtoB(parseInt(range[0]), parseInt(range[1]));
            tmpJob.push(salaryNum);
            //console.log(salaryNum);

            //console.log(tmpJob);
            //console.log(jobs["companies"][companyNum]);
            //console.log(jobs["jobs"][jobsKeys[jobNum]]);
            //data.listedJobs["company"].push(jobs["companies"][companyNum]);
            //console.log(jobs["companies"][companyNum]);
            data.listedJobs.push(tmpJob);
        }
        //console.log(data.listedJobs["company"]);

        //data.name = this.names[data.genderFull][nameNum];
    }

    applyForJob(data, job) {
        //console.log(job);
        if (job[1]["education"] <= data.educationLevel) {
            var remainingSkills = job[1]["skills"].filter(item => data.mySkills.indexOf(item) < 0);
            if (remainingSkills.length == 0) {
                let alert = this.alertCtrl.create({
                    title: 'Congratulations!',
                    subTitle: '<br>You got job as ' + job[1]["title"] + ' at ' + job[0] + '.',
                    buttons: [{
                        text: 'Ok',
                        handler: () => {
                            //data.shareService.inDebt(data);
                            if (data.isWorking == 1) {
                                this.quitJob(data);
                            }

                            data.myJob = job;
                            data.isWorking = 1;
                            data.years[data.age].events.push("I started working as " + job[1]["title"] + " at " + job[0] + ".");
                            data.income += (job[2] / 12 * 1000) * (1 - data.tax);
                        }
                    }]
                });
                alert.present();
            }
            //console.log(remainingSkills);
            //console.log("Qualified!");
        } else {
            let alert = this.alertCtrl.create({
                title: 'Bad news...',
                subTitle: '<br>You didn\'t get an interview.',
                buttons: [{
                    text: 'Ok',
                    handler: () => {
                        //data.shareService.inDebt(data);
                    }
                }]
            });
            alert.present();
        }
    }

    // Quit job
    quitJob(data) {
        data.income -= (data.myJob[2] / 12 * 1000) * (1 - data.tax);
        data.years[data.age].events.push("I quit my job as " + data.myJob[1]["title"] + ".");
        data.myJob = ["", { "title": "", "salary": "", "experience": 0, "education": 0, "skills": [] }, ""];
        data.isWorking = 0;
    }

    /* arr_diff(a1, a2) {

        var a = [], diff = [];

        for (var arr_diff_i = 0; arr_diff_i < a1.length; arr_diff_i++) {
            a[a1[arr_diff_i]] = true;
        }

        for (var arr_diff_i = 0; arr_diff_i < a2.length; arr_diff_i++) {
            if (a[a2[arr_diff_i]]) {
                delete a[a2[arr_diff_i]];
            } else {
                a[a2[arr_diff_i]] = true;
            }
        }

        for (var k in a) {
            diff.push(k);
        }

        return diff;
    } */
}