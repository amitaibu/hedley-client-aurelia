import {inject} from 'aurelia-framework';
import {EventsAPI} from '../services/events';

@inject(EventsAPI)
export class EventDetail {

  event = null;

  constructor(eventsAPI) {
    this.eventsAPI = eventsAPI;
  }

  activate(params, routeConfig, navigationInstruction) {
    return this.eventsAPI
      .get(params.eventId)
      .then(response => {
        this.event = response[0];
      });
  }
}
