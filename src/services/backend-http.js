import {inject} from 'aurelia-framework';
import {Auth} from './auth';
import {Config} from '../config/config';
import {EventAggregator} from 'aurelia-event-aggregator';

import {HttpClient} from 'aurelia-http-client';



@inject(Auth, Config, EventAggregator)
export class WebAPI {

  constructor(auth, config, eventAggregator) {
    this.auth = auth;
    this.config = config;
    this.eventAggregator = eventAggregator;

    this.http = new HttpClient();
    this.initHttp();

    this.subscribeEvents();
  }

  initHttp() {
    this.http
      .configure(x => {
        x.withBaseUrl(this.config.backendUrl);
        x.withHeader('access-token', this.auth.getAccessToken());
    });
  }

  subscribeEvents() {
    this.eventAggregator.subscribe('user_login', payload => {
      this.initHttp();
    });

    this.eventAggregator.subscribe('user_logout', payload => {
      this.initHttp();
    });
  }
}
