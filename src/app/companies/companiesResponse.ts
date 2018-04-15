import {Company} from './company';

export class CompaniesResponse {
  companies: Array<Company>;
  total: number;

  constructor(companies: Array<Company>, total: number) {
    this.companies = companies;
    this.total = total;
  }
}
