export class CompanyDashboard {
  heading = 'Company Dashboard';

  configureRouter(config, router) {
    config.map([
      { route: ['','welcome'], name: 'welcome',      moduleId: './welcome',      nav: true, title:'Welcome' },
      {
        route: 'events',
        name: 'events',
        moduleId: './dashboard/events',
        title:'Events'
      }
    ]);

    this.router = router;
  }
}
