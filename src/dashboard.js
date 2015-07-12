export class CompanyDashboard {
  heading = 'Company Dashboard';

  configureRouter(config, router) {
    config.map([
      {
        route: '',
        title:'Company Dashboard',
        viewPorts: {
          first: {
            name: 'events-list',
            moduleId: './dashboard/events-list'
          },
          last: {
            name: 'event-detail',
            moduleId: './dashboard/event-detail'
          }
        }
      },
      {
        route: 'event/:eventId',
        name: 'event-detail',
        title:'Company Dashboard',
        viewPorts: {
          first: {
            name: 'events-list',
            moduleId: './dashboard/events-list'
          },
          last: {
            name: 'event-detail',
            moduleId: './dashboard/event-detail'
          }
        }
      }
    ]);

    this.router = router;
  }
}
