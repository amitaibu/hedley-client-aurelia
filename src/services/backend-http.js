import {inject} from 'aurelia-framework';
import {Auth} from './auth';
import {Config} from '../config/config';
import {HttpClient} from 'aurelia-http-client';



@inject(Auth, Config)
export class WebAPI {

  constructor(auth, config){
    this.auth = auth;
    this.http = new HttpClient();

    this.http
      .configure(x => {
        x.withBaseUrl(config.backendUrl);
        x.withHeader('access-token', auth.getAccessToken());
    });
  }
}
