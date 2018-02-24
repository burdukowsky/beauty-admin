import {User} from './user';

export class UsersResponse {
  users: Array<User>;
  total: number;

  constructor(users: Array<User>, total: number) {
    this.users = users;
    this.total = total;
  }
}
