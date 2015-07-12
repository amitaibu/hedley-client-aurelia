import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './backend-http';

@inject(EventAggregator, WebAPI)
export class ResourceAbstract {

  // Internal cache.
  cache = {};
  resourceName = null;

  constructor(eventAggregator, http) {
    this.eventAggregator = eventAggregator;
    this.http = http.http;

    this.subscribeEvents();
  }

  get(params) {
    var cache = this.getCache(params);
    if (!!cache) {
      console.log(this.resourceName + ' from cache');
      return Promise.resolve(cache);
    }

    params = params || {};
    console.log(this.resourceName + ' from server');
    return this.http
      .configure(x => {
        x.withParams(params);
      })
      .get(this.endpoint)
      .then(response => {
        var data = JSON.parse(response.response).data;
        this.setCache(data, params);
        return data;
      });
  }

  setCache(data, params) {
    var hash = JSON.stringify(params);
    this.cache[this.resourceName] = this.cache[this.resourceName] || {}
    this.cache[this.resourceName][hash] = data;
  }

  getCache(params) {
    var hash = JSON.stringify(params);
    return this.cache[this.resourceName] ? this.cache[this.resourceName][hash] : false;
  }

  subscribeEvents() {
    this.eventAggregator.subscribe('clear_cache', payload => {
      console.log('clear cache companies');
      this.cache = {};
    });
  }
}
