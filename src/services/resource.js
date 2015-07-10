import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './backend-http';

@inject(EventAggregator, WebAPI)
export class ResourceAbstract {

  // Internal cache.
  cache = null;
  resourceName = null;

  constructor(eventAggregator, http) {
    this.eventAggregator = eventAggregator;
    this.http = http.http;

    this.subscribeEvents();
  }

  get() {
    var cache = this.getCache();
    if (!!cache) {
      console.log(this.resourceName + ' from cache');
      return Promise.resolve(cache);
    }

    console.log(this.resourceName + ' from server');
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
