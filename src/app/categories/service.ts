import {Category} from './category';

export class Service {
  id: number;
  name: string;
  description: string;
  category: Category;

  public static buildFromResponse(response: any): Service {
    const category = response.category ? Category.buildFromResponse(response.category) : null;
    return new Service(response.id, response.name, response.description, category);
  }

  constructor(id: number, name: string, description: string, category: Category) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
  }
}
