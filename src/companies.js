import {inject} from 'aurelia-framework';
import {CompaniesAPI} from './services/companies';

@inject(CompaniesAPI)
export class Companies {

  companies = null;

  constructor(companiesAPI) {
    this.companiesAPI = companiesAPI;
  }

  activate() {
    return this.companiesAPI
      .get()
      .then(response => {
        this.companies = response;
      });
  }
}
