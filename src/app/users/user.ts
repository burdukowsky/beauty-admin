import {Role} from './role';
import {Gender} from './gender.enum';

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
}
