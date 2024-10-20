import {TestBed} from '@angular/core/testing';
import {IncidentesService} from './incidentes.service';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {environment} from 'src/environments/environment';
import {provideHttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

describe('IncidentesService', () => {
  let service: IncidentesService;
  let httpMock: HttpTestingController;
  const subscriptions: Subscription[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncidentesService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(IncidentesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    subscriptions.forEach((s) => s.unsubscribe());
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
    subscriptions.push(
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
        })
    );
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
});
