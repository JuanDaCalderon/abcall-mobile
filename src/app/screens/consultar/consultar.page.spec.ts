import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConsultarPage} from './consultar.page';
import {LangChangeEvent, TranslateModule, TranslateService} from '@ngx-translate/core';
import {IncidentesService} from 'src/app/services/incidentes.service';
import {Router} from '@angular/router';
import {AlertController, IonicModule} from '@ionic/angular';
import {EventEmitter} from '@angular/core';
import {of} from 'rxjs';
import {ReactiveFormsModule} from '@angular/forms';
import {Usuario} from 'src/app/models/usuario.model';
import {Incidente} from 'src/app/models/incidentes.model';
import {CrearPage} from '../crear/crear.page';

describe('ConsultarPage', () => {
  let component: ConsultarPage;
  let fixture: ComponentFixture<ConsultarPage>;
  let router: Router;
  let alertController: jasmine.SpyObj<any>;
  const consultarService = jasmine.createSpyObj('IncidentesService', ['getIncidencias']);
  const consultarServiceMock = {
    getIncidencias: consultarService.getIncidencias.and.returnValue(of({id: 1}))
  };
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
    getTranslation: translateService.getTranslation.and.returnValue(of({'abc.crearIncidenciaAppMobile': 'crearIncidenciaAppMobile'})),
    getLangs: translateService.getLangs.and.returnValue(['en', 'es']),
    getDefaultLang: translateService.getDefaultLang.and.returnValue('en'),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter()
  };
  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    await TestBed.configureTestingModule({
      declarations: [ConsultarPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [
        {provide: TranslateService, useValue: translateServiceMock},
        {provide: IncidentesService, useValue: consultarServiceMock},
        {provide: Router, useValue: routerSpy},
        {provide: AlertController, useValue: alertControllerSpy}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ConsultarPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    alertController = TestBed.inject(AlertController) as jasmine.SpyObj<any>;
    localStorage.setItem('usuario', JSON.stringify({id: '1'}));
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

  it('should filter incidencias by logged-in user', () => {
    const mockUsuario: Usuario = {
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
      rol: {id: 4, nombre: '', permisos: []}
    };

    const mockIncidencias: Incidente = {
      id: '1',
      estado: 'open',
      prioridad: 'high',
      cliente: mockUsuario,
      usuario: mockUsuario,
      comentarios: '',
      correo: '',
      descripcion: '',
      direccion: '',
      fechacreacion: '',
      telefono: '',
      tipo: '',
      canal: '',
      gestor: ''
    };

    localStorage.setItem('usuario', JSON.stringify(mockUsuario));
    consultarService.getIncidencias.and.returnValue(of(mockIncidencias));

    fixture.detectChanges();
    expect(consultarService.getIncidencias).toHaveBeenCalled();
    expect(component.incidencias.length).toBe(0);
  });
});
