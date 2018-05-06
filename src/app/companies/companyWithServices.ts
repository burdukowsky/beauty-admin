import {Company} from './company';
import {Service} from '../categories/service';

export class CompanyWithServices extends Company {
  services: Array<Service>;

  constructor(company: Company, services: Array<Service>) {
    super(company.id, company.name, company.description, company.owner);
    this.services = services;
  }
}
