import {TestBed} from '@angular/core/testing';

import {IncidentesService} from './incidentes.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('IncidentesService', () => {
  let service: IncidentesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IncidentesService]
    });
    service = TestBed.inject(IncidentesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
