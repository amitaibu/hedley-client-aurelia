import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

import {AuthorizeStep} from './pipeline/authorize-step';

export class App {
  configureRouter(config, router){
    config.title = 'Skeleton';
    config.mapUnknownRoutes(instruction => {
      //check instruction.fragment
      //set instruction.config.moduleId
      instruction.config.moduleId = './403';

    });    
    // Add a route filter to the authorize extensibility point.
    config.addPipelineStep('authorize', AuthorizeStep);    
    config.map([      
      {
        route: 'login',
        name: 'login',
        moduleId: './login',
        nav: true,
        title: 'Login'
      },
      {
        route: 'logout',
        name: 'logout',
        moduleId: './logout',
        nav: true,
        title: 'Logout'
      },
      {
        route: 'my-account',
        name: 'my-account',
        moduleId: './my-account',
        nav: true,
        title: 'My Account'
      },
      {
        route: 'companies',
        name: 'companies',
        moduleId: './companies',
        nav: true,
        title: 'Companies'
      },
      {
        route: 'dashboard/:companyId',
        name: 'dashboard',
        moduleId: './dashboard',
      },
      {
        route: 'child-router',
        name: 'child-router',
        moduleId: './child-router',
        nav: false,
        title:'Child Router'
      },
      {
        route: ['', 'homepage', 'dashboard', 'welcome'],
        name: 'homepage',
        moduleId: 'dashboard/homepage',
        nav: false,
        title:'Homepage'
      }
    ]);

    this.router = router;
  }
}
