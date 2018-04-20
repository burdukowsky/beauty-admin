import {TestBed, inject} from '@angular/core/testing';

import {ResponseConverterService} from './response-converter.service';

describe('ResponseConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResponseConverterService]
    });
  });

  it('should be created', inject([ResponseConverterService], (service: ResponseConverterService) => {
    expect(service).toBeTruthy();
  }));
});
