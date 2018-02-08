import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Config } from 'ionic-angular';

import { MePage } from '../pages/me/me';
import { JobPage } from '../pages/job/job';
import { FamilyPage } from '../pages/family/family';
import { EducationPage } from '../pages/education/education';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { findLoveModal } from '../services/share/share';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PopoverContentPage } from '../pages/popover/popover';
import { ShareService } from '../services/share/share';
import { ProgressBarModule } from "angular-progress-bar"

import { ModalScaleUpEnterTransition } from "../transitions/scale-up-enter.transition";
import { ModalScaleUpLeaveTransition } from "../transitions/scale-up-leave.transition";

import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    EducationPage,
    HomePage,
    TabsPage,
    MePage,
    JobPage,
    FamilyPage,
    PopoverContentPage,
    findLoveModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ProgressBarModule,
    IonicModule.forRoot(MyApp)
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
    PopoverContentPage,
    findLoveModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShareService,
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

