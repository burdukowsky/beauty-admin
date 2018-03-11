import {TestBed, inject} from '@angular/core/testing';

import {NgbDateStringAdapter} from './ngb-date-string-adapter';

describe('NgbDateStringAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbDateStringAdapter]
    });
  });

  it('should be created', inject([NgbDateStringAdapter], (service: NgbDateStringAdapter) => {
    expect(service).toBeTruthy();
  }));
});
