import {Company} from './company';
import {environment} from '../../environments/environment';

export class CompanyRest {
  id: number;
  name: string;
  description: string;
  timetable: string;
  site: string;
  phone: string;
  address: string;
  rating: number;
  image: string;
  companyType: string;
  owner: string;

  constructor(company: Company) {
    this.id = company.id;
    this.name = company.name;
    this.description = company.description;
    this.timetable = company.timetable;
    this.site = company.site;
    this.phone = company.phone;
    this.address = company.address;
    this.rating = company.rating;
    this.image = company.image;
    this.companyType = company.companyType;
    this.owner = company.owner ? `${environment.apiEndpoint}/users/${company.owner.id}` : undefined;
  }
}
