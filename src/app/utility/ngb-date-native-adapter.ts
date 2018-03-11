import {Injectable} from '@angular/core';
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {UtilityService} from './utility.service';

@Injectable()
export class NgbDateNativeAdapter extends NgbDateAdapter<Date> {

  fromModel(value: Date): NgbDateStruct {
    const date = UtilityService.isDate(value) ? value : new Date(value);
    return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
  }

  toModel(date: NgbDateStruct): Date {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }

}
