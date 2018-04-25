import {Service} from './service';

export class Category {
  id: number;
  name: string;
  description: string;
  services: Array<Service>;
  isCollapsed: boolean;

  public static buildFromResponse(response: any): Category {
    return new Category(response.id, response.name, response.description, null);
  }

  constructor(id: number, name: string, description: string, services: Array<Service>) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.services = services;
    this.isCollapsed = true;
  }
}
