import {inject} from 'aurelia-framework';
import {EventsAPI} from '../services/events';

@inject(EventsAPI)
export class Events {

  events = null;

  constructor(eventsAPI) {
    this.eventsAPI = eventsAPI;
  }

  activate(params, routeConfig, navigationInstruction) {
    
    return this.eventsAPI
      .get()
      .then(response => {
        this.events = response;
      });
  }
}
