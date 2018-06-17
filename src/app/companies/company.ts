import {User} from '../users/user';
import {CompanyType} from './companyType.enum';

export class Company {
  id: number;
  name: string;
  description: string;
  companyType: CompanyType;
  owner: User;

  public static buildFromResponse(response: any): Company {
    const owner = response.owner ? User.buildFromResponse(response.owner) : null;
    return new Company(response.id, response.name, response.description, response.companyType, owner);
  }

  constructor(id: number, name: string, description: string, companyType: CompanyType, owner: User) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.companyType = companyType;
    this.owner = owner;
  }
}
