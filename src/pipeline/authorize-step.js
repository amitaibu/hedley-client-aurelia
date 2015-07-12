import {inject} from 'aurelia-framework';
import {Account} from '../services/account';
import {Auth} from '../services/auth';
import {Redirect} from 'aurelia-router';

@inject(Account, Auth)
export class AuthorizeStep {

  constructor(account, auth) {
    this.account = account;
    this.auth = auth;
  }

  run(routingContext, next) {
    // Check if the route has is not "login".
    // The reason for using `nextInstructions` is because
    // this includes child routes.
    if (routingContext.nextInstructions.some(i => i.config.name === 'login')) {
      return next();
    }

    // A quick check to see if we have an access token present.
    if (!this.auth.getAccessToken()) {
      return next.cancel(new Redirect('login'));
    }

    this.account
      .get()
      .then(function(data) {
        console.log('logged-in');
        return next();
      })
      .catch(function() {
        console.log('not logged');
        return next.cancel(new Redirect('login'));
      });

  }
}
