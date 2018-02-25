import {Role} from './role';

export class User {
  id: number;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateBirth: Date;
  gender: Gender;
  roles: Array<Role>;
}
