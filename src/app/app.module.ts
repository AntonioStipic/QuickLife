import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Config } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

import { MePage } from '../pages/me/me';
import { JobPage } from '../pages/job/job';
import { FamilyPage } from '../pages/family/family';
import { EducationPage } from '../pages/education/education';
import { HomePage } from '../pages/home/home';
import { ObituaryPage } from '../pages/obituary/obituary';
import { TabsPage } from '../pages/tabs/tabs';
import { PrisonPage } from '../pages/prison/prison';
import { findLoveModal, propertyListingModal, carsForSaleModal, socialNetworkModal, holidayModal, mortgageModal, weddingModal, childModal, musicModal, bandNameModal, createAlbumModal, commitSuicideModal, carInfoModal, myChildModal, myFriendModal } from '../services/share/share';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Keyboard } from '@ionic-native/keyboard';

import { PopoverContentPage, customLifeModal, achievementsModal, aboutModal } from '../pages/popover/popover';
import { ShareService } from '../services/share/share';
import { ProgressBarModule } from "angular-progress-bar"

import { ModalScaleUpEnterTransition } from "../transitions/scale-up-enter.transition";
import { ModalScaleUpLeaveTransition } from "../transitions/scale-up-leave.transition";

import { HttpModule } from '@angular/http';

import { IonicStorageModule } from '@ionic/storage';

import { GooglePlayGamesServices } from '@ionic-native/google-play-games-services';
//import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';


@NgModule({
  declarations: [
    MyApp,
    EducationPage,
    HomePage,
    TabsPage,
    MePage,
    JobPage,
    FamilyPage,
    ObituaryPage,
    PopoverContentPage,
    findLoveModal,
    propertyListingModal,
    carsForSaleModal,
    socialNetworkModal,
    customLifeModal,
    holidayModal,
    mortgageModal,
    weddingModal,
    childModal,
    musicModal,
    bandNameModal,
    createAlbumModal,
    commitSuicideModal,
    carInfoModal,
    achievementsModal,
    aboutModal,
    PrisonPage,
    myChildModal,
    myFriendModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ProgressBarModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        android: {
          scrollAssist: false,
          autoFocusAssist: false
        }
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EducationPage,
    HomePage,
    TabsPage,
    MePage,
    JobPage,
    FamilyPage,
    ObituaryPage,
    PopoverContentPage,
    findLoveModal,
    propertyListingModal,
    carsForSaleModal,
    socialNetworkModal,
    customLifeModal,
    holidayModal,
    mortgageModal,
    weddingModal,
    childModal,
    musicModal,
    bandNameModal,
    createAlbumModal,
    commitSuicideModal,
    carInfoModal,
    achievementsModal,
    aboutModal,
    PrisonPage,
    myChildModal,
    myFriendModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShareService,
    Keyboard,
    GooglePlayGamesServices,
    AppVersion,
    //FirebaseAnalytics,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {
  constructor(public config: Config) {
    this.setCustomTransitions();
  }

  private setCustomTransitions() {
    this.config.setTransition('modal-scale-up-leave', ModalScaleUpLeaveTransition);
    this.config.setTransition('modal-scale-up-enter', ModalScaleUpEnterTransition);
  }
}

