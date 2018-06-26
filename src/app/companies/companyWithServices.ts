import {Company} from './company';
import {Service} from '../categories/service';

export class CompanyWithServices extends Company {
  services: Array<Service>;

  constructor(company: Company, services: Array<Service>) {
    super(
      company.id,
      company.name,
      company.description,
      company.timetable,
      company.site,
      company.phone,
      company.address,
      company.rating,
      company.image,
      company.companyType,
      company.owner);
    this.services = services;
  }
}
