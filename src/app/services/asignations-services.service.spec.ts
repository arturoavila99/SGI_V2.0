import { TestBed } from '@angular/core/testing';

import { AsignationsServicesService } from './asignations-services.service';

describe('AsignationsServicesService', () => {
  let service: AsignationsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignationsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
