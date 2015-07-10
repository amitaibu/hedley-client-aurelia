import {inject} from 'aurelia-framework';
import {CompaniesAPI} from './services/companies';

import {HttpClient} from 'aurelia-http-client';

@inject(CompaniesAPI, HttpClient)
export class Companies {

  companies = null;

  constructor(companiesAPI, http) {
    this.companiesAPI = companiesAPI;
    this.http = http;
  }

  activate() {

    this.http
      .configure(x => {
        x.withBaseUrl('http://localhost/skeleton/www');
        x.withHeader('access-token', 'ditMOMQI0ZPITekzV9SHrt25IUalVrVsnjQMkfQcnbQ');
      })
      .get('api/v1.0/companies')
      .then(response => {
        var data = JSON.parse(response.response).data;
        this.companies = data;
        console.log(data);
      });

    return;

    return this.companiesAPI
      .get()
      .then(response => {
        console.log(response);
        this.companies = response;
      });
  }
}
