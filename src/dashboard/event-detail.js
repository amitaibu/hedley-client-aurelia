import {inject} from 'aurelia-framework';
import {EventsAPI} from '../services/events';

@inject(EventsAPI)
export class EventDetail {

  eventDetail = null;

  isLoading = false;

  constructor(eventsAPI) {
    this.eventsAPI = eventsAPI;
  }

  activate(params, routeConfig, navigationInstruction) {

    this.isLoading = true;

    return this.eventsAPI
      .get(params.eventId)
      .then(response => {
        this.isLoading = false;
        this.eventDetail = response[0];
      });
  }
}
