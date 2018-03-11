import {Injectable} from '@angular/core';
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {UtilityService} from './utility.service';

@Injectable()
export class NgbDateStringAdapter extends NgbDateAdapter<string> {

  fromModel(value: string): NgbDateStruct {
    const date = new Date(value);
    return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
  }

  toModel(date: NgbDateStruct): string {
    if (date) {
      const year = UtilityService.addLeadingZeros(date.year, 4);
      const month = UtilityService.addLeadingZeros(date.month, 2);
      const day = UtilityService.addLeadingZeros(date.day, 2);
      return `${year}-${month}-${day}`;
    }
    return null;
  }

}
