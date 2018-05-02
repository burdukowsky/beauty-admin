import {Service} from './service';
import {environment} from '../../environments/environment';

export class ServiceRest {
  id: number;
  name: string;
  description: string;
  category: string;

  constructor(service: Service) {
    this.id = service.id;
    this.name = service.name;
    this.description = service.description;
    this.category = service.category ? `${environment.apiEndpoint}/category/${service.category.id}` : undefined;
  }
}
