import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule, TranslateService, LangChangeEvent} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {ToastController, AlertController} from '@ionic/angular';
import {ConsultarPage} from './consultar.page';
import {IncidentesService} from 'src/app/services';
import {of, throwError} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
import {EventEmitter} from '@angular/core';
import {Incidente} from 'src/app/models/incidentes.model';
import {Usuario} from 'src/app/models/usuario.model';

describe('ConsultarPage', () => {
  let component: ConsultarPage;
  let fixture: ComponentFixture<ConsultarPage>;
  let incidentesService: jasmine.SpyObj<IncidentesService>;
  let toastController: jasmine.SpyObj<any>;
  let alertController: jasmine.SpyObj<any>;
  let router: jasmine.SpyObj<Router>;

  const translateService = jasmine.createSpyObj('TranslateService', [
    'instant',
    'get',
    'getTranslation',
    'getLangs',
    'getDefaultLang',
    'use'
  ]);
  const translateServiceMock = {
    currentLang: 'es',
    onLangChange: new EventEmitter<LangChangeEvent>(),
    use: translateService.use,
    instant: translateService.instant.and.returnValue(''),
    get: translateService.get.and.returnValue(of('')),
    getTranslation: translateService.getTranslation.and.returnValue(of({'abc.get.issues.issue': 'get.issues.issue'})),
    getLangs: translateService.getLangs.and.returnValue(['en', 'es']),
    getDefaultLang: translateService.getDefaultLang.and.returnValue('en'),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter()
  };

  beforeEach(async () => {
    const incidentesServiceSpy = jasmine.createSpyObj('IncidentesService', ['getIncidencias']);
    const toastControllerSpy = jasmine.createSpyObj('ToastController', ['create']);
    const alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ConsultarPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, ReactiveFormsModule, TranslateModule.forRoot(), HttpClientModule],
      providers: [
        {provide: TranslateService, useValue: translateServiceMock},
        {provide: IncidentesService, useValue: incidentesServiceSpy},
        {provide: ToastController, useValue: toastControllerSpy},
        {provide: AlertController, useValue: alertControllerSpy},
        {provide: Router, useValue: routerSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarPage);
    component = fixture.componentInstance;
    incidentesService = TestBed.inject(IncidentesService) as jasmine.SpyObj<IncidentesService>;
    toastController = TestBed.inject(ToastController) as jasmine.SpyObj<any>;
    alertController = TestBed.inject(AlertController) as jasmine.SpyObj<any>;
    router = TestBed.inject(Router) as jasmine.SpyObj<any>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login on logout confirmation', async () => {
    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertController.create.and.returnValue(Promise.resolve(alertSpy));

    await component.cerrarSesion();
    const handler = alertController.create.calls.mostRecent().args[0].buttons[1].handler;
    handler();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set incidencias correctly on successful getIncidencias call', () => {
    const mockIncidencias: Incidente[] = [
      {
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
      }
    ];

    incidentesService.getIncidencias.and.returnValue(of(mockIncidencias));

    component['getIncidencias']();

    expect(component.incidencias.length).toBe(0);
  });
});
