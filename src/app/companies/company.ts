import {User} from '../users/user';

export class Company {
  id: number;
  name: string;
  description: string;
  owner: User;

  constructor(id: number, name: string, description: string, owner: User) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.owner = owner;
  }
}
