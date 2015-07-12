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

  get(id, params) {
    id = id || '';
    params = params || {};
    var cache = this.getCache(id, params);
    if (!!cache) {
      console.log(this.resourceName + ' from cache');
      return Promise.resolve(cache);
    }

    console.log(this.resourceName + ' from server');

    var promise = this.http
      .configure(x => {
        x.withParams(params);
      })
      // Always add the ID, as it might be also an empty string.
      .get(this.endpoint + '/' + id)
      .then(response => {
        var data = JSON.parse(response.response).data;
        // Re-cache the resolved data.
        this.setCache(data, id, params);
        return data;
      });

    this.setCache(promise, id, params);

    return promise;
  }

  /**
   * @todo: Set cache of resolved data, or of the promise.
   *
   * @todo: Since data is can be a promise we avoid a race condition where the
   * same query is called twice. On the first call we cache the promise, and when
   * resolved, we re-cache the expanded value.
   */
  setCache(data, id, params) {
    var hash = id + JSON.stringify(params);
    this.cache[this.resourceName] = this.cache[this.resourceName] || {}
    this.cache[this.resourceName][hash] = data;
  }

  getCache(id, params) {
    var hash = id + JSON.stringify(params);
    this.cache[this.resourceName] = this.cache[this.resourceName] || {};
    return this.cache[this.resourceName] ? this.cache[this.resourceName][hash] : false;
  }

  subscribeEvents() {
    this.eventAggregator.subscribe('clear_cache', payload => {
      console.log('clear cache companies');
      this.cache = {};
    });
  }
}
