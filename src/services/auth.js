import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';

@inject(EventAggregator, Router)
export class Auth {

  constructor(eventAggregator, router) {
    this.eventAggregator = eventAggregator;
    this.router = router;
  }

  setAccessToken(token) {
    localStorage.setItem('access_token', accessToken);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getBase64FromBaseAuth(credentials) {
    return window.btoa(credentials.username + ':' + credentials.pass);
  }

  subscribe() {
    this.eventAggregator.subscribe('user_login', payload => {
      this.router.navigate('my-account');
    });
  }
}
