import {Injectable} from '@angular/core';

@Injectable()
export class UtilityService {

  public static removeUrlProtocol(url: string): string {
    return url.replace(new RegExp('(^\\w+:|^)\\/\\/'), '');
  }

  public static isDate(value: any): boolean {
    return value && typeof value.getFullYear === 'function';
  }

  public static addLeadingZeros(value: number, size: number): string {
    let s = String(value);
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

  constructor() {
  }

}
