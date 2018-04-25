export class Service {
  id: number;
  name: string;
  description: string;

  public static buildFromResponse(response: any): Service {
    return new Service(response.id, response.name, response.description);
  }

  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
