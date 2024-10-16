import {TestBed} from '@angular/core/testing';

import {IncidentesService} from './incidentes.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from 'src/environments/environment';

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

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an incident', () => {
    const dummyResponse = {success: true};
    const incidenteData = {
      cliente: 'Cliente 1',
      fechacreacion: '2024-10-13 23:04:30',
      usuario: 'Pepito Perez',
      correo: 'pepitoperez@pepitoperez.com',
      direccion: 'Dirección de Pepito Perez',
      telefono: '3005552222',
      descripcion: 'Incidente de prueba',
      prioridad: 'Media',
      estado: 'Abierto',
      comentarios: 'Comentario de incidente de prueba'
    };

    service
      .crearIncidente(
        incidenteData.cliente,
        incidenteData.fechacreacion,
        incidenteData.usuario,
        incidenteData.correo,
        incidenteData.direccion,
        incidenteData.telefono,
        incidenteData.descripcion,
        incidenteData.prioridad,
        incidenteData.estado,
        incidenteData.comentarios
      )
      .subscribe((response) => {
        expect(response).toEqual(dummyResponse);
      });

    const req = httpMock.expectOne(`${environment.apiUrlCrearIncidente}/incidentes`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      cliente: incidenteData.cliente,
      fechacreacion: incidenteData.fechacreacion,
      usuario: incidenteData.usuario,
      correo: incidenteData.correo,
      direccion: incidenteData.direccion,
      telefono: incidenteData.telefono,
      descripcion: incidenteData.descripcion,
      prioridad: incidenteData.prioridad,
      estado: incidenteData.estado,
      comentarios: incidenteData.comentarios
    });
    req.flush(dummyResponse);
  });

  it('should handle error when creating an incident', () => {
    const dummyError = {status: 400, statusText: 'Bad Request'};
    const incidenteData = {
      cliente: 'Cliente 1',
      fechacreacion: '2024-10-13 23:04:30',
      usuario: 'Pepito Perez',
      correo: 'pepitoperez@pepitoperez.com',
      direccion: 'Dirección de Pepito Perez',
      telefono: '3005552222',
      descripcion: 'Incidente de prueba',
      prioridad: 'Media',
      estado: 'Abierto',
      comentarios: 'Comentario de incidente de prueba'
    };

    service
      .crearIncidente(
        incidenteData.cliente,
        incidenteData.fechacreacion,
        incidenteData.usuario,
        incidenteData.correo,
        incidenteData.direccion,
        incidenteData.telefono,
        incidenteData.descripcion,
        incidenteData.prioridad,
        incidenteData.estado,
        incidenteData.comentarios
      )
      .subscribe(
        () => fail('should have failed with the 400 error'),
        (error) => {
          expect(error.status).toEqual(400);
        }
      );
    const req = httpMock.expectOne(`${environment.apiUrlCrearIncidente}/incidentes`);
    expect(req.request.method).toBe('POST');
    req.flush(null, dummyError);
  });
});
