import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './backend-http';

@inject(EventAggregator, WebAPI)
export class CompaniesAPI {

  // Internal cache.
  cache = null;

  endpoint = 'api/v1.0/companies';

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
      .get(this.endpoint)
      .then(response => {
        var data = JSON.parse(response.response).data;
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
      console.log('clear cache companies');
      this.cache = null;
    });
  }
}
