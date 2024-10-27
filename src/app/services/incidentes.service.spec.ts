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
      id: '1',
      cliente: {
        id: '1',
        email: '',
        username: '',
        password: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        direccion: '',
        gestortier: '',
        token: '',
        rol: {
          id: 4,
          nombre: 'cliente',
          permisos: []
        }
      },
      fechacreacion: '2023-10-01',
      usuario: {
        id: '2',
        email: '',
        username: '',
        password: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        direccion: '',
        gestortier: '',
        token: '',
        rol: {
          id: 2,
          nombre: 'cliente',
          permisos: []
        }
      },
      correo: 'prueba@prueba.com',
      direccion: 'Test address',
      telefono: '123456789',
      descripcion: 'Test description',
      prioridad: 'High',
      estado: 'Open',
      comentarios: 'Test comments',
      canal: 'web',
      tipo: 'icidencia'
    };
    subscriptions.push(
      service.crearIncidente(incidenteData).subscribe((response) => {
        expect(response).toEqual(dummyResponse);
      })
    );
    const req = httpMock.expectOne(`${environment.urlApi}${environment.portCrearIncidentes}/incidentes`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      id: incidenteData.id,
      cliente: incidenteData.cliente,
      fechacreacion: incidenteData.fechacreacion,
      usuario: incidenteData.usuario,
      correo: incidenteData.correo,
      direccion: incidenteData.direccion,
      telefono: incidenteData.telefono,
      descripcion: incidenteData.descripcion,
      prioridad: incidenteData.prioridad,
      estado: incidenteData.estado,
      comentarios: incidenteData.comentarios,
      canal: incidenteData.canal,
      tipo: incidenteData.tipo
    });
    req.flush(dummyResponse);
  });

  it('should get incidents', () => {
    const incidenteData = {
      id: '1',
      cliente: {
        id: '1',
        email: '',
        username: '',
        password: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        direccion: '',
        gestortier: '',
        token: '',
        rol: {
          id: 4,
          nombre: 'cliente',
          permisos: []
        }
      },
      fechacreacion: '2023-10-01',
      usuario: {
        id: '2',
        email: '',
        username: '',
        password: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        direccion: '',
        gestortier: '',
        token: '',
        rol: {
          id: 2,
          nombre: 'cliente',
          permisos: []
        }
      },
      correo: 'prueba@prueba.com',
      direccion: 'Test address',
      telefono: '123456789',
      descripcion: 'Test description',
      prioridad: 'High',
      estado: 'Open',
      comentarios: 'Test comments',
      canal: 'web',
      tipo: 'icidencia'
    };
    subscriptions.push(
      service.getIncidencias().subscribe((response) => {
        expect(response).toEqual([incidenteData]);
      })
    );
    const req = httpMock.expectOne(`${environment.urlApi}${environment.portConsulIncidencias}/incidentes`);
    expect(req.request.method).toBe('GET');
    req.flush([incidenteData]);
  });
});
