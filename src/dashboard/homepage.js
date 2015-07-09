export class Homepage {
  contructor() {

  }

  configureRouter(config, router) {
    config.title = 'Homepage';
    config.mapUnknownRoutes(instruction => {
      //check instruction.fragment
      //set instruction.config.moduleId
      instruction.config.moduleId = '../403';

    });
    config.map([
      {
        route: ['', 'events'],
        name: 'events',
        moduleId: './events/index',
        nav: true,
        title: 'Events'
      }
    ]);
  }
}
