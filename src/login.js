import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Config} from '../config/config';
import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';

import {Auth} from './services/auth';


@inject(Auth, Config, EventAggregator, HttpClient, Router)
export class Login {

  // Default credentials.
  credentials = {
    username: 'demo',
    pass: '1234'
  }

  constructor(auth, config, eventAggregator, http, router) {
    // Subscribe to events.
    auth.subscribeEvents();

    this.auth = auth;
    this.config = config;
    this.eventAggregator = eventAggregator;
    this.http = http;
    this.router = router;
  }

  get canLogin() {
    return this.credentials.username && this.credentials.pass && !this.http.isRequesting;
  }

  login() {
    return this.http
      .configure(x => {
        x.withBaseUrl(this.config.backendUrl);
        x.withHeader('Authorization', 'Basic ' + this.auth.getBase64FromBaseAuth(this.credentials));
      })
      .get('api/login-token')
      .then(response => {
        // Add access token to the localStorage.
        var accessToken = JSON.parse(response.response).access_token;
        localStorage.setItem('access_token', accessToken);

        // Notify user has logged in.
        this.eventAggregator.publish('user_login', JSON.parse(response.response));
      });
  }
}
