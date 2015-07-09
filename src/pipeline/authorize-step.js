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
      return next();
    }

    this.account
      .get()
      .then(function() {
        return next();
      })
      .catch(function() {
        return next.cancel(new Redirect('login'));
      });

  }
}
