import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@Injectable()
export class ShareService {

    data: object;
    names: object;

    constructor(public alertCtrl: AlertController, public modalCtrl: ModalController) {
        this.data = {};
    }

    findLoveModal(lover) {
        let profileModal = this.modalCtrl.create(findLoveModal, { lover: lover }, {
            showBackdrop: false,
            enableBackdropDismiss: false,
            enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave'
        });
        profileModal.present();
    }

    propertyListingModal(data, posjedi) {
        let propertyModal = this.modalCtrl.create(propertyListingModal, { data: data, posjedi: posjedi }, {
            showBackdrop: false,
            enableBackdropDismiss: false,
            enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave'
        });
        propertyModal.present();
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

    createRealEstate() {
        let types = ["Apartment", "Apartment", "Condo", "Condo", "House", "House"];
        //, "Mansion" Mansion will be added later !
        let tmpType = types[this.randomAtoB(0, 3)];
        var numOfBedrooms, hasParking, hasGarage, hasGarden, priceRange, k, v, addOrTake, result;

        if (tmpType == "Apartment" || tmpType == "Condo") {
            numOfBedrooms = this.randomAtoB(1, 2);
            hasParking = this.randomAtoB(0, 1);

            if (numOfBedrooms == 2) k = 1.5;
            else k = 1;

            if (hasParking == 1) k += 0.4;

            addOrTake = this.randomAtoB(0, 1);

            if (addOrTake == 0) v = 1 + (this.randomAtoB(1, 15) / 100);
            else v = 1 - (this.randomAtoB(1, 15) / 100);

            priceRange = 80000 * k * v;

            if (hasParking == 1) hasParking = "True";
            else hasParking = "False";

            result = [tmpType, numOfBedrooms + " bedrooms", "Has parking spot: " + hasParking, priceRange]

            //console.log(tmpType, "Num of bedrooms:", numOfBedrooms, "Has parking:", hasParking, "Price:", priceRange);
        } else if (tmpType == "House") {
            numOfBedrooms = this.randomAtoB(2, 5);
            hasGarage = this.randomAtoB(0, 1);
            hasGarden = this.randomAtoB(0, 1);

            if (numOfBedrooms == 2) k = 1.1;
            else if (numOfBedrooms == 3) k = 1.5;
            else if (numOfBedrooms == 4) k = 1.9;
            else if (numOfBedrooms == 5) k = 2.4;

            if (hasGarage == 1) k += 0.4;

            addOrTake = this.randomAtoB(0, 1);

            if (addOrTake == 0) v = 1 + (this.randomAtoB(1, 20) / 100);
            else v = 1 - (this.randomAtoB(1, 20) / 100);

            priceRange = 180000 * k * v;

            //console.log(tmpType, "Num of bedrooms:", numOfBedrooms, "Has garage:", hasGarage, "Has garden:", hasGarden, "Price:", priceRange);
        } else {
            //console.log(tmpType, "Num of bedrooms:", numOfBedrooms, "Has parking:", hasParking);
        }

        return result;
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
        return ((amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
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

    sportsChanged(data) {
        //console.log(data.instruments, data.oldInstruments);;
        //var newInstruments = this.arr_diff(data.instruments, data.oldInstruments);
        var newSports1 = data.sports.filter(item => data.oldSports.indexOf(item) < 0);
        var newSports2 = data.oldSports.filter(item => data.sports.indexOf(item) < 0);
        data.oldSports = data.oldSports.concat(newSports1);
        data.oldSports = data.oldSports.filter(function (el) {
            return newSports2.indexOf(el) < 0;
        });

        //console.log(newInstruments, "newInstruments");
        if (newSports1.length > 0) {

            data.outcome += (newSports1.length * 60);

            var startedSportsText = "";
            if (newSports1.length == 1) {
                startedSportsText = "I started playing " + newSports1[0] + ".";
            } else if (newSports1.length == 2) {
                startedSportsText = "I started playing " + newSports1[0] + " and " + newSports1[1] + ".";
            } else {
                startedSportsText = "I started playing " + newSports1[0];
                for (newSportsTmp = 1; newSportsTmp < newSports1.length - 1; newSportsTmp++) {
                    startedSportsText += ", " + newSports1[newSportsTmp];
                }
                startedSportsText += (" and " + newSports1[newSports1.length - 1] + ".");
            }
            /* if (data.years[data.age].events[-1] == startedInstrumentsText) {
                console.log("WAIT, ISTI SU");
            } */
            data.years[data.age].events.push(startedSportsText);
        }

        if (newSports2.length > 0) {

            data.outcome -= (newSports2.length * 60);

            var stoppedSportsText = "";
            if (newSports2.length == 1) {
                stoppedSportsText = "I stopped playing " + newSports2[0] + ".";
            } else if (newSports2.length == 2) {
                stoppedSportsText = "I stopped playing " + newSports2[0] + " and " + newSports2[1] + ".";
            } else {
                stoppedSportsText = "I stopped playing " + newSports2[0];
                for (var newSportsTmp = 1; newSportsTmp < newSports2.length - 1; newSportsTmp++) {
                    stoppedSportsText += ", " + newSports2[newSportsTmp];
                }
                stoppedSportsText += (" and " + newSports2[newSports2.length - 1] + ".");
            }



            data.years[data.age].events.push(stoppedSportsText);
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

    enrollCollegeButton(data) {
        if (data.passed.highschool == 1 && data.goingToCollege == 0) {
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

    dropoutCollege(data) {
        data.goingToCollege = 0;
        data.goingToCollegeYears = 0;
        data.years[data.age].events.push("I stopped studying " + data.currentCollegeMajor + ".");
        data.currentCollegeMajor = "";
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

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    enrollCollege(data) {
        var majors = this.shuffle([{
            type: 'radio',
            label: 'Biomedical Engineering',
            value: 'Biomedical Engineering'
        }, {
            type: 'radio',
            label: 'Public Health',
            value: 'Public Health'
        }, {
            type: 'radio',
            label: 'Nursing',
            value: 'Nursing'
        }, {
            type: 'radio',
            label: 'Biology',
            value: 'Biology'
        }, {
            type: 'radio',
            label: 'Chemistry',
            value: 'Chemistry'
        }, {
            type: 'radio',
            label: 'Software Engineering',
            value: 'Software Engineering'
        }, {
            type: 'radio',
            label: 'Geology',
            value: 'Geology'
        }, {
            type: 'radio',
            label: 'Behavior, Cognition, and Neuroscience',
            value: 'Behavior, Cognition, and Neuroscience'
        }, {
            type: 'radio',
            label: 'Economics',
            value: 'Economics'
        }, {
            type: 'radio',
            label: 'Mathematics',
            value: 'Mathematics'
        }, {
            type: 'radio',
            label: 'Neuroscience',
            value: 'Neuroscience'
        }, {
            type: 'radio',
            label: 'Physics',
            value: 'Physics'
        }, {
            type: 'radio',
            label: 'Teaching',
            value: 'Teaching'
        }, {
            type: 'radio',
            label: 'Sociology',
            value: 'Sociology'
        }, {
            type: 'radio',
            label: 'Botanics',
            value: 'Botanics'
        }, {
            type: 'radio',
            label: 'History',
            value: 'History'
        }, {
            type: 'radio',
            label: 'Modern Languages',
            value: 'Modern Languages'
        }

        ])
        for (var e = 0; e < data.listOfColleges.length; e++) {
            for (var i = 0; i < majors.length; i++)
                if (majors[i].value === data.listOfColleges[e]) {
                    majors.splice(i, 1);
                    break;
                }
        }

        majors[0]["checked"] = true;

        let alert = this.alertCtrl.create({
            inputs: majors
        });
        alert.setTitle('College Degree');

        /* alert.addInput({
            type: 'radio',
            label: 'Blue',
            value: 'blue',
            checked: true
        }); ?/
        */
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: selectedMajor => {
                data.currentCollegeMajor = selectedMajor;
                this.goToCollege(data);
            }
        });
        alert.present();
    }

    goToCollege(data) {
        data.goingToCollege = 1;
        data.listOfColleges.push(data.currentCollegeMajor);
        //console.log(data.listOfColleges)
        data.myMajors[data.currentCollegeMajor] = 0;
        //console.log(data.listOfColleges);
        data.years[data.age].events.push("I'm studying " + data.currentCollegeMajor + ".");
    }

    goToHighSchool(data) {
        data.goingToHighSchool = 1;
        data.years[data.age].events.push("I started high school.");
    }

    // Turns out I don't need this function, all taken care of in popover.ts close() function
    newLife(data) {
        //console.log(data.jsonJobs)
        /* this.createMe(data, this.names);
        this.updateJobs(data, data.jsonJobs); */
    }

    createMe(data, names) {
        this.names = names;
        data.gender = this.randomGender(data);
        /* if (data.gender == "M") {
          
          //console.log(this.names["male"]);
        } */

        data.name = this.randomName(data, data.genderFull);

        data.surname = this.randomSurname(data);

        data.age = 0;
        //data.name = "Antonio";
        //data.surname = "Stipić";
        data.nationality = "Croatian";
        data.appearance = this.random1to100();
        data.intelligence = this.random1to100();
        data.fitness = this.randomAtoB(1, 100);
        data.musicality = this.randomAtoB(1, 100);

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

        // Number of years in a row player is going to college
        data.goingToCollegeYears = 0;

        // Boolean to indicate if player is going to college
        data.goingToCollege = 0;

        // Current major that player is learning for
        data.currentCollegeMajor = "";

        // Object with finished colleges
        data.myMajors = {};

        // Colleges idk
        data.listOfColleges = [];

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

        // Index of the job the player has got, used to hide card with that job
        data.gotJobNum = -1;

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

        // List with sports player played before a change has been made
        data.oldSports = [];

        // Indicator if player has patner/is in relationship
        data.havePartner = 0;

        // Lover object
        data.lover = {};

        // List with sports including the ones player has added
        data.sports = [];

        data.father = this.createParent(data, "male");
        data.mother = this.createParent(data, "female");

        // Current tab choosen in view "Me" under "Assets"
        data.meAssets = "House";

        // Empty log
        data.years = [{ "year": 0, "events": ["You have been born as " + data.name + " " + data.surname + ".", " You are " + data.nationality + ", " + data.genderFull + ".", "Your parents are:<br>" + data.father.name + " " + data.surname + " (" + data.father.age + " years old),<br>" + data.mother.name + " " + data.surname + " (" + data.mother.age + " years old)."] }];
        return data;
    }

    createParent(data, gender) {
        var name = this.randomName(data, gender);
        var age = this.randomAtoB(16, 45);
        var alive = 1;

        if (gender == "female") {
            var fatherAge = data.father.age;
            var variety = this.randomAtoB(0, 6);
            var upOrDown = this.randomAtoB(0, 2);
            if (upOrDown == 0) {
                age = fatherAge + variety;
            } else {
                age = fatherAge - variety;
                if (fatherAge == 16) age = 16;
            }
        }

        return { name: name, age: age, alive: alive };
        //console.log(name, age);
    }

    createLover(data) {
        //console.log(data.sexuality);
        var loverGender = "";
        if (data.sexuality == "Heterosexual") {
            if (data.gender == "M") loverGender = "female";
            else loverGender = "male";
        } else if (data.sexuality == "Homosexual") {
            if (data.gender == "M") loverGender = "male";
            else loverGender = "female";
        } else if (data.sexuality == "Bisexual") {
            var loverChance = this.randomAtoB(0, 1);
            if (loverChance == 0) {
                loverGender = "male";
            } else {
                loverGender = "female";
            }
        }
        var loverName = this.randomName(data, loverGender);
        var loverSurname = this.randomSurname(data);
        var loverAppearance = this.random1to100();
        var loverIntelligence = this.random1to100();
        var loverFitness = this.randomAtoB(1, 100);

        var playerAge = data.age;
        var variety = 0;
        if (playerAge > 25) {
            variety = this.randomAtoB(0, 10);
        } else if (playerAge > 16) {
            variety = this.randomAtoB(0, 4);
        } else {
            variety = this.randomAtoB(0, 2);
        }
        var upOrDown = this.randomAtoB(0, 2);
        var loverAge = 0;
        if (upOrDown == 0) {
            loverAge = playerAge + variety;
        } else {
            loverAge = playerAge - variety;
        }

        return { name: loverName, surname: loverSurname, appearance: loverAppearance, intelligence: loverIntelligence, gender: loverGender, age: loverAge, fitness: loverFitness };
    }

    isFindLoveEnabled(data) {
        if (data.age < 12) return 1;
        else if (data.sexuality == "Asexual") return 1;
        else return 0;
    }

    propertyListings(data) {
        var property, posjedi = [];
        for (var i = 0; i < 10; i++) {
            property = this.createRealEstate();
            posjedi.push(property);
        }

        console.log(posjedi)
        this.propertyListingModal(data, posjedi);
    }

    goForDate(data, lover) {
        console.log(lover);
        let alert = this.alertCtrl.create({
            title: "You are in relationship!",
            subTitle: `You are now dating ${lover.name} ${lover.surname}!`,
            buttons: ["Okay"]
        });
        data.havePartner = 1;
        data.lover = lover;
        data.lover["status"] = "Relationship";
        data.years[data.age].events.push(`I'm dating ${lover.name} ${lover.surname}.`);
        alert.present();
    }

    randomName(data, gender) {
        var nameNum = this.randomAtoB(0, this.names[gender].length - 1);
        var newName = this.names[gender][nameNum];

        return newName;
    }

    randomSurname(data) {
        var surnameNum = this.randomAtoB(0, this.names["surname"].length - 1);
        var newSurname = this.names["surname"][surnameNum];

        return newSurname;
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

    findLove(data) {
        var lover = this.createLover(data);
        //console.log(lover);

        this.findLoveModal(lover);
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

        if (data.sports.length > 0) {
            data.oldSports = data.sports;
            data.sports = [];
            this.sportsChanged(data);
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

    applyForJob(data, job, index) {

        if (job[1]["education"] <= data.educationLevel) {
            var remainingSkills = job[1]["skills"].filter(item => data.mySkills.indexOf(item) < 0);
            if (remainingSkills.length == 0) {
                let alert = this.alertCtrl.create({
                    title: 'Congratulations!',
                    subTitle: '<br>You got job as ' + job[1]["title"] + ' at ' + job[0] + '.',
                    buttons: [{
                        text: 'Ok',
                        handler: () => {
                            data.gotJobNum = index;
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
            } else {
                let alert = this.alertCtrl.create({
                    title: 'Bad news...',
                    subTitle: '<br>You didn\'t get the job because you don\'t have enough qualifications.',
                    buttons: [{
                        text: 'Ok',
                        handler: () => {
                            data.gotJobNum = index;
                            //data.shareService.inDebt(data);
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
                        data.gotJobNum = index;
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
        data.jobService = 0;
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

@Component({
    templateUrl: '../../pages/findLove/findLove.html'
})
export class findLoveModal {
    data: object;
    lover: object;
    constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController) {
        this.lover = params.get("lover");
        this.data = shareService.getData();
        //console.log();
    }

    goForDate(data, lover) {
        this.dismiss();
        data.shareService.goForDate(data, lover);
    }

    backButtonAction() {
        this.viewCtrl.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

@Component({
    templateUrl: '../../pages/me/propertyListing.html'
})
export class propertyListingModal {
    data: object;
    posjedi: object;
    constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController) {
        this.posjedi = params.get("posjedi");
        this.data = shareService.getData();
        //console.log();
    }

    backButtonAction() {
        this.viewCtrl.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}