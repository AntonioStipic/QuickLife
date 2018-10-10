import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController, App } from 'ionic-angular';
import { ModalController, NavParams, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { GooglePlayGamesServices } from '@ionic-native/google-play-games-services';
import { AppVersion } from '@ionic-native/app-version';
//import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';

@Injectable()
export class ShareService {

    data: object;
    names: object;
    cars: object;
    bands;
    albums;
    lifeId;
    //, private firebaseAnalytics: FirebaseAnalytics
    constructor(public app: App, public alertCtrl: AlertController, public modalCtrl: ModalController, public events: Events, private http: Http, private storage: Storage, private toastCtrl: ToastController, private googlePlayGamesServices: GooglePlayGamesServices) {
        this.data = {};
        console.log(storage);
        this.http.get("assets/resources/bands.json")
            .subscribe(res => {
                this.bands = res.json();
                //this.bands = Array.of(this.bands);
                this.bands = this.bands.bands;
                //console.log(this.bands[this.randomAtoB(0, this.bands.length - 1)]);
                //console.log(this.names);
                //this.data = this.data["shareService"].createMe(this.data, this.names);
            }, error => {
                console.log(error);
            });

        this.http.get("assets/resources/albums.json")
            .subscribe(res => {
                this.albums = res.json();
                //this.albums = Array.of(this.albums);
                this.albums = this.albums.albums;
                //console.log(this.bands[this.randomAtoB(0, this.bands.length - 1)]);
                //console.log(this.names);
                //this.data = this.data["shareService"].createMe(this.data, this.names);
            }, error => {
                console.log(error);
            });


        storage.get("achievements").then((val) => {
            console.log('Achievements', val);

            let currectVersion = "0.2.1.";
            
            storage.get("appVersion").then((appVersionStorage) => {
                let resetAchievement = 0;
                if (val == null || resetAchievement == 1 || currectVersion != appVersionStorage) {
                    storage.set("appVersion", currectVersion);
                    storage.set("achievements", [
                        { id: "Internet celebrity", title: "Internet celebrity", description: "Gain more than 1,000,000 followers on social network", finished: false },
                        { id: "Aced it!", title: "Aced it!", description: "Finish elementary school with grade A", finished: false },
                        { id: "Our little genius", title: "Our little genius", description: "Finish elementary school with grade A+", finished: false },
                        { id: "Little Einstein", title: "Little Einstein", description: "Finish high school with grade A+", finished: false },
                        { id: "Academic", title: "Academic", description: "Finish college", finished: false },
                        { id: "Centenarian", title: "Centenarian", description: "Live to a hundred years", finished: false },
                        { id: "Henry VIII", title: "Henry VIII", description: "Have six spouses in one life", finished: false },
                        { id: "Druggie", title: "Druggie", description: "Take a drug", finished: false },
                        { id: "BFF", title: "BFF", description: "Have 100% friendship", finished: false },
                        { id: "Elvis has left the building", title: "Elvis has left the building", description: "Sell more than 1,000,000 albums", finished: false },
                        { id: "Casanova", title: "Casanova", description: "Have at least 15 one night stands in one life", finished: false },
                        { id: "Niki Lauda", title: "Niki Lauda", description: "Pass driving test from the first time", finished: false },
                        { id: "No Protection?", title: "No Protection?", description: "Contract HIV", finished: false },
                        { id: "Spongebob style", title: "Spongebob style", description: "Fail driving test at least 5 times", finished: false },
                        { id: "Garage band", title: "Garage band", description: "Form a band", finished: false },
                        { id: "Socialization", title: "Socialization", description: "Join a social network", finished: false },
                        { id: "Superhuman", title: "Superhuman", description: "Have 100% in every stat", finished: false }

                    ]);
                    storage.get("achievements").then((val2) => {
                        this.data["achievements"] = val2;
                    });
                } else {
                    this.data["achievements"] = val;
                }
            });
        });
    }

    checkAchievement(id) {
        if (this.data["achievements"][this.findAchievement(id)].finished == false) {
            this.data["achievements"][this.findAchievement(id)].finished = true;
            //storage.set("achievements", 
            this.finishedAchievement(id);
            console.log("Finished achievement:", id);
        }
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
        let id = this.randomId(8);
        //console.log(brand + " - " + car["title"], carPrice);

        //return [brand, car["title"], color, carPrice, id];
        return { brand: brand, model: car["title"], color: color, price: carPrice, id: id, age: 0, value: carPrice * 0.85 };
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

    findAchievement(id) {
        let result = 0;
        for (let i = 0; i < this.data["achievements"].length; i++) {
            if (this.data["achievements"][i]["id"] == id) {
                result = i;
                continue;
            }
        }
        return result;
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

    commitSuicideModal(data) {
        data.commitSuicideModal = this.modalCtrl.create(commitSuicideModal, { data: data }, {
            showBackdrop: false,
            enableBackdropDismiss: true,
            /* enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave' */
        });
        data.commitSuicideModal.present();
    }

    carsForSaleModal(data, cars) {
        data.vehicleModal = this.modalCtrl.create(carsForSaleModal, { data: data, cars: cars }, {
            showBackdrop: false,
            enableBackdropDismiss: true,
            /* enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave' */
        });
        data.vehicleModal.present();
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

    finishedAchievement(id) {
        let toast = this.toastCtrl.create({
            message: `<div class="toastText">"${id}" unlocked! <img class="toastImg" src="assets/imgs/circle-loader.svg"></div>`,
            duration: 5000,
            position: "top",
            cssClass: "toast"
        });

        toast.present();

        this.storage.set("achievements", this.data["achievements"]);
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

    goToHospital(data) {
        // ["chlamydia", "gonorrhea", "hepatitis B", "genital herpes", "HIV", "syphilis", "trichomoniasis"];

        let textToAdd = ``;
        if (data.diseases.length == 0) {
            textToAdd += "I'm healthy.";
        }
        for (let i = 0; i < data.diseases.length; i++) {
            console.log(data.diseases[i]);
            let chance = 0;
            if (data.curableStd.indexOf(data.diseases[i]) > -1) {
                chance = 35;
            }

            let recoverChance = this.randomAtoB(1, 100);

            if (recoverChance < chance) {
                textToAdd += `I have been cured from ${data.diseases[i]}.<br>`;
                data.diseases.splice(i, 1);
            } else {
                textToAdd += `Doctors couldn't cure my ${data.diseases[i]}.<br>`;
            }

        }

        this.events.publish("goToHome");
        data.years[data.age].events.push(`I went to Hospital.<br>${textToAdd}`);
        this.update(data);
    }

    musicModal(data) {
        data.musicModal = this.modalCtrl.create(musicModal, { data: data }, {
            showBackdrop: false,
            enableBackdropDismiss: true,
            /* enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave' */
        });
        data.musicModal.present();
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

    myChildModal(data, child) {
        data.myChildModal = this.modalCtrl.create(myChildModal, { data: data, child: child }, {
            showBackdrop: false,
            enableBackdropDismiss: true,
            /* enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave' */
        });
        data.myChildModal.present();
    }

    myFriendModal(data, friend) {
        data.myFriendModal = this.modalCtrl.create(myFriendModal, { data: data, friend: friend }, {
            showBackdrop: false,
            enableBackdropDismiss: true,
        });
        data.myFriendModal.present();
    }

    carInfoModal(data, car) {
        data.carInfoModal = this.modalCtrl.create(carInfoModal, { data: data, car: car }, {
            showBackdrop: false,
            enableBackdropDismiss: true,
            /* enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave' */
        });
        data.carInfoModal.present();
    }

    bandNameModal(data) {
        data.bandNameModal = this.modalCtrl.create(bandNameModal, { data: data }, {
            showBackdrop: false,
            enableBackdropDismiss: true,
            /* enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave' */
        });
        data.bandNameModal.present();
    }

    createAlbumModal(data) {
        data.createAlbumModal = this.modalCtrl.create(createAlbumModal, { data: data }, {
            showBackdrop: false,
            enableBackdropDismiss: true,
            /* enterAnimation: 'modal-scale-up-enter',
            leaveAnimation: 'modal-scale-up-leave' */
        });
        data.createAlbumModal.present();
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
            data.homeless = 0;
            data.homelessFor = 0;
            this.calculateNetWorth(data);
            data.propertyModal.dismiss();

            let textToAdd = "";

            if (data.posjedi.length == 1) {
                data.livingIn = property[data.propertyValueIndex + 1];

                if (data.homeless == 0) {
                    textToAdd = " and moved out of my parent's house";
                }
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
        data.finance -= car["price"];
        data.cars.push(car);
        this.calculateNetWorth(data);
        data.years[data.age].events.push(`I bought a car.`);
        data.vehicleModal.dismiss();
        let preposition = "";
        if (car["model"][0].toLowerCase() == "a" ||
            car["model"][0].toLowerCase() == "e" ||
            car["model"][0].toLowerCase() == "i" ||
            car["model"][0].toLowerCase() == "o" ||
            car["model"][0].toLowerCase() == "u") {
            preposition = "an";
        } else {
            preposition = "a";
        }
        let alert = this.alertCtrl.create({
            title: "Good deal!",
            subTitle: `You bought ${preposition} ${car["brand"]} for $${this.formatMoney(car["price"])}!`,
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

    sellVehicle(data, car) {
        let id = car["id"];

        for (let i in data.cars) {
            if (data.cars[i]["id"] == id) {
                data.cars.splice(i, 1);
                data.carInfoModal.dismiss();
                data.finance += car["value"];
                data.shareService.calculateNetWorth(data);
                data.years[data.age].events.push(`I sold my car for $${this.formatMoney(car["value"])}.`);
                this.events.publish("goToHome");
                continue;
            }
        }
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
                            this.calculateNetWorth(data);
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
                                    this.calculateNetWorth(data);
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
                                        this.calculateNetWorth(data);
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
        if (this.verifyLifeId(data, "learningChanged")) {
            return;
        }

        if (data.isLearning == 1) {
            data.years[data.age].events.push("I started learning.");
        } else {
            data.years[data.age].events.push("I stopped learning.");
        }
    }

    changeThisLifeId(data) {
        this.lifeId = data.lifeId;
    }

    verifyLifeId(data, func) {
        if (data.lifeId != this.lifeId) {
            data.changeThisLifeIdNextYear = 1;
            data.alreadyVerified[func] += 1;
            if (data.alreadyVerified[func] > 1) {
                return false;
            } else {
                return true;
            }
        } else return false;
    }

    readingChanged(data) {
        if (this.verifyLifeId(data, "readingChanged")) {
            return;
        }

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
        if (this.verifyLifeId(data, "gymChanged")) {
            return;
        }
        if (data.goingToGym == 1) {
            data.years[data.age].events.push("I started going to gym.");
            data.outcome += (50);
        } else {
            data.years[data.age].events.push("I stopped going to gym.");
            data.outcome -= (50);
        }
    }

    smokingChanged(data) {

        if (this.verifyLifeId(data, "smokingChanged")) {
            return;
        }

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

        if (this.verifyLifeId(data, "instrumentsChanged")) return;
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
        if (this.verifyLifeId(data, "sportsChanged")) return;
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
        data.listOfColleges.splice(-1, 1);
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
        let majors = data.majors;
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
                //console.log(selectedMajor);
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

    createMe(data, names, lifeId, obituary, force) {

        this.googlePlayLogin2();

        //this.firebaseAnalytics.logEvent("New Life", {})


        /* window.plugins.FirebasePlugin.getToken(function(token) {
            // save this server-side and use it to push notifications to this device
            console.log(token);
        }, function(error) {
            console.error(error);
        }); */

        if (lifeId != "") {
            this.lifeId = lifeId;
            data.lifeId = lifeId;
        } else {
            data.lifeId = this.randomId(8);
        }

        if (names != "") {
            this.names = names;
            data.manualNewLife = 1;
        }
        if (data.customLife == 1) {
            data.name = data.customLifeInfo.name;
            data.surname = data.customLifeInfo.surname;
            data.genderFull = data.customLifeInfo.gender;
            data.nationality = data.customLifeInfo.nationality;

            data.city = this.randomCity(data, data.nationality);

            if (data.genderFull == "male") data.gender = "M";
            else data.gender = "F";

            force = "force";
        } else {
            data.nationality = this.data["countries"]["nationalities"][this.randomAtoB(0, this.data["countries"]["nationalities"].length - 1)];
            // console.log(data.nationality)
            data.gender = this.randomGender(data);
            data.name = this.randomName(data, data.genderFull, data.nationality);

            data.surname = this.randomSurname(data, data.nationality);

            data.city = this.randomCity(data, data.nationality);
        }

        if (data.genderFull == "male") data.hisOrHers = "His";
        else data.hisOrHers = "Her";
        /* if (data.gender == "M") {
          
          //console.log(this.names["male"]);
        } */

        data.customLife = 0;

        data.age = 0;

        /* data.lifeId = this.randomId(8);
        this.lifeId = data.lifeId; */


        // Boolean of life and death
        data.alive = 1;
        //data.name = "Antonio";
        //data.surname = "Stipić";
        //data.nationality = "Croatian";
        data.appearance = this.random1to100();
        data.intelligence = this.random1to100();
        //data.intelligence = 100;
        data.sociability = this.random1to100();
        data.fitness = this.randomAtoB(1, 100);
        data.musicality = this.randomAtoB(1, 100);

        // Happiness player has at the beggining of game
        data.happiness = this.randomAtoB(50, 100);

        // Balance player has at the beggining of game
        data.finance = 100;
        //data.finance = 10000000;
        //data.finance = 150000;

        // Number of years left to paid of mortgage
        data.repaymentTerm = 0;

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

        // Amount of money player gets per month from parents
        data.allowance = 0;

        // For every year of work this counts up
        data.workExperience = 0;

        // Net worth of player
        data.netWorth = 0;

        // List of jobs that don't need to specify where are you working at
        data.jobsWithoutLabel = ["Doctor", "Nurse", "Police Officer", "Mathematics Professor", "Chemistry Professor", "Biology Professor", "Sociology Professor", "Physics Professor"];

        // Available colleges
        data.majors = this.shuffle([{
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
        ]);

        // List containing cars that player has
        data.cars = [];

        // List of player's friends
        data.friends = [];

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

        data.deathCause = "";

        // List of diseases player has
        data.diseases = [];

        // At this age player will be asked if it wanted to go to retirement
        data.retirementAge = this.randomAtoB(62, 69);

        // If in retirement, boolean
        data.inRetirement = 0;

        // Pension income
        data.pension = 0;

        // Boolean to check is player in prison or not
        data.inPrison = 0;

        // Years left to serve in prison
        data.prisonYears = 0;

        // How many years player served in prison
        data.yearsServed = 0;

        // Number of crimes player commited that got him to prison
        data.numOfCrimes = 0;

        // Change this to scrollToBottom
        data.update = 0;

        // List of finished courses at college
        data.mySkills = [];

        // Empty job object
        data.myJob = ["", { "title": "", "salary": "", "experience": 0, "education": 0, "skills": [] }, ""];

        // List with previous jobs player had worked
        data.jobHistory = [];

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

        // List of possible STD diseases
        data.possibleStdDiseases = ["chlamydia", "gonorrhea", "hepatitis B", "genital herpes", "HIV", "syphilis", "trichomoniasis"];

        // List of Curable STDs
        data.curableStd = ["chlamydia", "gonorrhea", "syphilis", "trichomoniasis"];

        // Things friend may say when he doesn't want to play
        data.friendRejection = ["is busy", "is tired", "doesn't want to go", "is not answering your call"];

        // Boolean indicators for passing elementary and high school
        data.passed = { "elementary": 0, "highschool": 0 };

        // Boolan is player currently learning
        data.isLearning = 0;

        // Number of One Night Stands player had
        data.numOfOneNightStands = 0;

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

        // Number of albums recorder per year
        data.numOfAlbums = 0;

        // Number of posts player has created
        data.numOfPosts = 0;

        // Indicator if player has patner/is in relationship
        data.havePartner = 0;

        // Inficator to tell if player is pregnant
        data.isPregnant = 0;

        // Number of times player has married and divorced
        data.numberOfExSpouses = 0;

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

        // Check if it has already been called verifyLife in this life
        data.alreadyVerified = { learningChanged: 0, gymChanged: 0, readingChanged: 0, instrumentsChanged: 0, smokingChanged: 0, sportsChanged: 0 };

        // Reset mortgage
        data.monthlyPayment = 0;

        // If true, don't ask but wait for player to choose college and then ask him for driving test
        data.dontAskForDrivingTestOn18 = 0;

        // ID of property in which the player is living
        data.livingIn = "";

        // Boolean to check if player is homeless
        data.homeless = 0;

        // How many years was player homeless
        data.homelessFor = 0;

        // Text to show under properties
        data.livingText = "You're living with your parents.";

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

        // Reseting bands
        data.selectedBandObject = undefined;
        data.selectedBand = undefined;

        // Boolean to indicate if player is famous
        data.isFamous = 0;

        // If this is true, next year will this.lifeId become same as data.lifeId
        data.changeThisLifeIdNextYear = 0;

        // List of bands in which the player is
        //data.bands = [{ name: "123", members: 3, fans: 0, id: "1234567" }]; //, {name: "Test", members: 2, id: "1234566"}
        data.bands = [];

        data.father = this.createParent(data, "male");
        data.mother = this.createParent(data, "female");

        // Current tab choosen in view "Me" under "Assets"
        data.meAssets = "House";

        // Last band that has been opened (contains band object)
        data.lastChoosenBand;

        data.genres = this.shuffle(["Rock", "Classical", "Jazz", "Heavy Metal", "Dance", "Hip-hop", "R&B", "Funk", "Country", "Thrash Metal", "Punk Rock", "Grunge", "Reggae", "Blues", "Religious", "Pop", "Folk", "Synthwave", "Electronic", "A cappella", "Crunk", "Death Metal", "Industrial"]);

        // Empty log
        data.years = [{ "year": 0, "events": ["You have been born as " + data.name + " " + data.surname + ".", " You are " + data.nationality + ", " + data.genderFull + ".<br>You are living in " + data.city + ".", "Your parents are:<br>" + data.father.name + " " + data.surname + " (" + data.father.age + " years old),<br>" + data.mother.name + " " + data.surname + " (" + data.mother.age + " years old)."] }];

        data.shareService.calculateNetWorth(data);


        this.storage.get("lifeSave").then((val) => {
            console.log('lifeSave', val);

            let saveData = val;

            if (val != null && force != "force") {

                data.lifeId = saveData["lifeId"];
                data.name = saveData["name"];
                data.surname = saveData["surname"];
                data.genderFull = saveData["genderFull"];
                data.gender = saveData["gender"];
                data.city = saveData["city"];
                data.nationality = saveData["nationality"];
                data.hisOrHers = saveData["hisOrHers"];
                data.age = saveData["age"];
                data.alive = saveData["alive"];
                data.appearance = saveData["appearance"];
                data.intelligence = saveData["intelligence"];
                data.sociability = saveData["sociability"];
                data.fitness = saveData["fitness"];
                data.musicality = saveData["musicality"];
                data.happiness = saveData["happiness"];
                data.finance = saveData["finance"];
                data.repaymentTerm = saveData["repaymentTerm"];
                data.sexuality = saveData["sexuality"];
                data.learnedElementary = saveData["learnedElementary"];
                data.elementaryGrade = saveData["elementaryGrade"];
                data.goingToElementary = saveData["goingToElementary"];
                data.learnedHighSchool = saveData["learnedHighSchool"];
                data.goingToHighSchool = saveData["goingToHighSchool"];
                data.goingToHighSchoolYears = saveData["goingToHighSchoolYears"];
                data.goingToCollegeYears = saveData["goingToCollegeYears"];
                data.goingToCollege = saveData["goingToCollege"];
                data.currentCollegeMajor = saveData["currentCollegeMajor"];
                data.myMajors = saveData["myMajors"];
                data.listOfColleges = saveData["listOfColleges"];
                data.highSchoolGrade = saveData["highSchoolGrade"];
                data.inDebt = saveData["inDebt"];
                data.income = saveData["income"];
                data.outcome = saveData["outcome"];
                data.numOfJobs = saveData["numOfJobs"];
                data.allowance = saveData["allowance"];
                data.workExperience = saveData["workExperience"];
                data.netWorth = saveData["netWorth"];
                data.jobsWithoutLabel = saveData["jobsWithoutLabel"];
                data.cars = saveData["cars"];
                data.friends = saveData["friends"];
                data.passedDrivingTest = saveData["passedDrivingTest"];
                data.allowedToTakeDrivingTest = saveData["allowedToTakeDrivingTest"];
                data.drivingTestCount = saveData["drivingTestCount"];
                data.educationLevel = saveData["educationLevel"];
                data.jobService = saveData["jobService"];
                data.deathCause = saveData["deathCause"];
                data.diseases = saveData["diseases"];
                data.retirementAge = saveData["retirementAge"];
                data.inRetirement = saveData["inRetirement"];
                data.pension = saveData["pension"];
                data.inPrison = saveData["inPrison"];
                data.prisonYears = saveData["prisonYears"];
                data.yearsServed = saveData["yearsServed"];
                data.numOfCrimes = saveData["numOfCrimes"];
                data.update = saveData["update"];
                data.mySkills = saveData["mySkills"];
                data.myJob = saveData["myJob"];
                data.jobHistory = saveData["jobHistory"];
                data.isWorking = saveData["isWorking"];
                data.tax = saveData["tax"];
                data.listedJobs = saveData["listedJobs"];
                data.ownedProperties = saveData["ownedProperties"];
                data.gotJobNum = saveData["gotJobNum"];
                data.likingHobbies = saveData["likingHobbies"];
                data.rejections = saveData["rejections"];
                data.acceptions = saveData["acceptions"];
                data.possibleStdDiseases = saveData["possibleStdDiseases"];
                data.curableStd = saveData["curableStd"];
                data.friendRejection = saveData["friendRejection"];
                data.passed = saveData["passed"];
                data.isLearning = saveData["isLearning"];
                data.numOfOneNightStands = saveData["numOfOneNightStands"];
                data.isReadingBooks = saveData["isReadingBooks"];
                data.goingToGym = saveData["goingToGym"];
                data.smoking = saveData["smoking"];
                data.smokingFor = saveData["smokingFor"];
                data.startSmokingAgain = saveData["startSmokingAgain"];
                data.dontAnnounceSmoking = saveData["dontAnnounceSmoking"];
                data.oldInstruments = saveData["oldInstruments"];
                data.instruments = saveData["instruments"];
                data.oldSports = saveData["oldSports"];
                data.hasSocialNetwork = saveData["hasSocialNetwork"];
                data.numOfSocialFans = saveData["numOfSocialFans"];
                data.numOfSelfies = saveData["numOfSelfies"];
                data.numOfAlbums = saveData["numOfAlbums"];
                data.numOfPosts = saveData["numOfPosts"];
                data.havePartner = saveData["havePartner"];
                data.isPregnant = saveData["isPregnant"];
                data.numberOfExSpouses = saveData["numberOfExSpouses"];
                data.children = saveData["children"];
                data.lover = saveData["lover"];
                data.exPartners = saveData["exPartners"];
                data.sports = saveData["sports"];
                data.posjedi = saveData["posjedi"];
                data.alreadyVerified = saveData["alreadyVerified"];
                data.monthlyPayment = saveData["monthlyPayment"];
                data.dontAskForDrivingTestOn18 = saveData["dontAskForDrivingTestOn18"];
                data.livingIn = saveData["livingIn"];
                data.homeless = saveData["homeless"];
                data.homelessFor = saveData["homelessFor"];
                data.livingText = saveData["livingText"];
                data.changeTabTrue = saveData["changeTabTrue"];
                data.colors = saveData["colors"];
                data.lastHappiness = saveData["lastHappiness"];
                data.hasDepression = saveData["hasDepression"];
                data.selfiesPerYear = saveData["selfiesPerYear"];
                data.brokeLegLastYear = saveData["brokeLegLastYear"];
                data.brokeArmLastYear = saveData["brokeArmLastYear"];
                data.selectedBandObject = saveData["selectedBandObject"];
                data.selectedBand = saveData["selectedBand"];
                data.isFamous = saveData["isFamous"];
                data.changeThisLifeIdNextYear = saveData["changeThisLifeIdNextYear"];
                data.bands = saveData["bands"];
                data.father = saveData["father"];
                data.mother = saveData["mother"];
                data.meAssets = saveData["meAssets"];
                data.lastChoosenBand = saveData["lastChoosenBand"];
                data.genres = saveData["genres"];
                data.years = saveData["years"];
            }
        });


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
        var name = this.randomName(data, gender, data.nationality);
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
            this.calculateNetWorth(data);
            let chance = this.randomAtoB(0, 120 - data.intelligence);
            if (chance < 30) {
                data.passedDrivingTest = 1;
                data.drivingTestCount += 1;

                let textToAdd = "";


                if (data.drivingTestCount == 1) textToAdd = "1st";
                else if (data.drivingTestCount == 2) textToAdd = "2nd";
                else if (data.drivingTestCount == 3) textToAdd = "3rd";
                else textToAdd = data.drivingTestCount + "th";

                if (data.drivingTestCount == 1) {
                    this.checkAchievement("Niki Lauda");
                }

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

                if (data.drivingTestCount == 5) {
                    this.checkAchievement("Spongebob style");
                }

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
        data.jobHistory.push({ title: data.myJob[1]["title"], years: data.jobService, firm: data.myJob[0] });
        data.myJob = ["", { "title": "", "salary": "", "experience": 0, "education": 0, "skills": [] }, ""];
        data.isWorking = 0;
        data.jobService = 0;
        data.pension = pension;
        data.inRetirement = 1;

        this.events.publish("goToHome");
        this.update(data);
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

            if (data.numOfSocialFans > 1000000) {
                this.checkAchievement("Internet celebrity");
            }

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
            this.calculateNetWorth(data);
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

        let readyChance = 0;

        if (data.age < 18) readyChance = 10;
        else if (data.age < 20) readyChance = 30;
        else if (data.age < 28) readyChance = 70;
        else readyChance = 100;

        if (data.lover.stability < 30) readyChance * 0.7;
        else if (data.lover.stability < 40) readyChance * 0.8;
        else if (data.lover.stability < 50) readyChance * 0.9;
        else if (data.lover.stability < 60) readyChance * 1.1;
        else if (data.lover.stability < 70) readyChance * 1.2;
        else if (data.lover.stability < 80) readyChance * 1.3;
        else if (data.lover.stability < 90) readyChance * 1.4;
        else if (data.lover.stability <= 100) readyChance * 1.6;

        if (this.randomAtoB(1, 100) <= readyChance) {
            if (this.randomAtoB(1, 100) <= chance) {
                let text = "";
                if (data.gender == "F") {
                    data.isPregnant = 1;
                    text = "You've become pregnant!";
                    data.years[data.age].events.push(`I've become pregnant.`);
                } else {
                    data.lover.isPregnant = 1;
                    text = "Your partner became pregnant!";
                    data.years[data.age].events.push(`${data.lover.name} became pregnant.`);
                }
                this.update(data);
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
        } else {
            let lover = data.lover;
            let alert = this.alertCtrl.create({
                title: "Bad news...",
                message: `${lover.name} is not ready to have a baby.`,
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
        this.calculateNetWorth(data);
        data.interestRate = interestRate;

        //data.changeTabTrue = 1;
        this.events.publish("goToHome");
        data.mortgageModal.dismiss();

        data.ownedProperties.push(property[data.propertyValueIndex + 1]);
        data.posjedi.push(property);
        data.homeless = 0;
        data.homelessFor = 0;

        data.propertyModal.dismiss();
        let textToAdd = "";

        if (data.posjedi.length == 1) {
            data.livingIn = property[data.propertyValueIndex + 1];

            if (data.homeless == 0) {
                textToAdd = " and moved out of my parent's house";
            }
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
        var loverName = this.randomName(data, loverGender, data.nationality);
        var loverSurname = this.randomSurname(data, data.nationality);
        var loverAppearance = this.random1to100();
        var loverIntelligence = this.random1to100();
        var loverFitness = this.randomAtoB(1, 100);
        var loverStability = 50;
        var loverTime = 0;

        let loverId = this.randomId(8);

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

        return { name: loverName, surname: loverSurname, appearance: loverAppearance, intelligence: loverIntelligence, gender: loverGender, age: loverAge, fitness: loverFitness, stability: loverStability, time: loverTime, isPregnant: 0, id: loverId };
    }

    createPerson(data) {
        //console.log(data.sexuality);
        let genderDecide = this.randomAtoB(0, 1);
        let gender = "";
        if (genderDecide == 0) gender = "female";
        else gender = "male";
        let name = this.randomName(data, gender, data.nationality);
        let surname = this.randomSurname(data, data.nationality);
        let appearance = this.random1to100();
        let intelligence = this.random1to100();
        let fitness = this.randomAtoB(1, 100);
        let alive = 1;
        let profileId = "";
        let strength = 30;

        if (gender == "male") {
            profileId = "profile-boy-" + this.randomAtoB(1, 23);
        } else {
            profileId = "profile-girl-" + this.randomAtoB(1, 23);
        }

        let id = this.randomId(8);

        var playerAge = data.age;
        var variety = 0;
        if (playerAge == 3) {
            variety = 0
        } else if (playerAge > 25) {
            variety = this.randomAtoB(0, 10);
        } else if (playerAge > 16) {
            variety = this.randomAtoB(0, 4);
        } else {
            variety = this.randomAtoB(0, 2);
        }
        let upOrDown = this.randomAtoB(0, 2);
        let age = 0;
        if (upOrDown == 0) {
            age = playerAge + variety;
        } else {
            age = playerAge - variety;
        }

        return { name: name, surname: surname, appearance: appearance, intelligence: intelligence, gender: gender, age: age, fitness: fitness, id: id, alive: alive, profileId: profileId, strength: strength };
    }

    createChild(data, who) {
        let genderInt = this.randomAtoB(0, 1);

        let gender = "";
        if (genderInt == 0) gender = "male";
        else gender = "female";

        let childGender = "";
        if (gender == "male") childGender = "boy";
        else childGender = "girl";

        let childId = this.randomId(8);

        let child = { gender: gender, childGender: childGender, whoGaveBirth: who, id: childId };
        this.childModal(data, child);
    }

    choosenChildName(data, child, name) {
        try {
            name = name.replace(/\s\s+/g, ' ');
            if (name == undefined || name == "" || name == " ") {
                console.log("Prazno je");
            } else {
                data.childBornModal.dismiss();

                let appearance = this.random1to100();
                let intelligence = this.random1to100();
                let fitness = this.randomAtoB(1, 100);

                child.name = name;
                child.surname = data.surname;
                child.appearance = appearance;
                child.intelligence = intelligence;
                child.fitness = fitness;
                child.age = 0;
                child.alive = 1;
                child.goingToElementary = 0;
                child.goingToHighSchool = 0;
                child.colleges = [];
                child.livingWithParents = 1;
                child.passedElementarySchool = 0;
                child.passedHighSchool = 0;

                data.children.push(child);

                //console.log(data.children)
                this.update(data);
                if (child.whoGaveBirth == 0) {
                    data.years[data.age].events.push(`I gave birth to ${name}.`);
                    this.handleHappiness(data, "+", 30);
                } else {
                    data.years[data.age].events.push(`${data.lover.name} gave birth to ${name}.`);
                }
            }
        } catch (err) {
            console.log("Empty name");
        }
    }

    decideGrade(data, child, school) {
        let learned = 0;
        if (school == "elementary") {
            learned = child.learnedElementary;
        } else if (school == "high") {
            learned = child.learnedHighSchool;
        }

        let percent = ((learned / 2) + (child.intelligence / 10)) / 12;
        //console.log(data.learnedElementary);
        let grade = "";
        if (percent < 0.1) {
            grade = "F";
        } else if (percent < 0.3) {
            grade = "D";
        } else if (percent < 0.5) {
            grade = "C";
        } else if (percent < 0.7) {
            grade = "B";
        } else if (percent < 1) {
            grade = "A";
        } else if (percent >= 1) {
            grade = "A+";
        }

        return grade;
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

    handleFriendshipStrength(data, friendIndex, character, amount) {
        // data, friend.id, "+", data.shareService.randomAtoB(10, 15)
        if (character == "+") {
            if (data.friends[friendIndex].strength + amount > 100) data.friends[friendIndex].strength = 100;
            else data.friends[friendIndex].strength += amount;
        } else if (character == "-") {
            if ((data.friends[friendIndex].strength - amount) < 0) data.friends[friendIndex].strength = 0;
            else data.friends[friendIndex].strength -= amount;
        } else {
            if (data.friends[friendIndex] + amount > 100) data.friends[friendIndex].strength = 100;
            else if (data.friends[friendIndex] + amount < 0) data.friends[friendIndex].strength = 0;
        }

        if (data.friends[friendIndex].strength == 100) {
            this.checkAchievement("BFF");
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
        data.shareService.checkAchievement("Socialization");
    }

    leaveSocialNetwork(data) {
        data.hasSocialNetwork = 0;
        data.years[data.age].events.push(`I left the social network.`);
    }


    // If already went is 0, push event to log
    goToClub(data, alreadyWent) {
        let chanceOfGettingIntoClub = 101;
        if (data.homeless == 1) {
            chanceOfGettingIntoClub = 30;
        } else if (data.age < 18) {
            chanceOfGettingIntoClub = 50;
        }

        if (this.randomAtoB(1, 100) < chanceOfGettingIntoClub) {
            this.update(data);
            //console.log("You went to club.");
            let meetingChance = 35; //35
            let smokingChance = 15;
            let meetingExChance = 10; //90
            let doingSomethingCrazyChance = 8;

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
                                            this.update(data);
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
                                            data.numOfOneNightStands += 1;

                                            if (data.numOfOneNightStands == 15) {
                                                this.checkAchievement("Casanova");
                                            }

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

                                let prisonChance = 50;

                                if (data.shareService.randomAtoB(0, 100) <= prisonChance) {
                                    let penalty = data.shareService.randomAtoB(1, 7);

                                    data.inPrison = 1;
                                    data.numOfCrimes += 1;
                                    data.prisonYears += penalty;
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
                    cssClass: 'alert3Buttons',
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
                                            data.shareService.checkNightOutSummary(data, doingSomethingCrazyChance);
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
                                            data.shareService.checkNightOutSummary(data, doingSomethingCrazyChance);
                                        }
                                    }, {
                                        text: 'One night stand',
                                        handler: () => {
                                            this.update(data);
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

                                            data.shareService.checkNightOutSummary(data, doingSomethingCrazyChance);

                                            let chanceOfSTD = 30; //30

                                            if (this.randomAtoB(1, 100) <= chanceOfSTD && data.possibleStdDiseases.length > 0) {
                                                let contractedDisease = data.possibleStdDiseases[this.randomAtoB(0, data.possibleStdDiseases.length - 1)];

                                                data.diseases.push(contractedDisease);
                                                data.possibleStdDiseases.splice(data.possibleStdDiseases.indexOf(contractedDisease), 1);

                                                this.handleHappiness(data, "-", 30);
                                                textToAdd += `<br>I contracted ${contractedDisease}.`;

                                                if (contractedDisease == "HIV") {
                                                    this.checkAchievement("No Protection?");
                                                }
                                            }

                                            data.numOfOneNightStands += 1;

                                            if (data.numOfOneNightStands == 15) {
                                                this.checkAchievement("Casanova");
                                            }

                                            data.years[data.age].events.push(`I had a one night stand.${textToAdd}`);
                                        }
                                    }, {
                                        text: 'Ignore',
                                        handler: () => {

                                            data.shareService.checkNightOutSummary(data, doingSomethingCrazyChance);

                                        }
                                    }]
                                });
                                alert1.present();
                            }


                        }
                    }, {
                        text: 'Chat',
                        handler: () => {
                            console.log("You chatted!");

                            data.shareService.checkNightOutSummary(data, doingSomethingCrazyChance);
                        }
                    }, {
                        text: 'Ignore',
                        handler: () => {

                            data.shareService.checkNightOutSummary(data, doingSomethingCrazyChance);
                        }
                    }]
                });
                alert.present();

            } else {
                data.shareService.checkNightOutSummary(data, doingSomethingCrazyChance);
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

        } else {
            if (data.homeless == 1) {
                data.years[data.age].events.push(`Bouncer didn't let me in the club because I'm homeless.`);
            } else if (data.age < 18) {
                data.years[data.age].events.push(`Bouncer didn't let me in the club because I'm too young.`);
            }
            this.update(data);
        }
        //document.getElementById("tab-t0-0").click();
        //this.data.navCtrl.push(TabsPage, {tabIndex:0}); 
        //let nav = this.app.getRootNav();
        // there is also this.app.getRootNav()

        //nav.push(HomePage);
        //TabsPage.homeButtonTab.nativeElement.click();
        //this.goToHomePage();
        //etc
    }

    checkNightOutSummary(data, doingSomethingCrazyChance) {
        if (this.randomAtoB(1, 100) < doingSomethingCrazyChance) {
            let stories = [`I ran over a stop sign. I brought it back home, drew a face on him and named it ${data.shareService.randomName(data, "male", data.nationality)}.`,
                `I was so intoxicated that I signed myself up for Talent Show. I was rejected.`,
                `I'm so embarrassed. Last night after night out I called a taxi and when I arrived home I proudly slid over a $10 bill, winked and said "keep the change". The cab ride was $24.`,
                `I almost set my home on fire. I spilled drink on my socks at a party and decided that the quickest way for me to dry them off was a minute or two in the microwave... Socks caught on fire.`,
                `I got kicked out of a club because the circle of life came on, I jumped on the table and held up my beer pretending it was Simba. As I saw the bouncer making his way for me I got down and he had to chase me around the table a couple of times before dragging me out.`,
                `When I came home I sat on the toilet and I fell off into the shower, broke the splash guard and I really hurt my back.`,
                `People told me I ordered a hot tub online worth about $600. Checked my Amazon and found out they were right. I managed to cancel my order.`];

            let story = stories[this.randomAtoB(0, stories.length - 1)];

            let alert = this.alertCtrl.create({
                subTitle: "Summary of last night",
                message: story,
                buttons: [{
                    text: 'Ok',
                    handler: () => {

                    }
                }]
            });
            alert.present();
        }
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
    googlePlayLogin() {
        //this.data["GPS"] = this.googlePlayGamesServices;
        //let showNetWorth = this.googlePlayShowNetWorth();

        var self = this;
        this.googlePlayGamesServices.auth().then(function () {
            //alert("logged in");
            self.data["googlePlayText"] = "Sign off Google Play";
            /*            this.data["GPS"].showPlayer().then(function (data) {
                            alert(JSON.stringify(data))
                            
                        }); */
        }).catch(function (err) {

            self.data["googlePlayText"] = "Sign in to Google Play";
            alert(err);
        });
    }

    googlePlayLogin2() {
        //console.log('Logging trying...');
        /* try {
            this.googlePlayGamesServices.auth()
            .then(() => this.data["googlePlayText"] = "Sign off Google Play")   
        } catch(e) {
            console.log('Error logging in Play Games Services', e)
        } */
        this.googlePlayGamesServices.auth()
            .then(() => this.data["googlePlayText"] = "Sign off Google Play")
            .catch((e) => console.log('Error logging in Play Games Services', e));
    }

    googlePlayLeaderboards() {
        /* this.googlePlayGamesServices.showLeaderboard({
            leaderboardId: "CgkI186f9JkYEAIQAQ"
        });*/



        this.googlePlayGamesServices.isSignedIn()
            .then((data) => {
                //alert(data.isSignedIn);
                if (data.isSignedIn) {
                    this.googlePlayGamesServices.showAllLeaderboards();
                } else {
                    this.googlePlayLogin2();
                }
            });
    }

    googlePlaySubmitScore(data) {
        let age = data.age;
        let netWorth = data.netWorth * 100;
        let followers = data.numOfSocialFans;
        this.googlePlayGamesServices.isSignedIn()
            .then(() => {
                this.googlePlayGamesServices.submitScore({
                    score: netWorth,
                    leaderboardId: "CgkI186f9JkYEAIQBQ"
                });
                this.googlePlayGamesServices.submitScore({
                    score: age,
                    leaderboardId: "CgkI186f9JkYEAIQCg"
                });
                this.googlePlayGamesServices.submitScore({
                    score: followers,
                    leaderboardId: "CgkI186f9JkYEAIQCw"
                });
            });
    }

    googlePlayLogout() {
        /* this.googlePlayGamesServices.signOut();
        alert("logged out");
        this.data["googlePlayText"] = "Sign in to Google Play"; */

        this.googlePlayGamesServices.isSignedIn()
            .then((data) => {
                //alert(data.isSignedIn);
                if (data.isSignedIn) {
                    //alert(data);
                }
            });
    }

    googlePlayCheckLogin() {
        //alert("1" + JSON.stringify(this.data["GPS"].isSignedIn()))
        var result = false;
        this.googlePlayGamesServices.isSignedIn().then(function (data) {
            //alert("1" + data.isSignedIn);
            result = data.isSignedIn;
        });

        return result;

        /* this.data["GPS"].isSignedIn().then((data) => {
            alert("2" + data.isSignedIn);
            return data.isSignedIn;
        }); */
    }

    googlePlayButton() {
        /* let is = this.googlePlayCheckLogin();
        //alert(is);
        if (is == false) {
            alert("Lets go to logout")
            this.googlePlayLogout();
        } else {
            alert("Lets go to login")
            this.googlePlayLogin();
        } */
        //var self = this;
        this.googlePlayGamesServices.isSignedIn()
            .then((data) => {
                alert(data.isSignedIn);
                if (data.isSignedIn) {
                    this.googlePlayGamesServices.signOut();
                    //alert("logged out");
                    this.data["googlePlayText"] = "Sign in to Google Play";
                } else {
                    this.googlePlayLogin2();
                    //alert("Lets go to login");
                    //this.googlePlayLogin();


                    //this.googlePlayGamesServices.auth();


                    /* .then(() => {
                        alert("logged in");
                        //self.data["googlePlayText"] = "Sign off Google Play";
                        /*            this.data["GPS"].showPlayer().then(function (data) {
                                        alert(JSON.stringify(data))
                                        
                                    }); */
                }
            });
    }


    update(data) {
        data.update += 1;
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

    friendAction(data, friend, action) {
        this.events.publish("goToHome");
        this.update(data);

        data.myFriendModal.dismiss();

        let accept = this.randomAtoB(0, 2);

        let amount = this.randomAtoB(1, 10);

        if (accept == 0) {

            let reason = data.friendRejection[this.randomAtoB(0, data.friendRejection.length - 1)];

            let alert = this.alertCtrl.create({
                subTitle: "Uh-oh!",
                message: `${friend.name} ${reason}.`,
                buttons: ["Ok"]
            });
            alert.present();

            this.handleFriendshipStrength(data, friend.friendIndex, "-", amount);
        } else {
            data.years[data.age].events.push(`I went out ${action} with ${friend.name}.`);

            this.handleFriendshipStrength(data, friend.friendIndex, "+", amount);
            this.handleHappiness(data, "+", this.randomAtoB(2, 8));
        }
    }

    calculateNetWorth(data) {
        let net = 0;
        //cars, ownedProperties
        net = data.finance;

        for (let i = 0; i < data.cars.length; i++) {
            net += data.cars[i].value;
        }

        for (let i = 0; i < data.posjedi.length; i++) {
            let index = 0;
            if (data.posjedi[i][0] == "House") {
                index = 4;
            } else if (data.posjedi[i][0] == "Apartment" || data.posjedi[i][0] == "Condo") {
                index = 3;
            }

            net += parseFloat(data.posjedi[i][index]);
            //console.log(data.posjedi[i][3]);
        }

        data.netWorth = net;
    }

    saveGame(data) {
        let saveData = {};

        saveData["lifeId"] = data.lifeId;
        saveData["name"] = data.name;
        saveData["surname"] = data.surname;
        saveData["genderFull"] = data.genderFull;
        saveData["gender"] = data.gender;
        saveData["city"] = data.city;
        saveData["nationality"] = data.nationality;
        saveData["hisOrHers"] = data.hisOrHers;
        saveData["age"] = data.age;
        saveData["alive"] = data.alive;
        saveData["appearance"] = data.appearance;
        saveData["intelligence"] = data.intelligence;
        saveData["sociability"] = data.sociability;
        saveData["fitness"] = data.fitness;
        saveData["musicality"] = data.musicality;
        saveData["happiness"] = data.happiness;
        saveData["finance"] = data.finance;
        saveData["repaymentTerm"] = data.repaymentTerm;
        saveData["sexuality"] = data.sexuality;
        saveData["learnedElementary"] = data.learnedElementary;
        saveData["elementaryGrade"] = data.elementaryGrade;
        saveData["goingToElementary"] = data.goingToElementary;
        saveData["learnedHighSchool"] = data.learnedHighSchool;
        saveData["goingToHighSchool"] = data.goingToHighSchool;
        saveData["goingToHighSchoolYears"] = data.goingToHighSchoolYears;
        saveData["goingToCollegeYears"] = data.goingToCollegeYears;
        saveData["goingToCollege"] = data.goingToCollege;
        saveData["currentCollegeMajor"] = data.currentCollegeMajor;
        saveData["myMajors"] = data.myMajors;
        saveData["listOfColleges"] = data.listOfColleges;
        saveData["highSchoolGrade"] = data.highSchoolGrade;
        saveData["inDebt"] = data.inDebt;
        saveData["income"] = data.income;
        saveData["outcome"] = data.outcome;
        saveData["numOfJobs"] = data.numOfJobs;
        saveData["allowance"] = data.allowance;
        saveData["workExperience"] = data.workExperience;
        saveData["netWorth"] = data.netWorth;
        saveData["jobsWithoutLabel"] = data.jobsWithoutLabel;
        saveData["cars"] = data.cars;
        saveData["friends"] = data.friends;
        saveData["passedDrivingTest"] = data.passedDrivingTest;
        saveData["allowedToTakeDrivingTest"] = data.allowedToTakeDrivingTest;
        saveData["drivingTestCount"] = data.drivingTestCount;
        saveData["educationLevel"] = data.educationLevel;
        saveData["jobService"] = data.jobService;
        saveData["deathCause"] = data.deathCause;
        saveData["diseases"] = data.diseases;
        saveData["retirementAge"] = data.retirementAge;
        saveData["inRetirement"] = data.inRetirement;
        saveData["pension"] = data.pension;
        saveData["inPrison"] = data.inPrison;
        saveData["prisonYears"] = data.prisonYears;
        saveData["yearsServed"] = data.yearsServed;
        saveData["numOfCrimes"] = data.numOfCrimes;
        saveData["update"] = data.update;
        saveData["mySkills"] = data.mySkills;
        saveData["myJob"] = data.myJob;
        saveData["jobHistory"] = data.jobHistory;
        saveData["isWorking"] = data.isWorking;
        saveData["tax"] = data.tax;
        saveData["listedJobs"] = data.listedJobs;
        saveData["ownedProperties"] = data.ownedProperties;
        saveData["gotJobNum"] = data.gotJobNum;
        saveData["likingHobbies"] = data.likingHobbies;
        saveData["rejections"] = data.rejections;
        saveData["acceptions"] = data.acceptions;
        saveData["possibleStdDiseases"] = data.possibleStdDiseases;
        saveData["curableStd"] = data.curableStd;
        saveData["friendRejection"] = data.friendRejection;
        saveData["passed"] = data.passed;
        saveData["isLearning"] = data.isLearning;
        saveData["numOfOneNightStands"] = data.numOfOneNightStands;
        saveData["isReadingBooks"] = data.isReadingBooks;
        saveData["goingToGym"] = data.goingToGym;
        saveData["smoking"] = data.smoking;
        saveData["smokingFor"] = data.smokingFor;
        saveData["startSmokingAgain"] = data.startSmokingAgain;
        saveData["dontAnnounceSmoking"] = data.dontAnnounceSmoking;
        saveData["oldInstruments"] = data.oldInstruments;
        saveData["instruments"] = data.instruments;
        saveData["oldSports"] = data.oldSports;
        saveData["hasSocialNetwork"] = data.hasSocialNetwork;
        saveData["numOfSocialFans"] = data.numOfSocialFans;
        saveData["numOfSelfies"] = data.numOfSelfies;
        saveData["numOfAlbums"] = data.numOfAlbums;
        saveData["numOfPosts"] = data.numOfPosts;
        saveData["havePartner"] = data.havePartner;
        saveData["isPregnant"] = data.isPregnant;
        saveData["numberOfExSpouses"] = data.numberOfExSpouses;
        saveData["children"] = data.children;
        saveData["lover"] = data.lover;
        saveData["exPartners"] = data.exPartners;
        saveData["sports"] = data.sports;
        saveData["posjedi"] = data.posjedi;
        saveData["alreadyVerified"] = data.alreadyVerified;
        saveData["monthlyPayment"] = data.monthlyPayment;
        saveData["dontAskForDrivingTestOn18"] = data.dontAskForDrivingTestOn18;
        saveData["livingIn"] = data.livingIn;
        saveData["homeless"] = data.homeless;
        saveData["homelessFor"] = data.homelessFor;
        saveData["livingText"] = data.livingText;
        saveData["changeTabTrue"] = data.changeTabTrue;
        saveData["colors"] = data.colors;
        saveData["lastHappiness"] = data.lastHappiness;
        saveData["hasDepression"] = data.hasDepression;
        saveData["selfiesPerYear"] = data.selfiesPerYear;
        saveData["brokeLegLastYear"] = data.brokeLegLastYear;
        saveData["brokeArmLastYear"] = data.brokeArmLastYear;
        saveData["selectedBandObject"] = data.selectedBandObject;
        saveData["selectedBand"] = data.selectedBand;
        saveData["isFamous"] = data.isFamous;
        saveData["changeThisLifeIdNextYear"] = data.changeThisLifeIdNextYear;
        saveData["bands"] = data.bands;
        saveData["father"] = data.father;
        saveData["mother"] = data.mother;
        saveData["meAssets"] = data.meAssets;
        saveData["lastChoosenBand"] = data.lastChoosenBand;
        saveData["genres"] = data.genres;
        saveData["years"] = data.years;

        this.storage.set("lifeSave", saveData);
    }

    checkSaveGame() {

        this.storage.get("lifeSave").then((val) => {
            console.log('lifeSave', val);

            if (val == null) {
                return false;
            } else {
                return true;
            }
        });

    }

    loadSaveGame(data) {

        this.storage.get("lifeSave").then((val) => {
            // console.log('lifeSave', val);

            let saveData = val;

            data.lifeId = saveData["lifeId"];
            data.name = saveData["name"];
            data.surname = saveData["surname"];
            data.genderFull = saveData["genderFull"];
            data.gender = saveData["gender"];
            data.city = saveData["city"];
            data.nationality = saveData["nationality"];
            data.hisOrHers = saveData["hisOrHers"];
            data.age = saveData["age"];
            data.alive = saveData["alive"];
            data.appearance = saveData["appearance"];
            data.intelligence = saveData["intelligence"];
            data.sociability = saveData["sociability"];
            data.fitness = saveData["fitness"];
            data.musicality = saveData["musicality"];
            data.happiness = saveData["happiness"];
            data.finance = saveData["finance"];
            data.repaymentTerm = saveData["repaymentTerm"];
            data.sexuality = saveData["sexuality"];
            data.learnedElementary = saveData["learnedElementary"];
            data.elementaryGrade = saveData["elementaryGrade"];
            data.goingToElementary = saveData["goingToElementary"];
            data.learnedHighSchool = saveData["learnedHighSchool"];
            data.goingToHighSchool = saveData["goingToHighSchool"];
            data.goingToHighSchoolYears = saveData["goingToHighSchoolYears"];
            data.goingToCollegeYears = saveData["goingToCollegeYears"];
            data.goingToCollege = saveData["goingToCollege"];
            data.currentCollegeMajor = saveData["currentCollegeMajor"];
            data.myMajors = saveData["myMajors"];
            data.listOfColleges = saveData["listOfColleges"];
            data.highSchoolGrade = saveData["highSchoolGrade"];
            data.inDebt = saveData["inDebt"];
            data.income = saveData["income"];
            data.outcome = saveData["outcome"];
            data.numOfJobs = saveData["numOfJobs"];
            data.allowance = saveData["allowance"];
            data.workExperience = saveData["workExperience"];
            data.netWorth = saveData["netWorth"];
            data.jobsWithoutLabel = saveData["jobsWithoutLabel"];
            data.cars = saveData["cars"];
            data.friends = saveData["friends"];
            data.passedDrivingTest = saveData["passedDrivingTest"];
            data.allowedToTakeDrivingTest = saveData["allowedToTakeDrivingTest"];
            data.drivingTestCount = saveData["drivingTestCount"];
            data.educationLevel = saveData["educationLevel"];
            data.jobService = saveData["jobService"];
            data.deathCause = saveData["deathCause"];
            data.diseases = saveData["diseases"];
            data.retirementAge = saveData["retirementAge"];
            data.inRetirement = saveData["inRetirement"];
            data.pension = saveData["pension"];
            data.inPrison = saveData["inPrison"];
            data.prisonYears = saveData["prisonYears"];
            data.yearsServed = saveData["yearsServed"];
            data.numOfCrimes = saveData["numOfCrimes"];
            data.update = saveData["update"];
            data.mySkills = saveData["mySkills"];
            data.myJob = saveData["myJob"];
            data.jobHistory = saveData["jobHistory"];
            data.isWorking = saveData["isWorking"];
            data.tax = saveData["tax"];
            data.listedJobs = saveData["listedJobs"];
            data.ownedProperties = saveData["ownedProperties"];
            data.gotJobNum = saveData["gotJobNum"];
            data.likingHobbies = saveData["likingHobbies"];
            data.rejections = saveData["rejections"];
            data.acceptions = saveData["acceptions"];
            data.possibleStdDiseases = saveData["possibleStdDiseases"];
            data.curableStd = saveData["curableStd"];
            data.friendRejection = saveData["friendRejection"];
            data.passed = saveData["passed"];
            data.isLearning = saveData["isLearning"];
            data.numOfOneNightStands = saveData["numOfOneNightStands"];
            data.isReadingBooks = saveData["isReadingBooks"];
            data.goingToGym = saveData["goingToGym"];
            data.smoking = saveData["smoking"];
            data.smokingFor = saveData["smokingFor"];
            data.startSmokingAgain = saveData["startSmokingAgain"];
            data.dontAnnounceSmoking = saveData["dontAnnounceSmoking"];
            data.oldInstruments = saveData["oldInstruments"];
            data.instruments = saveData["instruments"];
            data.oldSports = saveData["oldSports"];
            data.hasSocialNetwork = saveData["hasSocialNetwork"];
            data.numOfSocialFans = saveData["numOfSocialFans"];
            data.numOfSelfies = saveData["numOfSelfies"];
            data.numOfAlbums = saveData["numOfAlbums"];
            data.numOfPosts = saveData["numOfPosts"];
            data.havePartner = saveData["havePartner"];
            data.isPregnant = saveData["isPregnant"];
            data.numberOfExSpouses = saveData["numberOfExSpouses"];
            data.children = saveData["children"];
            data.lover = saveData["lover"];
            data.exPartners = saveData["exPartners"];
            data.sports = saveData["sports"];
            data.posjedi = saveData["posjedi"];
            data.alreadyVerified = saveData["alreadyVerified"];
            data.monthlyPayment = saveData["monthlyPayment"];
            data.dontAskForDrivingTestOn18 = saveData["dontAskForDrivingTestOn18"];
            data.livingIn = saveData["livingIn"];
            data.homeless = saveData["homeless"];
            data.homelessFor = saveData["homelessFor"];
            data.livingText = saveData["livingText"];
            data.changeTabTrue = saveData["changeTabTrue"];
            data.colors = saveData["colors"];
            data.lastHappiness = saveData["lastHappiness"];
            data.hasDepression = saveData["hasDepression"];
            data.selfiesPerYear = saveData["selfiesPerYear"];
            data.brokeLegLastYear = saveData["brokeLegLastYear"];
            data.brokeArmLastYear = saveData["brokeArmLastYear"];
            data.selectedBandObject = saveData["selectedBandObject"];
            data.selectedBand = saveData["selectedBand"];
            data.isFamous = saveData["isFamous"];
            data.changeThisLifeIdNextYear = saveData["changeThisLifeIdNextYear"];
            data.bands = saveData["bands"];
            data.father = saveData["father"];
            data.mother = saveData["mother"];
            data.meAssets = saveData["meAssets"];
            data.lastChoosenBand = saveData["lastChoosenBand"];
            data.genres = saveData["genres"];
            data.years = saveData["years"];


        });

    }

    deleteSaveGame() {
        console.log(1);
        this.storage.remove("lifeSave");
        console.log(2);
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
            if (data.age > 25 && data.age < 50 && data.posjedi.length == 0 && data.homeless == 0) {
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
        data.numberOfExSpouses += 1;
        let text = "";
        if (data.lover.status == "Relationship") text = `I broke up with ${data.lover.name}.`;
        else if (data.lover.status == "Engaged") text = `I broke off my engagement with ${data.lover.name}.`;
        else if (data.lover.status == "Married") text = `I divorced ${data.lover.name}.`;
        data.years[data.age].events.push(text);
        this.handleHappiness(data, "-", 20);
        data.lover.whoBrokeUp = 0;
        data.exPartners.push(data.lover);
        data.lover = { stability: 50, time: 0 };

        if (data.numberOfExSpouses == 6) {
            this.checkAchievement("Henry VIII");
        }
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

    randomName(data, gender, nationality) {
        var nameNum = this.randomAtoB(0, this.names[nationality][gender].length - 1);
        var newName = this.names[nationality][gender][nameNum];

        return newName;
    }

    randomSurname(data, nationality) {
        var surnameNum = this.randomAtoB(0, this.names[nationality]["surname"].length - 1);
        var newSurname = this.names[nationality]["surname"][surnameNum];

        return newSurname;
    }

    randomCity(data, nationality) {
        let cityNum = this.randomAtoB(0, this.names[nationality]["cities"].length - 1);
        let newCity = this.names[nationality]["cities"][cityNum];

        return newCity;
    }

    randomBandName(data) {
        return (this.bands[this.randomAtoB(0, this.bands.length - 1)]);
    }

    randomAlbumName(data) {
        return (this.albums[this.randomAtoB(0, this.albums.length - 1)]);
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
        this.update(data);
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
            this.calculateNetWorth(data);
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
        this.update(data);
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
            let textToAdd = "";
            if (data.workExperience < job[1]["experience"]) {
                textToAdd += `<br><br><i>You don't have the required amount of work experience!</i>`;
            }
            let alert = this.alertCtrl.create({
                title: 'Bad news...',
                subTitle: '<br>You didn\'t get an interview.' + textToAdd,
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
        data.jobHistory.push({ title: data.myJob[1]["title"], years: data.jobService, firm: data.myJob[0] });
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
    templateUrl: '../../pages/me/commitSuicide.html'
})
export class commitSuicideModal {
    data: object;
    suicideMethod;
    constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController, public events: Events) {
        this.data = shareService.getData();

        this.suicideMethod = "Hanging";
        //console.log();
    }

    commitSuicide(data, suicideMethod) {

        if (suicideMethod == "Set yourself on fire") suicideMethod = "setting myself on fire";
        suicideMethod = suicideMethod.toLowerCase();

        let chance = 40;
        if (data.shareService.randomAtoB(0, 100) <= chance) {
            data.alive = 0;
            data.shareService.disableAll(data);
            data.deathCause = suicideMethod;
            data.years[data.age].events.push(`I died from ${suicideMethod}.`);
            this.data["shareService"].googlePlaySubmitScore(data);
            data.shareService.deleteSaveGame(data);
        } else {
            data.years[data.age].events.push(`I failed to kill myself by ${suicideMethod}.`);
        }
        this.dismiss();

        if (data.alive == 0) {
            //this.events.publish("goToObituary");
            this.events.publish("goToHome");
        } else {
            this.events.publish("goToHome");
        }
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
    templateUrl: '../../pages/me/music.html'
})
export class musicModal {
    data: object;
    //selectedBand;
    constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController, public events: Events) {
        this.data = shareService.getData();
        //console.log(this.data["bands"].length);
        //console.log(this.selectedBand);

        this.data["selectedBandObject"];
        this.data["selectedBand"] = "band" + this.data["bands"].length;
        if (this.data["bands"].length > 0) {
            this.data["selectedBand"] = this.data["bands"][0]["id"];
            this.data["selectedBandObject"] = this.data["bands"][0];
        } else {
            //console.log(this.selectedBand);
        }
        //console.log(this.data["lastChoosenBand"])
        if (this.data["lastChoosenBand"] != undefined) {
            this.data["selectedBand"] = this.data["lastChoosenBand"]["id"];
            this.data["selectedBandObject"] = this.data["lastChoosenBand"];
        } else {
            //console.log(2);
        }

        this.data["changeSelectedBand"] = this.changeSelectedBand;
        //console.log();
    }

    selectedBandChanged(data) {
        for (let i = 0; i < data.bands.length; i++) {
            if (data.bands[i]["id"] == this.data["selectedBand"]) {
                data["selectedBandObject"] = data.bands[i];
                data.lastChoosenBand = data.bands[i];
            }
        }
    }

    createAlbumModal(data) {
        data.shareService.createAlbumModal(data);
    }

    disband(data) {
        data.musicModal.dismiss();
        this.data["selectedBandObject"].active = 0;
        data.years[data.age].events.push(`I disbanded ${this.data["selectedBandObject"].name}.`);
        this.events.publish("goToHome");
    }

    reunite(data) {
        this.data["selectedBandObject"].active = 1;
        data.years[data.age].events.push(`I reunited ${this.data["selectedBandObject"].name}.`);
    }

    changeSelectedBand(data, band, length) {
        //console.log(band);
        //console.log(1);

        //console.log(this.selectedBand);
        //console.log(band["id"]);
        this.data["selectedBand"] = band["id"];
        //console.log(data.bands[data.bands.length - 1]["id"]);
        //console.log(band);

        data["selectedBandObject"] = band;
        data.lastChoosenBand = band;
        this.selectedBandChanged(data);
        //console.log(this.selectedBand);
    }

    bandNameModal(data) {
        data.shareService.bandNameModal(data);
    }

    backButtonAction() {
        this.viewCtrl.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

@Component({
    templateUrl: '../../pages/me/myChild.html'
})
export class myChildModal {
    data: object;
    child: object;
    livingWithParents;
    colleges = "";
    alive;

    constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController) {
        this.data = shareService.getData();
        this.child = params.get("child");
        //console.log(this.child);
        //console.log();

        if (this.child["alive"] == 1) {
            this.alive = "Yes";
        } else {
            this.alive = "No";
        }

        if (this.child["livingWithParents"] == 1) {
            this.livingWithParents = "Yes";
        } else {
            this.livingWithParents = "No";
        }

        this.colleges = "None";
        let tmp = ", ";
        for (let i = 0; i < this.child["colleges"].length; i++) {
            if (i + 1 == this.child["colleges"].length) {
                tmp = "";
            }
            this.colleges += tmp + this.child["colleges"][i];
        }
    }

    backButtonAction() {
        this.viewCtrl.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

@Component({
    templateUrl: '../../pages/me/myFriend.html'
})
export class myFriendModal {
    data: object;
    friend: object;

    constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController) {
        this.data = shareService.getData();
        this.friend = params.get("friend");

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
        this.childName = data.shareService.randomName(data, this.child["gender"], data.nationality);
    }

    backButtonAction() {
        this.viewCtrl.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

@Component({
    templateUrl: '../../pages/me/carInfo.html'
})
export class carInfoModal {
    data: object;
    car: object;
    constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController) {
        this.data = shareService.getData();
        this.car = params.get("car");

        console.log(this.car)
        //console.log(this.child);
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
    templateUrl: '../../pages/me/createAlbum.html'
})
export class createAlbumModal {
    data: object;
    albumName;
    albumSongs;
    bandGenre;
    constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController, public events: Events, public alertCtrl: AlertController) {
        this.data = shareService.getData();

        //this.albumSongs = new FormControl('', CustomValidators.max(20));
        //console.log(this.child);
        //console.log();

        this.albumSongs = 1;
    }

    createAlbum(data, name, numOfSongs) {
        if (data.numOfAlbums < 2) {
            if (name != undefined) {
                name = name.replace(/\s\s+/g, ' ');
                if (numOfSongs > 0 && numOfSongs < 21 && name != "" && name != " ") {
                    let band = data.selectedBandObject;

                    let chanceOfGiantSuccess = data.shareService.randomAtoB(1, 100);
                    if (chanceOfGiantSuccess > 1) chanceOfGiantSuccess = data.shareService.randomAtoB(1000, 3000) / 1000;
                    let upOrDown = data.shareService.randomAtoB(0, 1);

                    if (upOrDown == 0) upOrDown = -1;
                    else upOrDown = 1;

                    let copies = (band.fans + (upOrDown * band.fans * chanceOfGiantSuccess)).toFixed(0);
                    if (copies < 0) copies = (band.fans * data.shareService.randomAtoB(500, 1500) / 1000).toFixed(0);

                    let newFans = 0;
                    if (copies / band.fans > 2.5) newFans = parseInt((band.fans * data.shareService.randomAtoB(1300, 2500) / 1000).toFixed(0));
                    else if (copies / band.fans > 2) newFans = parseInt((band.fans * data.shareService.randomAtoB(1200, 2000) / 1000).toFixed(0));
                    else if (copies / band.fans > 1.75) newFans = parseInt((band.fans * data.shareService.randomAtoB(1200, 1800) / 1000).toFixed(0));
                    else if (copies / band.fans > 1.4) newFans = parseInt((band.fans * data.shareService.randomAtoB(1100, 1500) / 1000).toFixed(0));
                    else if (copies / band.fans > 1) newFans = parseInt((band.fans * data.shareService.randomAtoB(1000, 1350) / 1000).toFixed(0));
                    else if (copies / band.fans <= 1) newFans = parseInt((band.fans * data.shareService.randomAtoB(700, 1200) / 1000).toFixed(0));
                    let chance = 0;
                    if (data.musicality < 10) {
                        newFans = parseInt((newFans * data.musicality / 200 / data.shareService.randomAtoB(2, 10)).toFixed(0));
                        copies = parseInt((copies * data.musicality / 200 / data.shareService.randomAtoB(2, 10)).toFixed(0));
                    } else if (data.musicality < 25) {
                        newFans = parseInt((newFans * data.musicality / 200 / data.shareService.randomAtoB(2, 9)).toFixed(0));
                        copies = parseInt((copies * data.musicality / 200 / data.shareService.randomAtoB(2, 9)).toFixed(0));
                    } else if (data.musicality < 45) {
                        newFans = parseInt((newFans * data.musicality / 200 / data.shareService.randomAtoB(2, 8)).toFixed(0));
                        copies = parseInt((copies * data.musicality / 200 / data.shareService.randomAtoB(2, 8)).toFixed(0));
                    } else if (data.musicality < 65) {
                        newFans = parseInt((newFans * data.musicality / 200 / data.shareService.randomAtoB(2, 6)).toFixed(0));
                        copies = parseInt((copies * data.musicality / 200 / data.shareService.randomAtoB(2, 6)).toFixed(0));
                    } else if (data.musicality < 75) {
                        newFans = parseInt((newFans * data.musicality / 200 / data.shareService.randomAtoB(2, 4)).toFixed(0));
                        copies = parseInt((copies * data.musicality / 200 / data.shareService.randomAtoB(2, 4)).toFixed(0));
                    } else if (data.musicality < 80) {
                        newFans = parseInt((newFans * data.musicality / 200 / data.shareService.randomAtoB(2, 3)).toFixed(0));
                        copies = parseInt((copies * data.musicality / 200 / data.shareService.randomAtoB(2, 3)).toFixed(0));
                    } else {
                        chance = data.shareService.randomAtoB(1, 4);

                        if (chance > 1) {
                            newFans = parseInt((newFans * data.musicality / 200 / (data.shareService.randomAtoB(1300, 2000) / 1000)).toFixed(0));
                            copies = parseInt((copies * data.musicality / 200 / (data.shareService.randomAtoB(1300, 2000) / 1000)).toFixed(0));
                        }
                    }

                    copies = parseInt(copies);
                    //newFans = parseInt(newFans);

                    if (copies < 10) copies = data.shareService.randomAtoB(10, 20);
                    data.years[data.age].events.push(`${band.name} released a new album called ${name}.<br>It sold ${copies} copies.`);

                    band.fans += newFans;
                    band.soldCopies += copies;

                    if (band.soldCopies >= 1000000) {
                        data.shareService.checkAchievement("Elvis has left the building");
                    }

                    data.finance += copies / (10 * data.shareService.randomAtoB(100, 200) / 100)
                    data.numOfAlbums += 1;
                    data.musicModal.dismiss();
                    data.createAlbumModal.dismiss();
                    this.events.publish("goToHome");
                    band.albums += 1;
                    data.shareService.calculateNetWorth(data);
                    console.log("Published an album");
                }
            }
        } else {
            let alert = this.alertCtrl.create({
                subTitle: "What?!",
                message: "There is no more free studio time.",
                buttons: ["Okay"]
            });
            alert.present();
            data.createAlbumModal.dismiss();
        }
    }

    ngAfterViewInit() {
        this.albumSongs = 1;
    }

    changedNumberOfSongs(value) {
        console.log(value)
        if (this.albumSongs > 20) this.albumSongs = 20;
        else if (this.albumSongs < 1) this.albumSongs = 1;
    }

    randomAlbumName(data) {
        this.albumName = data.shareService.randomAlbumName();
    }

    /* randomName(data) {
        this.childName = data.shareService.randomName(data, this.child["gender"]);
    } */

    backButtonAction() {
        this.viewCtrl.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

@Component({
    templateUrl: '../../pages/me/createBand.html'
})
export class bandNameModal {
    data: object;
    bandName;
    bandMembers;
    bandGenre;
    constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController) {
        this.data = shareService.getData();

        this.bandMembers = 1;

        //console.log(this.child);
        //console.log();
    }

    createBand(data, name, members, genre) {
        name = name.replace(/\s\s+/g, ' ');
        if (name == undefined || name == "" || name == " " || members == undefined || genre == undefined) {
            console.log("Prazno je");
        } else {
            // Each time you create new band the list will contain all bands previous selected as selectedBand
            // all because the value of the option can't be object because it is written as [Object Object]
            // So everything is same.
            //data.bands = [{name: "123", members: 3, fans: 0, id: "1234567"}]; //, {name: "Test", members: 2, id: "1234566"}
            let newBand = {};
            newBand["name"] = name;
            //newBand["members"]
            newBand["members"] = members;
            newBand["fans"] = 15 + parseInt((data.shareService.randomAtoB(10, 40) * data.musicality / 80).toFixed(0));
            newBand["genre"] = genre;
            newBand["albums"] = 0;
            newBand["soldCopies"] = 0;
            newBand["active"] = 1;
            //newBand["id"] = this.randomId(8);

            //if (data.bands.length == 0) newBand["id"] = "band";
            //else newBand["id"] = this.randomId(8);
            //else
            newBand["id"] = "band" + data.bands.length;

            data.bands.push(newBand);

            for (let i = 0; i < data.bands.length; i++) {
                if (data.bands[i]["id"] == newBand["id"]) {
                    data.selectedBand = newBand["id"];
                    data.selectedBandObject = data.bands[i];
                }
            }
            let genreInput = genre;
            if (genre != "R&B") genreInput = genre.toLowerCase();
            data.years[data.age].events.push(`I formed ${name}. It is ${genreInput} oriented.`);
            //data.changeSelectedBand(data, newBand, length);

            //data.changeSelectedBand(data, newBand)

            data.bandNameModal.dismiss();

            data.shareService.checkAchievement("Garage band");
        }
    }

    randomBandName(data) {
        this.bandName = data.shareService.randomBandName();
    }

    /* randomName(data) {
        this.childName = data.shareService.randomName(data, this.child["gender"]);
    } */

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
    bringChildren;

    constructor(params: NavParams, shareService: ShareService, public viewCtrl: ViewController) {
        this.data = shareService.getData();

        this.travelTo = this.data["countries"]["countries"][this.randomAtoB(0, this.data["countries"]["countries"].length - 1)];
        this.hotelStars = 1;
        this.travelClass = "Economy Class";
        this.invitePartner = false;
        this.bringChildren = false;
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

        if (this.bringChildren == true) {
            osnovica += osnovica / Math.sqrt(5) * this.data["children"].length;
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