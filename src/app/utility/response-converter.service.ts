import {Injectable} from '@angular/core';
import {User} from '../users/user';
import {Role} from '../users/role';
import {Company} from '../companies/company';
import {AdminMetrics} from '../metrics/adminMetrics';

@Injectable()
export class ResponseConverterService {

  public static toUser(response: any): User {
    return new User(response.id, response.email, response.password, response.firstName, response.middleName, response.lastName,
      response.dateBirth, response.gender, response.roles.map(role => new Role(role.name)));
  }

  public static toCompany(response: any): Company {
    return new Company(response.id, response.name, response.description, null);
  }

  public static toAdminMetrics(response: any): AdminMetrics {
    return new AdminMetrics(response.usersCount, response.companiesCount);
  }

  constructor() {
  }

}
