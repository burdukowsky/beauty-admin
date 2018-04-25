import {User} from '../users/user';

export class Company {
  id: number;
  name: string;
  description: string;
  owner: User;

  public static buildFromResponse(response: any): Company {
    const owner = response.owner ? User.buildFromResponse(response.owner) : null;
    return new Company(response.id, response.name, response.description, owner);
  }

  constructor(id: number, name: string, description: string, owner: User) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.owner = owner;
  }
}
