import { Component } from '@angular/core';

import { MePage } from '../me/me';
//import { TabsMePage } from '../tabs/tabsMe';
import { EducationPage } from '../education/education';
import { HomePage } from '../home/home';
import { JobPage } from '../job/job';
import { FamilyPage } from '../family/family';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MePage;
  tab3Root = EducationPage;
  tab4Root = JobPage;
  tab5Root = FamilyPage;

  constructor() {

  }
}
