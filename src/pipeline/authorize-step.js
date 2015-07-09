import {inject} from 'aurelia-framework';
import {Account} from '../services/account';
import {Redirect} from 'aurelia-router';

@inject(Account)
export class AuthorizeStep {

  constructor(account) {
    this.account = account;
  }

  run(routingContext, next) {
    // Check if the route has is not "login".
    // The reason for using `nextInstructions` is because
    // this includes child routes.
    if (routingContext.nextInstructions.some(i => i.config.name === 'login')) {
      console.log('login-step');
      return next();
    }

    console.log('not-login-step');

    this.account
      .get()
      .then(function() {
        console.log('logged');
        return next();
      })
      .catch(function() {
        console.log('not-logged');
        return next.cancel(new Redirect('login'));
      });

  }
}
