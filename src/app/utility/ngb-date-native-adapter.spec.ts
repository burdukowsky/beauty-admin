import {TestBed, inject} from '@angular/core/testing';

import {NgbDateNativeAdapter} from './ngb-date-native-adapter';

describe('NgbDateNativeAdapter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbDateNativeAdapter]
    });
  });

  it('should be created', inject([NgbDateNativeAdapter], (service: NgbDateNativeAdapter) => {
    expect(service).toBeTruthy();
  }));
});
