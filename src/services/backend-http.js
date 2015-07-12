import {inject, transient} from 'aurelia-framework';
import {Auth} from './auth';
import {Config} from '../config/config';
import {EventAggregator} from 'aurelia-event-aggregator';

import {HttpClient} from 'aurelia-http-client';


// Make sure the service is not singleton, as each time we may change the
// withParams value, an we don't want it to persist.
@transient()
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

  /**
   * Re-add the "withHeader" with access token, in case of login, or logout. 
   */
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
