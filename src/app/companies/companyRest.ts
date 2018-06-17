import {Company} from './company';
import {environment} from '../../environments/environment';

export class CompanyRest {
  id: number;
  name: string;
  description: string;
  companyType: string;
  owner: string;

  constructor(company: Company) {
    this.id = company.id;
    this.name = company.name;
    this.description = company.description;
    this.companyType = company.companyType;
    this.owner = company.owner ? `${environment.apiEndpoint}/users/${company.owner.id}` : undefined;
  }
}
