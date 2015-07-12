import {inject} from 'aurelia-framework';
import {EventsAPI} from '../services/events';

@inject(EventsAPI)
export class EventDetail {

  events = null;

  constructor(eventsAPI) {
    this.eventsAPI = eventsAPI;
  }

  activate(params, routeConfig, navigationInstruction) {

    var params = {
      'filter[company]': params.companyId,
      // Sort desc.
      sort: '-id'
    };

    return this.eventsAPI
      .get(params)
      .then(response => {
        this.events = response;
      });
  }
}
