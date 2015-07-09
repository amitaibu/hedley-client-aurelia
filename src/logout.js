import {inject} from 'aurelia-framework';
import {Auth} from './services/auth';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Auth, EventAggregator)
export class Logout {

  constructor(auth, eventAggregator) {
    // Subscribe to events.
    auth.subscribeEvents();

    this.auth = auth;
    this.eventAggregator = eventAggregator;

    auth.removeAccessToken();
    this.eventAggregator.publish('user_logout');
    this.eventAggregator.publish('clear_cache');
  }
}
