import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AlertController, App } from 'ionic-angular';
import { ModalController, NavParams, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';


@Injectable()
export class ShareService {

    data: object;
    names: object;
    cars: object;

    constructor(public app: App, public alertCtrl: AlertController, public modalCtrl: ModalController, public events: Events) {
        this.data = {};
    }

    createVehicle(data) {
        let rndCar = {};
        while (rndCar["price"] == undefined) {
            rndCar = this.randomProperty(this.cars);
        }
        //console.log(rndCar);

        let range = rndCar["price"].split("-");
        //console.log(range);
        let brand = rndCar["title"];
        let color = data.colors[this.randomAtoB(0, data.colors.length - 1)];
        let carPrice = this.randomAtoB(parseInt(range[0]) * 1000, parseInt(range[1]) * 1000);
        let car = this.randomProperty(rndCar["models"]);
        //console.log(brand + " - " + car["title"], carPrice);

        return [brand, car["title"], color, carPrice];
    }

    randomProperty(obj) {
        let keys = Object.keys(obj)
        return obj[keys[keys.length * Math.random() << 0]];
    }

    findLoveModal(lover) {
        let profileModal = this.modalCtrl.create(findLoveModal, { lover: lover }, {
            showBackdrop: false,
            enableBackdropDismiss: true,
            /* enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave' */
        });
        profileModal.present();
    }

    propertyListingModal(data, posjedi) {
        data.propertyModal = this.modalCtrl.create(propertyListingModal, { data: data, posjedi: posjedi }, {
            showBackdrop: false,
            enableBackdropDismiss: true,
            /* enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave' */
        });
        data.propertyModal.present();
    }

    carsForSaleModal(data, cars) {
        let vehicleModal = this.modalCtrl.create(carsForSaleModal, { data: data, cars: cars }, {
            showBackdrop: false,
            enableBackdropDismiss: true,
            /* enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave' */
        });
        vehicleModal.present();
    }

    weddingModal(data) {
        data.weddingModal = this.modalCtrl.create(weddingModal, { data: data }, {
            showBackdrop: false,
            enableBackdropDismiss: true,
            /* enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave' */
        });
        data.weddingModal.present();
    }

    holidayModal(data) {
        data.holidayModal = this.modalCtrl.create(holidayModal, { data: data }, {
            showBackdrop: false,
            enableBackdropDismiss: true,
            /* enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave' */
        });
        data.holidayModal.present();
    }

    mortgageModal(data, property, interestRate) {
        data.mortgageModal = this.modalCtrl.create(mortgageModal, { data: data, property: property, interestRate: interestRate }, {
            showBackdrop: false,
            enableBackdropDismiss: true,
            /* enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave' */
        });
        data.mortgageModal.present();
    }

    socialNetworkModal(data) {
        data.socialModal = this.modalCtrl.create(socialNetworkModal, { data: data }, {
            showBackdrop: false,
            enableBackdropDismiss: true,
            /* enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave' */
        });
        data.socialModal.present();
    }

    childModal(data, child) {
        data.childBornModal = this.modalCtrl.create(childModal, { data: data, child: child }, {
            showBackdrop: false,
            enableBackdropDismiss: true,
            /* enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave' */
        });
        data.childBornModal.present();
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
        let tmpType = types[this.randomAtoB(0, 5)];
        let numOfBedrooms, hasParking, hasGarage, hasGarden, priceRange, k, v, addOrTake, id, result;

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

            id = this.randomId(8);

            result = [tmpType, numOfBedrooms, hasParking, priceRange, id];

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

            if (hasGarden == 1) k += 0.3;

            addOrTake = this.randomAtoB(0, 1);

            if (addOrTake == 0) v = 1 + (this.randomAtoB(1, 20) / 100);
            else v = 1 - (this.randomAtoB(1, 20) / 100);

            priceRange = 180000 * k * v;

            if (hasGarage == 1) hasGarage = "True";
            else hasGarage = "False";

            if (hasGarden == 1) hasGarden = "True";
            else hasGarden = "False";

            id = this.randomId(8);

            result = [tmpType, numOfBedrooms, hasGarage, hasGarden, priceRange, id];

            //console.log(tmpType, "Num of bedrooms:", numOfBedrooms, "Has garage:", hasGarage, "Has garden:", hasGarden, "Price:", priceRange);
        } else {
            //console.log(tmpType, "Num of bedrooms:", numOfBedrooms, "Has parking:", hasParking);
        }

        return result;
    }

    buyProperty(data, property) {
        data.propertyValueIndex = 0;
        let propertyMaintenance = 0;
        if (property[0] == "House") {
            data.propertyValueIndex = 4;
            propertyMaintenance = 200;
        } else if (property[0] == "Apartment" || property[0] == "Condo") {
            data.propertyValueIndex = 3;
            propertyMaintenance = 120;
        }
        property.maintenance = (property[data.propertyValueIndex] / 1000) + propertyMaintenance;
        if (data.finance >= property[data.propertyValueIndex]) {
            //console.log(property);
            data.finance -= property[data.propertyValueIndex];
            data.ownedProperties.push(property[data.propertyValueIndex + 1]);
            data.posjedi.push(property);

            data.propertyModal.dismiss();

            let textToAdd = "";

            if (data.posjedi.length == 1) {
                data.livingIn = property[data.propertyValueIndex + 1];
                textToAdd = " and moved out of my parent's house";
            }
            let preposition = "";
            if (property[0] == "Apartment") preposition = "an";
            else preposition = "a";
            data.outcome += parseFloat(property.maintenance);

            data.years[data.age].events.push(`I bought ${preposition} ${property[0].toLowerCase()}${textToAdd}.`);
            let alert = this.alertCtrl.create({
                title: "Congratulations!",
                subTitle: `You bought ${property[0].toLowerCase()} for $${this.formatMoney(property[data.propertyValueIndex])}!`,
                buttons: [
                    {
                        text: 'Okay',
                        handler: () => {
                            //console.log('Cancel clicked');

                        }
                    }]
            });
            alert.present();
        } else {
            if (data.repaymentTerm > 0) {
                let alert = this.alertCtrl.create({
                    title: "Bad news!",
                    subTitle: `You already have a mortgage!`,
                    buttons: ["Okay"]
                });
                alert.present();
            } else if (data.finance >= property[data.propertyValueIndex] / 10) {
                let interestRate = this.randomAtoB(1, 12);
                let alert = this.alertCtrl.create({
                    title: "Bad news!",
                    subTitle: `You can't afford this ${property[0].toLowerCase()}.<br>Do you want to get a mortgage with a ${interestRate}% interest rate?`,
                    buttons: [
                        {
                            text: 'Yes',
                            handler: () => {
                                //console.log('Yes');
                                this.mortgageModal(data, property, interestRate);
                            }
                        },
                        {
                            text: 'No',
                            role: 'cancel',
                            handler: () => {
                                //console.log('No');

                            }
                        }]
                });
                alert.present();
            } else {
                let alert = this.alertCtrl.create({
                    title: "Bad news!",
                    subTitle: `You don't have enough money for the minimum deposit for this ${property[0].toLowerCase()}.`,
                    buttons: ["Okay"]
                });
                alert.present();
            }
        }
    }

    buyVehicle(data, car) {
        data.finance -= car[3];
        data.cars.push(car);
        data.years[data.age].events.push(`I bought a car.`);
        let preposition = "";
        if (car[1][0].toLowerCase() == "a" ||
            car[1][0].toLowerCase() == "e" ||
            car[1][0].toLowerCase() == "i" ||
            car[1][0].toLowerCase() == "o" ||
            car[1][0].toLowerCase() == "u") {
            preposition = "an";
        } else {
            preposition = "a";
        }
        let alert = this.alertCtrl.create({
            title: "Good deal!",
            subTitle: `You bought ${preposition} ${car[0]} for $${this.formatMoney(car[3])}!`,
            buttons: [
                {
                    text: 'Okay',
                    handler: () => {
                        //console.log('Cancel clicked');

                    }
                }]
        });
        alert.present();
    }

    goForADrive(data) {
        data.years[data.age].events.push(`I went for a drive.`);
        let speedingChance = this.randomAtoB(1, 100);

        this.handleHappiness(data, "+", 1.5);

        if (speedingChance < 30) {
            let alert = this.alertCtrl.create({
                subTitle: "I'm above the law!",
                message: "You are driving too fast.<br>Police is driving right behind you with sirens on. They want you to stop.",
                buttons: [{
                    text: 'Pull over',
                    handler: () => {
                        let releasedWith = "";
                        let messageText = "";
                        let warning = this.randomAtoB(0, 1);
                        if (warning == 1) {
                            messageText = "You got away with a warning.";
                            releasedWith = "released with warning";

                            this.handleHappiness(data, "-", 5);
                        } else {
                            messageText = "Officer wrote you a speeding ticket. You had to pay $200.";
                            releasedWith = "got speeding ticket";
                            data.finance -= 200;
                            this.handleHappiness(data, "-", 8);
                        }
                        let pulloverAlert = this.alertCtrl.create({
                            subTitle: "Good day officer...",
                            message: messageText,
                            buttons: ["Okay"]
                        });
                        pulloverAlert.present();
                        data.years[data.age].events.push(`I got pulled over and ${releasedWith}.`);
                    }
                }, {
                    text: 'Accelerate',
                    handler: () => {
                        let speed = this.randomAtoB(150, 200);
                        let policeCars = this.randomAtoB(2, 3);
                        let loseLicense = this.randomAtoB(0, 1);
                        let textToAdd = "";
                        let speedingTicket = 2000 / 100 * speed;
                        if (loseLicense == 1) {
                            textToAdd = `Officer wrote you a speeding ticket of $${speedingTicket} and took your driving license.`;
                        } else {
                            textToAdd = `Officer wrote you a speeding ticket of $${speedingTicket}.`;
                        }
                        //console.log(speed);
                        let accelerateAlert = this.alertCtrl.create({
                            subTitle: "Jesus take the wheel!",
                            message: `You're driving at the speed of ${speed} km/h!<br>As you look in the rear-view mirror you can see there are now ${policeCars} police cars behind you.`,
                            buttons: [{
                                text: 'Pull over',
                                handler: () => {
                                    let pulloverAlert = this.alertCtrl.create({
                                        subTitle: "Good day officer...",
                                        message: textToAdd,
                                        buttons: ["Okay"]
                                    });
                                    pulloverAlert.present();

                                    data.finance -= speedingTicket;
                                    if (loseLicense == 1) {
                                        data.passedDrivingTest = 0;
                                        data.years[data.age].events.push(`I got speeding ticket and lost my driving license.`);
                                        this.handleHappiness(data, "-", 20);
                                    } else {
                                        data.years[data.age].events.push(`I got speeding ticket.`);
                                        this.handleHappiness(data, "-", 10);
                                    }
                                }
                            }, {
                                text: 'Escape them',
                                handler: () => {
                                    let willEscape = this.randomAtoB(0, 1);
                                    let addTextEscape = "", titleToAdd = "";
                                    if (willEscape == 1) {
                                        addTextEscape = `You started weaving through traffic.<br>At the intersection you made sharp U turn. Police cars couldn't stop so fast.<br><br>You don't see anyone following you anymore.`;
                                        data.years[data.age].events.push(`I escaped from cops.`);
                                        titleToAdd = "Like a boss";
                                        this.handleHappiness(data, "+", 15);
                                    } else {
                                        data.passedDrivingTest = 0;
                                        data.allowedToTakeDrivingTest = 0;
                                        let ticket = this.randomAtoB(8000, 12000);
                                        data.finance -= ticket;
                                        addTextEscape = `Another police car appeared in front of you.<br>You stepped on the brake so you don't crash in to them.<br><br>You got arrested and released, they took your driving license and you aren't allowed to retake driving test ever again.<br>You paid $${ticket} for your speeding ticket.`;
                                        data.years[data.age].events.push(`Police was chasing after me.<br>I got arrested and released.<br>I lost my driving license.`);
                                        titleToAdd = "So close...";
                                        this.handleHappiness(data, "-", 25);
                                    }

                                    let finalAlert = this.alertCtrl.create({
                                        subTitle: titleToAdd,
                                        message: addTextEscape,
                                        buttons: ["Okay"]
                                    });
                                    finalAlert.present();
                                }
                            }]
                        });
                        accelerateAlert.present();
                        //data.years[data.age].events.push(`I got pulled over and ${releasedWith}.`);
                    }
                }]
            });
            alert.present();
        }

        //document.getElementById("tab-t0-0").click();
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

    smokingChanged(data) {
        if (data.smoking == 1) {
            if (data.dontAnnounceSmoking == 0) {
                data.years[data.age].events.push("I started smoking.");
            } else {
                data.dontAnnounceSmoking = 0;
            }
        } else {
            //console.log(this.randomAtoB(1, data.smokingFor));

            let lessThan = 0;
            if (data.smokingFor < 5) {
                lessThan = 3;
            } else {
                lessThan = data.smokingFor / 5;
            }

            if (this.randomAtoB(1, data.smokingFor) < lessThan) {
                data.smokingFor = 0;
                data.years[data.age].events.push("I stopped smoking.");
            } else {
                data.years[data.age].events.push("I stopped smoking.");
                data.startSmokingAgain = 1;
            }
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
                startedSportsText = "I started training " + newSports1[0] + ".";
            } else if (newSports1.length == 2) {
                startedSportsText = "I started training " + newSports1[0] + " and " + newSports1[1] + ".";
            } else {
                startedSportsText = "I started training " + newSports1[0];
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
        }, {
            type: 'radio',
            label: 'Business Management',
            value: 'Business Management'
        }, {
            type: 'radio',
            label: 'Law Enforcement',
            value: 'Law Enforcement'
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
        alert.addButton({
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
                if (data.dontAskForDrivingTestOn18 == 1) {
                    this.checkDrivingTest(data);
                    data.dontAskForDrivingTestOn18 = 0;
                }
            }
        });
        alert.addButton({
            text: 'OK',
            handler: selectedMajor => {
                data.currentCollegeMajor = selectedMajor;
                this.goToCollege(data);
                if (data.dontAskForDrivingTestOn18 == 1) {
                    this.checkDrivingTest(data);
                    data.dontAskForDrivingTestOn18 = 0;
                }
            }
        });
        alert.present();
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

    randomId(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    setCars(data, cars) {
        this.cars = cars;
    }

    createMe(data, names) {

        if (names != "") {
            this.names = names;
        }
        if (data.customLife == 1) {
            data.name = data.customLifeInfo.name;
            data.surname = data.customLifeInfo.surname;
            data.genderFull = data.customLifeInfo.gender;

            if (data.genderFull == "male") data.gender = "M";
            else data.gender = "F";
        } else {
            data.gender = this.randomGender(data);
            data.name = this.randomName(data, data.genderFull);

            data.surname = this.randomSurname(data);
        }
        /* if (data.gender == "M") {
          
          //console.log(this.names["male"]);
        } */

        data.customLife = 0;

        data.age = 0;

        // Boolean of life and death
        data.alive = 1;
        //data.name = "Antonio";
        //data.surname = "Stipić";
        data.nationality = "Croatian";
        data.appearance = this.random1to100();
        data.intelligence = this.random1to100();
        data.fitness = this.randomAtoB(1, 100);
        data.musicality = this.randomAtoB(1, 100);

        // Happiness player has at the beggining of game
        data.happiness = this.randomAtoB(50, 100);

        // Balance player has at the beggining of game
        data.finance = 100;
        //data.finance = 10000000;
        //data.finance = 150000;

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
        data.numOfJobs = 30;

        // For every year of work this counts up
        data.workExperience = 0;

        // List of jobs that don't need to specify where are you working at
        data.jobsWithoutLabel = ["Doctor", "Nurse", "Police Officer", "Mathematics Professor", "Chemistry Professor", "Biology Professor", "Sociology Professor", "Physics Professor"];

        // List containing cars that player has
        data.cars = [];

        // Boolean for passed driving test
        data.passedDrivingTest = 0;

        // If this is false, player can't take driving test anymore
        data.allowedToTakeDrivingTest = 1;

        // Number of times that player went to driving test
        data.drivingTestCount = 0;

        // -1 = No school, 0 = Elementary, 1 = High school, 2 = College
        data.educationLevel = -1;

        // This counts how many years has player worked at current job
        data.jobService = 0;

        // At this age player will be asked if it wanted to go to retirement
        data.retirementAge = this.randomAtoB(62, 69);

        // If in retirement, boolean
        data.inRetirement = 0;

        // Pension income
        data.pension = 0;

        // Change this to scrollToBottom
        data.update = 0;

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

        // List containing ids of properties that player has bought
        data.ownedProperties = [];

        // Index of the job the player has got, used to hide card with that job
        data.gotJobNum = -1;

        // List of things person can like or dislike about you
        data.likingHobbies = ["sense of humor", "personality", "looks", "kindness", "hair", "arms", "eyes", "shoes", "shoelaces", "extensive vocabulary", "music taste", "fun facts", "T-shirt"];

        // Things that person does when they reject you
        data.rejections = ["brushes your hand off in disgust", "laughs at you", "ignores you", "walks past you", "shivers in disgust", "cringes"];

        // Things person may do if they like you
        data.acceptions = ["smiles shyly", "gazes into your eyes", "giggles", "takes you by the hand", "blows you a kiss", "invites you over", "is delighted"];

        // Boolean indicators for passing elementary and high school
        data.passed = { "elementary": 0, "highschool": 0 };

        // Boolan is player currently learning
        data.isLearning = 0;

        // Boolan is player currently reading books
        data.isReadingBooks = 0;

        // Boolean is player currently going to gym
        data.goingToGym = 0;

        // Boolean is player currently smoking
        data.smoking = 0;

        // For how long is player smoking
        data.smokingFor = 0;

        // If this is true, player won't be able to quit smoking and smoking will re-activate next year
        data.startSmokingAgain = 0;

        // If this is true don't push event "I started smoking"
        data.dontAnnounceSmoking = 0;

        // List with instruments player played before a change has been made
        data.oldInstruments = [];

        // List with instruments including the ones player has added
        data.instruments = [];

        // List with sports player played before a change has been made
        data.oldSports = [];

        // Boolean if player has social network
        data.hasSocialNetwork = 0;

        // Number of fans that player has on social network
        data.numOfSocialFans = 0;

        // Number of selfies player has taken
        data.numOfSelfies = 0;

        // Number of posts player has created
        data.numOfPosts = 0;

        // Indicator if player has patner/is in relationship
        data.havePartner = 0;

        // Inficator to tell if player is pregnant
        data.isPregnant = 0;

        // List containing children objects
        data.children = [];

        // Lover object
        data.lover = { stability: 50, time: 0 };

        // List of objects containing ex partners
        data.exPartners = [];

        // List with sports including the ones player has added
        data.sports = [];

        // List with all properties that player owns
        data.posjedi = [];

        // If true, don't ask but wait for player to choose college and then ask him for driving test
        data.dontAskForDrivingTestOn18 = 0;

        // ID of property in which the player is living
        data.livingIn = "";

        // If this is true then function on me.html will activate which will change tab to 0
        data.changeTabTrue = 0;

        // List of colors
        data.colors = ["Red", "Black", "Yellow", "Blue", "White", "Silver", "Grey", "Green"];

        // Happiness player had, used to determine if he has been diagnosed with depression
        data.lastHappiness = 0;

        // Boolean to check if player has depression
        data.hasDepression = 0;

        // Amount of selfies player can take in one year
        data.selfiesPerYear = 0;

        // Booleans to check whether player broke something in last year
        data.brokeLegLastYear = 0;
        data.brokeArmLastYear = 0;

        data.father = this.createParent(data, "male");
        data.mother = this.createParent(data, "female");

        // Current tab choosen in view "Me" under "Assets"
        data.meAssets = "House";

        // Empty log
        data.years = [{ "year": 0, "events": ["You have been born as " + data.name + " " + data.surname + ".", " You are " + data.nationality + ", " + data.genderFull + ".", "Your parents are:<br>" + data.father.name + " " + data.surname + " (" + data.father.age + " years old),<br>" + data.mother.name + " " + data.surname + " (" + data.mother.age + " years old)."] }];
        return data;
    }

    passedDrivingTestText(data) {
        let text = "";
        if (data.passedDrivingTest == 1) {
            text = "Passed driving test";
        } else {
            text = "Take driving test ($80)";
        }

        return text;
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
                else if (fatherAge == 17) age = 17;
                else if (fatherAge == 18) age = 18;
                else if (fatherAge == 19) age = 18;
            }
        }

        return { name: name, age: age, alive: alive };
        //console.log(name, age);
    }

    passedDrivingTestButton(data) {
        if (data.age > 17 && data.passedDrivingTest == 0 && data.allowedToTakeDrivingTest == 1) {
            return 0;
        } else {
            return 1;
        }
    }

    takeDrivingTest(data) {
        if (data.finance >= 80) {
            data.finance -= 80;
            let chance = this.randomAtoB(0, 120 - data.intelligence);
            if (chance < 30) {
                data.passedDrivingTest = 1;
                data.drivingTestCount += 1;

                let textToAdd = "";

                if (data.drivingTestCount == 1) textToAdd = "1st";
                else if (data.drivingTestCount == 2) textToAdd = "2nd";
                else if (data.drivingTestCount == 3) textToAdd = "3rd";
                else textToAdd = data.drivingTestCount + "th";
                data.years[data.age].events.push(`I passed my driving exam after ${textToAdd} attempt.`);
                data.drivingTestCount = 0;
                let alert = this.alertCtrl.create({
                    subTitle: 'Nicely done!',
                    message: "You passed your driving exam.",
                    buttons: [{
                        text: 'Okay',
                        handler: () => {
                            //document.getElementById("tab-t0-0").click();
                        }
                    }]
                });
                alert.present();

            } else {
                data.drivingTestCount += 1;
                data.years[data.age].events.push(`I failed my driving exam.`);
                let alert = this.alertCtrl.create({
                    subTitle: 'Better luck next time!',
                    message: "You failed your driving exam.",
                    buttons: [{
                        text: 'Okay',
                        handler: () => {
                            //document.getElementById("tab-t0-0").click();
                        }
                    }]
                });
                alert.present();
            }
        } else {
            let alertic = this.alertCtrl.create({
                subTitle: 'Shut up and take my money!',
                message: "You can't afford to take this driving test. <br> It costs $80.",
                buttons: [{
                    text: 'Okay',
                    handler: () => {
                        //document.getElementById("tab-t0-0").click();
                    }
                }]
            });
            alertic.present();
        }
    }

    retire(data, pension) {

        if (pension == 0) {
            let upOrDown = data.shareService.randomAtoB(0, 1);
            if (upOrDown == 0) upOrDown = -1;
            else upOrDown = 1;


            pension = (data.myJob[2] / 12 * 1000 * 0.7) + upOrDown * (data.myJob[2] / 12 * 1000 * 0.1);
        }
        data.income -= (parseFloat(data.myJob[2]) / 12 * 1000) * (1 - data.tax);
        let preposition = "";
        if (data.jobService == 1) preposition = "year";
        else preposition = "years";
        data.years[data.age].events.push(`I retired from my job as a ${data.myJob[1]["title"]} after working ${data.jobService} ${preposition}.`);
        data.income += pension;
        data.myJob = ["", { "title": "", "salary": "", "experience": 0, "education": 0, "skills": [] }, ""];
        data.isWorking = 0;
        data.jobService = 0;
        data.pension = pension;
        data.inRetirement = 1;
    }

    takeSelfie(data) {
        if (data.selfiesPerYear < 4) {
            data.numOfSelfies += 1;
            let likes = data.numOfSocialFans * data.appearance * data.fitness / 100 / 50 * this.randomAtoB(100, 200) / 100;
            let predznak = this.randomAtoB(0, 1);
            if (predznak == 0) predznak = 1;
            else predznak = -1;

            likes = likes + (this.randomAtoB(0, data.numOfSocialFans / 2) * predznak);
            if (likes < 5) likes = this.randomAtoB(5, 10);
            let likesFinal = likes.toFixed(0);

            let newSocialFans = 0;
            if (likesFinal > data.numOfSocialFans) {
                if (data.numOfSocialFans < this.randomAtoB(1800000, 2200000)) {
                    newSocialFans = this.randomAtoB(0, parseInt(likesFinal) - data.numOfSocialFans);
                } else {
                    newSocialFans = this.randomAtoB(0, 1000);
                }
                if (newSocialFans > data.numOfSocialFans) newSocialFans = parseInt((newSocialFans / this.randomAtoB(1, 3)).toFixed(0));
                data.numOfSocialFans = parseInt(data.numOfSocialFans) + newSocialFans;
            }

            //console.log(likesFinal, newSocialFans);

            let textToAdd = ``;
            if (newSocialFans > 0) textToAdd = `<br>I got ${newSocialFans} new followers.`;

            data.years[data.age].events.push(`I took a selfie.<br>It got ${likesFinal} likes.${textToAdd}`);
            //data.changeTabTrue = 1;
            this.events.publish("goToHome");
            data.socialModal.dismiss();
            data.selfiesPerYear += 1;
        } else {
            let alert = this.alertCtrl.create({
                subTitle: "Already?!",
                message: "You can take only 4 selfies per year.",
                buttons: ["Okay"]
            });
            alert.present();
            data.socialModal.dismiss();
        }
    }

    goToHoliday(data, vacation) {
        //console.log(vacation);
        if (vacation.price <= data.finance) {
            data.finance -= vacation.price;
            let moods = ["fantastic", "average", "okay", "exciting", "adventurous"];
            let mood = moods[this.randomAtoB(0, moods.length - 1)];
            let prefix = "";
            if (mood.substring(0, 1) == "a" || mood.substring(0, 1) == "e" || mood.substring(0, 1) == "i" || mood.substring(0, 1) == "o" || mood.substring(0, 1) == "u") prefix = "an";
            else prefix = "a";
            let firstText = ``;
            if (vacation.invitePartner == true) {
                firstText = `I brought ${data.lover.name} with me.<br>`;
                this.handleStability(data, "+", this.randomAtoB(6, 15));
            }
            let secondText = `${firstText}I had ${prefix} ${mood} vacation.`;
            data.years[data.age].events.push(`I booked a holiday in ${vacation.travelTo}.<br>${secondText}`);
            this.events.publish("goToHome");
            //data.changeTabTrue = 1;
            data.holidayModal.dismiss();
            this.handleHappiness(data, "", this.randomAtoB(2, 8));
        } else {
            let alert = this.alertCtrl.create({
                subTitle: "Shut up and take my money!",
                message: `You can't afford to book this vacation. <br> It costs $${vacation.price}.`,
                buttons: ["Okay"]
            });
            alert.present();
        }
    }

    makeBaby(data) {
        let chance = 0;

        if (data.age < 30) chance = 40;
        else if (data.age < 40) chance = 30;
        else if (data.age < 50) chance = 20;
        else if (data.age < 70) chance = 10;
        else chance = 5;

        if (this.randomAtoB(1, 100) <= chance) {
            let text = "";
            if (data.gender == "F") {
                text = "You've become pregnant!";
                data.isPregnant = 1;
                data.years[data.age].events.push(`I've become pregnant.`);
            } else {
                text = "Your partner became pregnant!";
                data.lover.isPregnant = 1;
                data.years[data.age].events.push(`${data.lover.name} became pregnant.`);
            }
            let alert = this.alertCtrl.create({
                title: "Congratulations!",
                message: text,
                buttons: [{
                    text: 'Okay',
                    handler: () => {
                        //console.log('Cancel clicked');

                    }
                }]
            });
            alert.present();
        } else {
            //console.log(data.gender);
            let text = "";
            if (data.gender == "F") {
                text = "You failed to get pregnant.";
            } else {
                text = "Your partner failed to get pregnant.";
            }
            let alert = this.alertCtrl.create({
                title: "Bad news...",
                message: text,
                buttons: [{
                    text: 'Okay',
                    handler: () => {
                        //console.log('Cancel clicked');

                    }
                }]
            });
            alert.present();

        }
    }

    gaveBirth(data, who) {
        this.createChild(data, who);

        //console.log(child);
    }

    getMortgage(data, repaymentTerm, monthlyPayment, deposit, interestRate, property) {
        //console.log(repaymentTerm, monthlyPayment);
        data.repaymentTerm = repaymentTerm;
        data.monthlyPayment = parseFloat(monthlyPayment);
        data.outcome += parseFloat(monthlyPayment);
        data.finance -= deposit;
        data.interestRate = interestRate;

        //data.changeTabTrue = 1;
        this.events.publish("goToHome");
        data.mortgageModal.dismiss();

        data.ownedProperties.push(property[data.propertyValueIndex + 1]);
        data.posjedi.push(property);

        data.propertyModal.dismiss();
        let textToAdd = "";

        if (data.posjedi.length == 1) {
            data.livingIn = property[data.propertyValueIndex + 1];
            textToAdd = " and moved out of my parent's house";
        }
        let preposition = "";
        if (property[0] == "Apartment") preposition = "an";
        else preposition = "a";

        data.outcome += parseFloat(property.maintenance);

        data.years[data.age].events.push(`I bought ${preposition} ${property[0].toLowerCase()}${textToAdd}.`);
        let alert = this.alertCtrl.create({
            title: "Congratulations!",
            subTitle: `You bought ${property[0].toLowerCase()} for $${this.formatMoney(property[data.propertyValueIndex])}!`,
            buttons: [
                {
                    text: 'Okay',
                    handler: () => {
                        //console.log('Cancel clicked');

                    }
                }]
        });
        alert.present();
    }

    goOnADate(data) {
        if (this.randomAtoB(0, 2) == 0) {
            let excuses = ["is too tired to do anything", "doesn't have time", "had family emergency", "had to go to the dentist"];
            let excuse = excuses[this.randomAtoB(0, excuses.length - 1)];

            this.handleHappiness(data, "-", this.randomAtoB(2, 4));
            this.handleStability(data, "-", this.randomAtoB(2, 4));

            let alert = this.alertCtrl.create({
                subTitle: "Oh, okay...",
                message: `${data.lover.name} ${excuse} and isn't able to go on a date.`,
                buttons: [{
                    text: "Okay",
                    handler: () => {

                    }
                }]
            });
            alert.present();
        } else {
            let places = ["to the cinema", "on a romantic dinner", "for a walk", "bowling", "for a coffee", "to the zoo", "to the museum", "to the art gallery", "ice skating", "to concert"];
            let place = places[this.randomAtoB(0, places.length - 1)];

            let text = `${data.lover.name} and I went ${place}.`;

            data.years[data.age].events.push(text);
            this.handleHappiness(data, "+", this.randomAtoB(2, 4));
            this.handleStability(data, "+", this.randomAtoB(2, 4));
            let alert = this.alertCtrl.create({
                subTitle: "Time for romance",
                message: text,
                buttons: [{
                    text: "Okay",
                    handler: () => {

                    }
                }]
            });
            alert.present();

        }
    }

    createPost(data) {
        data.numOfPosts += 1;
        data.years[data.age].events.push("I published a post.");
        this.events.publish("goToHome");
        //data.changeTabTrue = 1;
        data.socialModal.dismiss();
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
        var loverStability = 50;
        var loverTime = 0;

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

        return { name: loverName, surname: loverSurname, appearance: loverAppearance, intelligence: loverIntelligence, gender: loverGender, age: loverAge, fitness: loverFitness, stability: loverStability, time: loverTime, isPregnant: 0 };
    }

    createChild(data, who) {
        let genderInt = this.randomAtoB(0, 1);

        let gender = "";
        if (genderInt == 0) gender = "male";
        else gender = "female";

        let childGender = "";
        if (gender == "male") childGender = "boy";
        else childGender = "girl";

        let child = { gender: gender, childGender: childGender, whoGaveBirth: who };
        this.childModal(data, child);
    }

    choosenChildName(data, child, name) {
        name = name.replace(/\s\s+/g, ' ');
        if (name == undefined || name == "" || name == " ") {
            console.log("Prazno je");
        } else {
            data.childBornModal.dismiss();

            let appearance = this.random1to100();
            let intelligence = this.random1to100();
            let fitness = this.randomAtoB(1, 100);

            child.name = name;
            child.appearance = appearance;
            child.intelligence = intelligence;
            child.fitness = fitness;
            child.age = 0;
            child.alive = 1;

            data.children.push(child);

            //console.log(data.children)

            if (child.whoGaveBirth == 0) {
                data.years[data.age].events.push(`I gave birth to ${name}.`);
            } else {
                data.years[data.age].events.push(`${data.lover.name} gave birth to ${name}.`);
            }
        }
    }

    isFindLoveEnabled(data) {
        if (data.age < 12) return 1;
        else if (data.sexuality == "Asexual") return 1;
        else return 0;
    }

    handleHappiness(data, character, amount) {
        data.lastHappiness = data.happiness;
        if (character == "+") {
            if (data.happiness + amount > 100) data.happiness = 100;
            else data.happiness += amount;
        } else if (character == "-") {
            if ((data.happiness - amount) < 0) data.happiness = 0;
            else data.happiness -= amount;
        } else {
            if (data.happiness + amount > 100) data.happiness = 100;
            else if (data.happiness + amount < 0) data.happiness = 0;
            else if (data.age > 12) data.happiness += amount;
        }

        if (data.lastHappiness >= 20 && data.happiness < 20) {
            data.hasDepression = 1;
            data.years[data.age].events.push("I've been diagnosed with depression.");
        } else if (data.lastHappiness < 20 && data.happiness >= 20) {
            data.hasDepression = 0;
            data.years[data.age].events.push("I don't have depression anymore.");
        }
    }

    handleStability(data, character, amount) {
        if (character == "+") {
            if (data.lover.stability + amount > 100) data.lover.stability = 100;
            else data.lover.stability += amount;
        } else if (character == "-") {
            if ((data.lover.stability - amount) < 0) data.lover.stability = 0;
            else data.lover.stability -= amount;
        } else {
            if (data.lover.stability + amount > 100) data.lover.stability = 100;
            else if (data.lover.stability + amount < 0) data.lover.stability = 0;
            else if (data.age > 12) data.lover.stability += amount;
        }
    }

    joinSocialNetwork(data) {
        data.hasSocialNetwork = 1;
        data.numOfSocialFans = ((data.appearance * data.fitness + (data.happiness / 2)) / 50).toFixed(0);
        data.years[data.age].events.push(`I joined the social network.`);
    }

    leaveSocialNetwork(data) {
        data.hasSocialNetwork = 0;
        data.years[data.age].events.push(`I left the social network.`);
    }


    // If already went is 0, push event to log
    goToClub(data, alreadyWent) {
        data.update += 1;
        //console.log("You went to club.");
        let meetingChance = 35;
        let smokingChance = 15;
        let meetingExChance = 5; //90

        if (alreadyWent == 0) data.years[data.age].events.push(`I went to club.`);
        else alreadyWent = 0;

        if (this.randomAtoB(1, 100) <= meetingExChance && data.exPartners.length > 0) {
            let partner = data.exPartners[this.randomAtoB(0, data.exPartners.length - 1)];

            let text = `I run into my ex partner ${partner.name} ${partner.surname} at the club.`;
            data.years[data.age].events.push(text);
            let alert = this.alertCtrl.create({
                subTitle: '"It takes a long time to grow an old friend"',
                message: `You run into your ex partner ${partner.name} ${partner.surname} at the club.`,
                buttons: [{
                    text: 'Flirt',
                    handler: () => {
                        let chances = this.randomAtoB(0, 1);
                        let title = "Uh-oh!";
                        let text = "";
                        if (chances == 0) {
                            if (partner.whoBrokeUp == 0) {
                                let chances2 = this.randomAtoB(1, 5);

                                if (chances2 < 3) {
                                    let preposition = "";
                                    if (partner.gender == "male") preposition = "him";
                                    else preposition = "her";
                                    text = `${partner.name} doesn't want to forgive you for breaking up with ${preposition}.`;
                                } else {
                                    text = `${partner.name} doesn't want to talk to you.`;
                                }
                            } else {
                                text = `${partner.name} doesn't regret breaking up with you.`;
                            }

                            let alert = this.alertCtrl.create({
                                subTitle: title,
                                message: text,
                                buttons: [{
                                    text: 'Okay',
                                    handler: () => {

                                    }
                                }]
                            });
                            alert.present();
                        } else {
                            let preposition = "";
                            title = "Why, hello there!"
                            if (partner.gender == "male") preposition = "He";
                            else preposition = "She";
                            text = `${partner.name} smiles shyly.<br>${preposition} starts touching your hand.`;

                            let alert = this.alertCtrl.create({
                                subTitle: title,
                                message: text,
                                buttons: [{
                                    text: 'Date',
                                    handler: () => {
                                        this.forceDate(data, partner);
                                    }
                                }, {
                                    text: 'One night stand',
                                    handler: () => {
                                        let textToAdd = "";
                                        if (data.havePartner == 1) {
                                            //this.goForDate(data, tmpPerson);
                                            let chance = this.randomAtoB(0, 2);
                                            if (chance == 0) {
                                                let preposition = "";
                                                if (data.lover.gender == "male") preposition = "him";
                                                else preposition = "her";
                                                textToAdd = `<br>${data.lover.name} found out I cheated on ${preposition}.`;
                                                this.handleStability(data, "-", 100);
                                                let chance2 = this.randomAtoB(0, 1);

                                                if (chance2 == 0) {
                                                    let preposition2 = "";
                                                    if (preposition == "him") preposition2 = "He";
                                                    else preposition2 = "She";

                                                    if (data.lover.status == "Relationship") textToAdd += `<br>${preposition2} broke up with me.`;
                                                    else if (data.lover.status == "Engaged") textToAdd += `<br>${preposition2} broke off our engagement.`;
                                                    else if (data.lover.status == "Married") textToAdd += `<br>${preposition2} divorced me.`;

                                                    data.havePartner = 0;
                                                    this.handleHappiness(data, "-", 50);
                                                    data.lover = { stability: 50, time: 0 };
                                                }
                                            }

                                        }
                                        data.update += 1;
                                        data.years[data.age].events.push(`I had a one night stand.${textToAdd}`);
                                    }
                                }, {
                                    text: 'Leave',
                                    handler: () => {

                                    }
                                }]
                            });
                            alert.present();
                        }

                    }
                }, {
                    text: 'Assault',
                    handler: () => {
                        let preposition = "";
                        let preposition2 = "";
                        let preposition3 = "";
                        if (partner.gender == "male") {
                            preposition = "him";
                            preposition2 = "his";
                            preposition3 = "He";
                        } else {
                            preposition = "her";
                            preposition2 = "hers";
                            preposition3 = "She";
                        }

                        let adjectives = ["angrily", "frustrated", "jealously", "bitterly"];
                        let adjective = adjectives[this.randomAtoB(0, adjectives.length - 1)];

                        let adjectives2 = ["Suddenly", "All of a sudden", "Abruptly"]
                        let adjective2 = adjectives2[this.randomAtoB(0, adjectives2.length - 1)];

                        let things = ["glass", "table", "bottle"];
                        let thing = things[this.randomAtoB(0, things.length - 1)];

                        let actions = [`punched ${preposition}`, `threw a ${thing} at ${preposition}`, `jumped on ${preposition}`];
                        let action = actions[this.randomAtoB(0, actions.length - 1)];
                        let numOfInjuries = this.randomAtoB(0, 3);
                        let title = "A recipe for disaster";
                        let text = `I stared at ${preposition} ${adjective}.<br>${adjective2}, I started yelling at ${preposition}. People started turning around to see what's going on.<br>I ${action}.`;

                        if (numOfInjuries > 1) {
                            text += ` and attacked ${preposition}.`;
                        }


                        let injuries = [`broke ${preposition} nose`, `cracked ${preposition} skull`, `broke ${preposition} arm`, `broke ${preposition} leg`, `broke ${preposition} back`];
                        let injuryId = 0;
                        text += "<br>";
                        if (numOfInjuries == 0) {
                            text += `<br>${preposition3} got away without any injuries.`;
                        } else {
                            for (let i = 0; i < numOfInjuries; i++) {
                                injuryId = this.randomAtoB(0, injuries.length - 1);
                                text += `<br>I ${injuries[injuryId]}.`
                                injuries.splice(injuryId, 1);
                            }
                        }
                        let alert = this.alertCtrl.create({
                            title: title,
                            message: text,
                            buttons: [{
                                text: 'Okay',
                                handler: () => {

                                }
                            }]
                        });
                        alert.present();
                    }
                }, {
                    text: 'Ignore',
                    handler: () => {

                    }
                }]
            });
            alert.present();
        }

        if (this.randomAtoB(1, 100) < smokingChance) {
            let alert = this.alertCtrl.create({
                subTitle: 'How about that?',
                message: "Your friend offers you a cigarette.",
                buttons: [{
                    text: 'Smoke',
                    handler: () => {
                        if (data.smoking == 0) {
                            data.smoking = 1;
                            data.dontAnnounceSmoking = 1;
                            data.years[data.age].events.push("I started smoking.");
                        }

                        //this.smokingChanged(data);

                        //console.log("You smoked");
                    }
                }, {
                    text: 'Leave',
                    handler: () => {
                        //console.log("You didn't smoked");
                    }
                }]
            });
            alert.present();
        }

        if (this.randomAtoB(1, 100) < meetingChance && data.sexuality != "Asexual") {
            let tmpPerson = this.createLover(data);

            let meetingPlace = "", meetingAppearanceText = "";
            let places = ["at the bar", "on the dance floor", "in front of the club", "in the bathroom waiting line", "in a private booth"];
            meetingPlace = places[this.randomAtoB(0, places.length - 1)];

            if (data.appearance > tmpPerson["appearance"]) {
                meetingAppearanceText = (data.appearance - tmpPerson["appearance"]) + "% less than you";
            } else if (data.appearance < tmpPerson["appearance"]) {
                meetingAppearanceText = (tmpPerson["appearance"] - data.appearance) + "% more than you";
            } else {
                meetingAppearanceText = "same as you";
            }

            let meetingText = `You met ${tmpPerson["name"]} ${tmpPerson["surname"]} ${meetingPlace}. <br> ${tmpPerson["name"]} has appearance ${meetingAppearanceText}.`;

            let alert = this.alertCtrl.create({
                subTitle: `Hi! I’m ${data.name}. And you?`,
                message: meetingText,
                buttons: [{
                    text: 'Flirt',
                    handler: () => {
                        let likingChances = this.randomAtoB(1, 5);

                        let randomHobby = this.randomAtoB(0, data.likingHobbies.length - 1);
                        let subtitle = "Uh-oh!";
                        if (data.likingHobbies[randomHobby] == "shoes") subtitle = "What are thooose?!";

                        let preposition = "";
                        if (tmpPerson["gender"] == "male") preposition = "He";
                        else preposition = "She";

                        if (likingChances < 3) {
                            //alert.dismiss();
                            let rejectionAction = data.rejections[this.randomAtoB(0, data.rejections.length - 1)];
                            let rejectingText = `${tmpPerson["name"]} disliked your ${data.likingHobbies[randomHobby]}. <br> ${preposition} ${rejectionAction}.`;
                            // This opens when parner doesn't like you
                            let alert0 = this.alertCtrl.create({
                                subTitle: subtitle,
                                message: rejectingText,
                                buttons: [{
                                    text: 'Okay',
                                    handler: () => {

                                    }
                                }]
                            });
                            alert0.present();
                        } else {
                            let acceptionAction = data.acceptions[this.randomAtoB(0, data.acceptions.length - 1)];
                            let acceptingText = `${tmpPerson["name"]} liked your ${data.likingHobbies[randomHobby]}. <br> ${preposition} ${acceptionAction}.`;
                            // This opens when parner doesn't like you
                            let alert1 = this.alertCtrl.create({
                                subTitle: 'How does that sound?',
                                message: acceptingText,
                                buttons: [{
                                    text: 'Date',
                                    handler: () => {
                                        this.forceDate(data, tmpPerson);
                                    }
                                }, {
                                    text: 'One night stand',
                                    handler: () => {
                                        let textToAdd = "";
                                        if (data.havePartner == 1) {
                                            //this.goForDate(data, tmpPerson);
                                            let chance = this.randomAtoB(0, 2);
                                            if (chance == 0) {
                                                let preposition = "";
                                                if (data.lover.gender == "male") preposition = "him";
                                                else preposition = "her";
                                                textToAdd = `<br>${data.lover.name} found out I cheated on ${preposition}.`;
                                                this.handleStability(data, "-", 100);
                                                let chance2 = this.randomAtoB(0, 1);

                                                if (chance2 == 0) {
                                                    let preposition2 = "";
                                                    if (preposition == "him") preposition2 = "He";
                                                    else preposition2 = "She";

                                                    if (data.lover.status == "Relationship") textToAdd += `<br>${preposition2} broke up with me.`;
                                                    else if (data.lover.status == "Engaged") textToAdd += `<br>${preposition2} broke off our engagement.`;
                                                    else if (data.lover.status == "Married") textToAdd += `<br>${preposition2} divorced me.`;

                                                    data.havePartner = 0;
                                                    this.handleHappiness(data, "-", 50);
                                                    data.lover = { stability: 50, time: 0 };
                                                }
                                            }

                                        }
                                        data.years[data.age].events.push(`I had a one night stand.${textToAdd}`);
                                    }
                                }, {
                                    text: 'Ignore',
                                    handler: () => {

                                    }
                                }]
                            });
                            alert1.present();
                        }


                    }
                }, {
                    text: 'Ignore',
                    handler: () => {

                    }
                }]
            });
            alert.present();

        }
        //document.getElementById("tab-t0-0").click();
        //this.data.navCtrl.push(TabsPage, {tabIndex:0}); 
        //let nav = this.app.getRootNav();
        // there is also this.app.getRootNav()

        //nav.push(HomePage);
        //TabsPage.homeButtonTab.nativeElement.click();
        //this.goToHomePage();
        // etc
    }

    goToHomePage() {
        document.getElementById("tab-t0-0").click();
    }

    carsForSale(data) {
        let car, cars = [];
        for (let i = 0; i < 25; i++) {
            car = this.createVehicle(data);
            cars.push(car);
        }

        this.carsForSaleModal(data, cars);
    }

    propertyListings(data) {
        var property, posjedi = [];
        for (var i = 0; i < 15; i++) {
            property = this.createRealEstate();
            posjedi.push(property);
        }

        //console.log(posjedi)
        this.propertyListingModal(data, posjedi);
    }

    goForDate(data, lover) {
        let chances = 50;
        if ((lover.appearance - data.appearance) > 50) chances -= 30;
        if (data.appearance > 80) chances += 20;
        if (data.appearance > 70 && data.appearance <= 80) chances += 10;
        if (data.intelligence > 70) chances += 10;
        if (data.age > 25 && data.age < 50 && data.posjedi.length == 0) chances -= 40;

        let doTheyLikeMe = this.randomAtoB(1, 100) <= chances;

        if (doTheyLikeMe) {
            //console.log(lover);
            let alert = this.alertCtrl.create({
                title: "You are in relationship!",
                subTitle: `You are now dating ${lover.name} ${lover.surname}!`,
                buttons: ["Okay"]
            });
            data.havePartner = 1;
            data.lover = lover;
            data.lover["status"] = "Relationship";
            data.lover["stability"] = 50;
            data.years[data.age].events.push(`I'm dating ${lover.name} ${lover.surname}.`);
            alert.present();
        } else {

            let randomHobby = 0;
            let subtitle = "Uh-oh!";
            let rejectingText = "";
            if (data.age > 25 && data.age < 50 && data.posjedi.length == 0) {
                if (this.randomAtoB(0, 3) == 0) {
                    randomHobby = this.randomAtoB(0, data.likingHobbies.length - 1);
                    if (data.likingHobbies[randomHobby] == "shoes") subtitle = "What are thooose?!";

                    let rejectionAction = data.rejections[this.randomAtoB(0, data.rejections.length - 1)];
                    let preposition = "";
                    if (lover["gender"] == "male") preposition = "He";
                    else preposition = "She";
                    rejectingText = `${lover["name"]} disliked your ${data.likingHobbies[randomHobby]}. <br> ${preposition} ${rejectionAction}.`;
                } else {
                    let rejectionAction = data.rejections[this.randomAtoB(0, data.rejections.length - 1)];
                    let preposition = "";
                    if (lover["gender"] == "male") preposition = "He";
                    else preposition = "She";
                    rejectingText = `${lover["name"]} doesn't want to date you because you're still living with your parents. <br> ${preposition} ${rejectionAction}.`;
                }
            } else {
                randomHobby = this.randomAtoB(0, data.likingHobbies.length - 1);
                if (data.likingHobbies[randomHobby] == "shoes") subtitle = "What are thooose?!";

                let rejectionAction = data.rejections[this.randomAtoB(0, data.rejections.length - 1)];
                let preposition = "";
                if (lover["gender"] == "male") preposition = "He";
                else preposition = "She";
                rejectingText = `${lover["name"]} disliked your ${data.likingHobbies[randomHobby]}. <br> ${preposition} ${rejectionAction}.`;
            }

            // This opens when parner doesn't like you
            let alert = this.alertCtrl.create({
                subTitle: subtitle,
                message: rejectingText,
                buttons: ["Okay"]
            });
            alert.present();


        }

    }

    forceDate(data, lover) {
        //console.log(lover);

        if (data.havePartner == 1) {
            this.breakUp(data);
        }

        let alert = this.alertCtrl.create({
            title: "You are in relationship!",
            subTitle: `You are now dating ${lover.name} ${lover.surname}!`,
            buttons: ["Okay"]
        });
        data.havePartner = 1;
        data.lover = lover;
        data.lover["status"] = "Relationship";
        data.lover["stability"] = 50;
        data.years[data.age].events.push(`I'm dating ${lover.name} ${lover.surname}.`);
        alert.present();
    }

    breakUp(data) {
        data.havePartner = 0;
        let text = "";
        if (data.lover.status == "Relationship") text = `I broke up with ${data.lover.name}.`;
        else if (data.lover.status == "Engaged") text = `I broke off my engagement with ${data.lover.name}.`;
        else if (data.lover.status == "Married") text = `I divorced ${data.lover.name}.`;
        data.years[data.age].events.push(text);
        this.handleHappiness(data, "-", 20);
        data.lover.whoBrokeUp = 0;
        data.exPartners.push(data.lover);
        data.lover = { stability: 50, time: 0 };

    }

    breakUp2(data) {
        data.havePartner = 0;
        let text = "";
        if (data.lover.status == "Relationship") text = `${data.lover.name} broke up with me.`;
        else if (data.lover.status == "Engaged") text = `${data.lover.name} broke off our engagement.`;
        else if (data.lover.status == "Married") text = `${data.lover.name} divorced me.`;
        data.years[data.age].events.push(text);
        this.handleHappiness(data, "-", 50);
        data.lover.whoBrokeUp = 1;
        data.exPartners.push(data.lover);
        data.lover = { stability: 50, time: 0 };

        //console.log(data.exPartners);
    }

    moveTo(data, property) {
        //console.log(property);
        let valueIndex = 0;
        if (property[0] == "House") valueIndex = 5;
        else if (property[0] == "Apartment" || property[0] == "Condo") valueIndex = 4;

        if (data.livingIn != property[valueIndex]) {
            data.livingIn = property[valueIndex];
            data.years[data.age].events.push(`I moved in to my ${property[0].toLowerCase()}.`);
        }
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

    propose(data) {
        let chance = 0;
        if (data.age < 15) {
            chance = 2;
        } else {
            if (data.lover.stability > 95) {
                chance = 100;
            } else if (data.lover.stability > 90) {
                chance = 90;
            } else if (data.lover.stability > 75) {
                chance = 70;
            } else if (data.lover.stability > 60) {
                chance = 50;
            } else if (data.lover.stability > 50) {
                chance = 40;
            } else if (data.lover.stability > 40) {
                chance = 30;
            } else {
                chance = 2;
            }
        }

        let accept = this.randomAtoB(1, 100) <= chance;

        if (accept == true) {
            //engaged
            data.lover.status = "Engaged";
            data.years[data.age].events.push(`I proposed to ${data.lover.name}.<br>${data.lover.name} accepted my marriage proposal.`);
            let alert = this.alertCtrl.create({
                title: `Soulmates`,
                subTitle: `${data.lover.name} accepted my marriage proposal!`,
                buttons: [{
                    text: 'Okay',
                    handler: () => {

                    }
                }]
            });
            alert.present();
        } else {
            data.years[data.age].events.push(`I proposed to ${data.lover.name}.<br>${data.lover.name} rejected my marriage proposal.`);
            let alert = this.alertCtrl.create({
                title: `Maybe next time...`,
                subTitle: `${data.lover.name} rejected my marriage proposal!`,
                buttons: [{
                    text: 'Okay',
                    handler: () => {

                    }
                }]
            });
            alert.present();
        }
        //console.log(accept);

    }

    getMarried(data, price, honeymoon) {
        //console.log("Yey, we married babe, for the $" + price);
        if (data.finance < price) {
            let alert = this.alertCtrl.create({
                title: `Bad news!`,
                subTitle: `You can't afford to pay for wedding. Pick cheaper option.`,
                buttons: [{
                    text: 'Okay',
                    handler: () => {

                    }
                }]
            });
            alert.present();
        } else {
            data.weddingModal.dismiss();
            data.finance -= price;
            data.years[data.age].events.push(`I married ${data.lover.name}.<br>We went to ${honeymoon} for our honeymoon.`);
            data.lover.status = "Married";
            this.handleHappiness(data, "+", this.randomAtoB(5, 20));
            let alert = this.alertCtrl.create({
                title: `Congratulations!`,
                subTitle: `You married ${data.lover.name}.`,
                buttons: [{
                    text: 'Okay',
                    handler: () => {
                        //data.changeTabTrue = 1;
                        this.events.publish("goToHome");
                    }
                }]
            });
            alert.present();

            if (data.lover.gender == "female") {
                data.lover.surname = data.surname;
            } else if (data.gender == "F") {
                let lastNameAlert = this.alertCtrl.create({
                    subTitle: `Do you want to take your husband's surname?`,
                    buttons: [{
                        text: 'Take',
                        handler: () => {
                            data.surname = data.lover.surname;
                            data.years[data.age].events.push(`I changed my surname to ${data.surname}.`);
                        }
                    }, {
                        text: 'Leave',
                        role: 'cancel',
                        handler: () => {

                        }
                    }]
                });
                lastNameAlert.present();
            }
        }
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

    disableAll(data) {

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

            jobs["jobs"][jobNum]["skillsRender"] = "";
            for (let u in jobs["jobs"][jobNum]["skills"]) {
                //&& u != (jobs["jobs"][jobNum]["skills"].length - 1).toString()
                if (u != "0") jobs["jobs"][jobNum]["skillsRender"] += (", " + jobs["jobs"][jobNum]["skills"][u]);
                else jobs["jobs"][jobNum]["skillsRender"] += (jobs["jobs"][jobNum]["skills"][u]);
            }

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
        //console.log(job);
        if (job[1]["education"] <= data.educationLevel && data.workExperience >= job[1]["experience"]) {
            var remainingSkills = job[1]["skills"].filter(item => data.mySkills.indexOf(item) < 0);
            if (remainingSkills.length == 0) {
                let subtitleText = '';
                //console.log(job[1]["title"]);
                if (data.jobsWithoutLabel.indexOf(job[1]["title"]) == -1) {
                    subtitleText = '<br>You got job as ' + job[1]["title"] + ' at ' + job[0] + '.';
                } else {
                    subtitleText = '<br>You got job as ' + job[1]["title"] + '.';
                }
                let alert = this.alertCtrl.create({
                    title: 'Congratulations!',
                    subTitle: subtitleText,
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
                            // If job title is not Nurse of Doctor you can show where they work
                            //else don't show at which company they work for
                            if (data.jobsWithoutLabel.indexOf(job[1]["title"]) == -1) data.years[data.age].events.push("I started working as " + job[1]["title"] + " at " + job[0] + ".");
                            else data.years[data.age].events.push("I started working as " + job[1]["title"] + ".");
                            data.income += (job[2] / 12 * 1000) * (1 - data.tax);
                        }
                    }]
                });
                alert.present();
            } else {
                let alert = this.alertCtrl.create({
                    title: 'Bad news...',
                    subTitle: '<br>You didn\'t get the job because you don\'t have enough qualifications or work experience.',
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

    capitalize(data, string) {
        return data.shareService.capitalize(string);
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
@Component({
    templateUrl: '../../pages/me/vehicleListing.html'
})
export class carsForSaleModal {
    data: object;
    cars: object;
    constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController) {
        this.cars = params.get("cars");
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

@Component({
    templateUrl: '../../pages/me/socialNetwork.html'
})
export class socialNetworkModal {
    data: object;
    constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController) {
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

@Component({
    templateUrl: '../../pages/me/child.html'
})
export class childModal {
    data: object;
    child: object;
    childName;
    constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController) {
        this.data = shareService.getData();
        this.child = params.get("child");
        //console.log(this.child);
        //console.log();
    }

    randomName(data) {
        this.childName = data.shareService.randomName(data, this.child["gender"]);
    }

    backButtonAction() {
        this.viewCtrl.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

@Component({
    templateUrl: '../../pages/me/mortgage.html'
})
export class mortgageModal {
    data: object;
    property: object;
    deposit = 0;
    repaymentTerm = 5;
    interestRate = 0;

    constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController) {
        this.data = shareService.getData();
        this.property = params.get("property");
        this.interestRate = params.get("interestRate");

        this.deposit = parseInt((this.property[this.data["propertyValueIndex"]] / 10).toFixed(2));
        //console.log();
    }

    monthlyPayment(data, property) {
        let ostalo = property[data.propertyValueIndex] - this.deposit;
        let perYear = ostalo / this.repaymentTerm;
        let perMonth = (perYear / 12 + perYear / 12 / 100 * this.interestRate).toFixed(2);

        return perMonth;
    }

    backButtonAction() {
        this.viewCtrl.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

@Component({
    templateUrl: '../../pages/me/holidayModal.html'
})
export class holidayModal {
    data: object;
    travelTo;
    hotelStars;
    travelClass;
    invitePartner;
    varijacija;
    vacation: object;
    constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController) {
        this.data = shareService.getData();

        this.travelTo = this.data["countries"]["countries"][this.randomAtoB(0, this.data["countries"]["countries"].length - 1)];
        this.hotelStars = 1;
        this.travelClass = "Economy Class";
        this.invitePartner = false;
        this.varijacija = this.randomAtoB(80, 120);
        this.vacation = {};
        //console.log();
    }

    travelPrice() {
        let osnovica = 500;
        osnovica = osnovica * (this.hotelStars / 2) * Math.sqrt(2);

        if (this.travelClass == "Economy Class") osnovica += osnovica / 10;
        else if (this.travelClass == "Business Class") osnovica += osnovica / 8;
        else if (this.travelClass == "First Class") osnovica += osnovica / 5;
        else if (this.travelClass == "Train") osnovica += osnovica / 8;
        else if (this.travelClass == "Cruise") osnovica += osnovica / 4;

        if (this.invitePartner == true) {
            osnovica = osnovica * Math.sqrt(3);
        }
        this.vacation["travelClass"] = this.travelClass;
        this.vacation["hotelStars"] = this.hotelStars;
        this.vacation["invitePartner"] = this.invitePartner;
        this.vacation["travelTo"] = this.travelTo;
        this.vacation["price"] = (osnovica * this.varijacija / 100).toFixed(2);
        return (osnovica * this.varijacija / 100).toFixed(2);
    }

    randomAtoB(A, B) {
        return Math.floor(Math.random() * (B - A + 1) + A);
    }

    backButtonAction() {
        this.viewCtrl.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

@Component({
    templateUrl: '../../pages/me/wedding.html'
})
export class weddingModal {
    data: object;
    travelTo;
    hotelStars;
    travelClass;
    varijacija;
    varijacija2;
    vacation: object;
    band = 0;
    caterer = 0;
    florist = 0;
    photographer = 0;
    constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController) {
        this.data = shareService.getData();

        this.travelTo = this.data["countries"]["countries"][this.randomAtoB(0, this.data["countries"]["countries"].length - 1)];
        this.hotelStars = 1;
        this.travelClass = "Economy Class";

        this.varijacija = this.randomAtoB(80, 120);
        this.varijacija2 = this.randomAtoB(1000, 3000);
        this.vacation = {};
        //console.log();
    }

    weddingPrice() {
        let osnovica = 2000;
        osnovica = osnovica * (this.hotelStars / 2) * Math.sqrt(2);

        if (this.travelClass == "Economy Class") osnovica += osnovica / 10;
        else if (this.travelClass == "Business Class") osnovica += osnovica / 8;
        else if (this.travelClass == "First Class") osnovica += osnovica / 5;
        else if (this.travelClass == "Train") osnovica += osnovica / 8;
        else if (this.travelClass == "Cruise") osnovica += osnovica / 4;

        this.vacation["travelClass"] = this.travelClass;
        this.vacation["hotelStars"] = this.hotelStars;
        this.vacation["travelTo"] = this.travelTo;
        this.vacation["price"] = (osnovica * this.varijacija / 100).toFixed(2);

        if (this.band == 1) osnovica += this.varijacija2;
        if (this.photographer == 1) osnovica += this.varijacija2;
        if (this.caterer == 1) osnovica += this.varijacija2;
        if (this.florist == 1) osnovica += this.varijacija2;
        return (osnovica * this.varijacija / 100).toFixed(2);
    }

    randomAtoB(A, B) {
        return Math.floor(Math.random() * (B - A + 1) + A);
    }

    backButtonAction() {
        this.viewCtrl.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}