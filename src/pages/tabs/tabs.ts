import { Component } from '@angular/core';

import { MePage } from '../me/me';
//import { TabsMePage } from '../tabs/tabsMe';
import { EducationPage } from '../education/education';
import { HomePage } from '../home/home';
import { JobPage } from '../job/job';
import { FamilyPage } from '../family/family';
import { ObituaryPage } from '../obituary/obituary';
import { ShareService } from '../../services/share/share';
import { PrisonPage } from '../prison/prison';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MePage;
  tab3Root = EducationPage;
  tab4Root = JobPage;
  tab5Root = FamilyPage;
  tab6Root = ObituaryPage;
  tab7Root = PrisonPage;
  data: object;

  constructor(shareService: ShareService) {
    this.data = shareService.getData();
    this.data["shareService"] = shareService;

    
  }
}
