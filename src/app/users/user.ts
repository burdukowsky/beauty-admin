import {Role} from './role';
import {Gender} from './gender.enum';
import {RoleEnum} from './role.enum';

export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateBirth: Date;
  gender: Gender;
  roles: Array<Role>;

  public static buildFromResponse(response: any): User {
    return new User(response.id, response.email, response.password, response.firstName, response.middleName, response.lastName,
      response.dateBirth, response.gender, response.roles.map(role => new Role(role.name)));
  }

  constructor(id: number,
              email: string,
              password: string,
              firstName: string,
              middleName: string,
              lastName: string,
              dateBirth: Date,
              gender: Gender,
              roles: Array<Role>) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.dateBirth = dateBirth;
    this.gender = gender;
    this.roles = roles;
  }

  public getFullName(): string {
    return [this.firstName, this.lastName].join(' ');
  }

  public hasRole(role: RoleEnum): boolean {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].name === role) {
        return true;
      }
    }
    return false;
  }
}
