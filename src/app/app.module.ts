import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MePage } from '../pages/me/me';
import { JobPage } from '../pages/job/job';
import { FamilyPage } from '../pages/family/family';
import { EducationPage } from '../pages/education/education';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PopoverContentPage } from '../pages/popover/popover';
import { ShareService } from '../services/share/share';
import { ProgressBarModule } from "angular-progress-bar"

import { HttpModule }      from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    EducationPage,
    HomePage,
    TabsPage,
    MePage,
    JobPage,
    FamilyPage,
    PopoverContentPage
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
    PopoverContentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShareService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
