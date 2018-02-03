import {Injectable} from '@angular/core';

@Injectable()
export class UtilityService {

  public static removeUrlProtocol(url: string) {
    return url.replace(new RegExp('(^\\w+:|^)\\/\\/'), '');
  }

  constructor() {
  }

}
