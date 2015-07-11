import {inject} from 'aurelia-framework';
import {CompaniesAPI} from '../services/companies';

@inject(CompaniesAPI)
export class Events {

  companies = null;

  constructor(companiesAPI) {
    this.companiesAPI = companiesAPI;
  }

  activate(params, routeConfig, navigationInstruction) {
    console.log(params.companyId);

    return this.companiesAPI
      .get()
      .then(response => {
        this.companies = response;
      });
  }
}
