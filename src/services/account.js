import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './backend-http';

@inject(EventAggregator, WebAPI)
export class Account {

  // Internal cache.
  cache = null;

  constructor(eventAggregator, http) {
    this.eventAggregator = eventAggregator;
    this.http = http.http;

    this.subscribeEvents();
  }

  get() {
    var cache = this.getCache();
    if (!!cache) {
      return Promise.resolve(cache);
    }

    return this.http
      .get('api/v1.0/me')
      .then(response => {
        var data = JSON.parse(response.response).data[0];
        this.setCache(data);
        return data;
      });
  }

  setCache(data) {
    this.cache = data;
  }

  getCache() {
    return this.cache;
  }

  subscribeEvents() {
    this.eventAggregator.subscribe('clear_cache', payload => {
      console.log('clear cache account');
      this.cache = null;
    });
  }
}
