import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule, TranslateService, LangChangeEvent} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {ToastController, AlertController} from '@ionic/angular';
import {CrearPage} from './crear.page';
import {AuthService, IncidentesService} from 'src/app/services';
import {of, throwError} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
import {EventEmitter} from '@angular/core';
import {Usuario} from 'src/app/models/usuario.model';
import {Role} from 'src/app/models/role';

describe('CrearPage', () => {
  let component: CrearPage;
  let fixture: ComponentFixture<CrearPage>;
  let authService: jasmine.SpyObj<AuthService>;
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
    getTranslation: translateService.getTranslation.and.returnValue(of({'abc.crearIncidenciaAppMobile': 'crearIncidenciaAppMobile'})),
    getLangs: translateService.getLangs.and.returnValue(['en', 'es']),
    getDefaultLang: translateService.getDefaultLang.and.returnValue('en'),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter()
  };

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUsers']);
    const incidentesServiceSpy = jasmine.createSpyObj('IncidentesService', ['crearIncidente']);
    const toastControllerSpy = jasmine.createSpyObj('ToastController', ['create']);
    const alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CrearPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, ReactiveFormsModule, TranslateModule.forRoot(), HttpClientModule],
      providers: [
        {provide: TranslateService, useValue: translateServiceMock},
        {provide: IncidentesService, useValue: incidentesServiceSpy},
        {provide: ToastController, useValue: toastControllerSpy},
        {provide: AlertController, useValue: alertControllerSpy},
        {provide: Router, useValue: routerSpy},
        {provide: AuthService, useValue: authServiceSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    incidentesService = TestBed.inject(IncidentesService) as jasmine.SpyObj<IncidentesService>;
    toastController = TestBed.inject(ToastController) as jasmine.SpyObj<any>;
    alertController = TestBed.inject(AlertController) as jasmine.SpyObj<any>;
    router = TestBed.inject(Router) as jasmine.SpyObj<any>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.crearIncidenciaForm).toBeDefined();
    const controls = component.crearIncidenciaForm.controls;
    expect(controls['customer']).toBeDefined();
    expect(controls['userName']).toBeDefined();
    expect(controls['email']).toBeDefined();
    expect(controls['userAddress']).toBeDefined();
    expect(controls['phoneNumber']).toBeDefined();
    expect(controls['issueDescription']).toBeDefined();
    expect(controls['issuePriority']).toBeDefined();
    expect(controls['issueType']).toBeDefined();
    expect(controls['issueComment']).toBeDefined();
  });

  it('should call submit on confirmation', async () => {
    component.crearIncidenciaForm.controls['customer'].setValue('Test Customer');
    component.crearIncidenciaForm.controls['userName'].setValue('Test User');
    component.crearIncidenciaForm.controls['email'].setValue('test@example.com');
    component.crearIncidenciaForm.controls['userAddress'].setValue('Test Address');
    component.crearIncidenciaForm.controls['phoneNumber'].setValue('1234567890');
    component.crearIncidenciaForm.controls['issueDescription'].setValue('Test Description');
    component.crearIncidenciaForm.controls['issuePriority'].setValue('High');
    component.crearIncidenciaForm.controls['issueType'].setValue('Issue');
    component.crearIncidenciaForm.controls['issueComment'].setValue('Test Comment');

    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertController.create.and.returnValue(Promise.resolve(alertSpy));

    spyOn(component, 'submit');

    await component.confirmarCrearIncidente();
    const handler = alertController.create.calls.mostRecent().args[0].buttons[1].handler;
    handler();
    expect(component.submit).toHaveBeenCalled();
  });

  it('should call incidentesService.crearIncidente on submit', async () => {
    spyOn(component.crearIncidenciaForm, 'reset');

    component.crearIncidenciaForm.controls['customer'].setValue('Test Customer');
    component.crearIncidenciaForm.controls['userName'].setValue('Test User');
    component.crearIncidenciaForm.controls['email'].setValue('test@example.com');
    component.crearIncidenciaForm.controls['userAddress'].setValue('Test Address');
    component.crearIncidenciaForm.controls['phoneNumber'].setValue('1234567890');
    component.crearIncidenciaForm.controls['issueDescription'].setValue('Test Description');
    component.crearIncidenciaForm.controls['issuePriority'].setValue('High');
    component.crearIncidenciaForm.controls['issueType'].setValue('Issue');
    component.crearIncidenciaForm.controls['issueComment'].setValue('Test Comment');

    incidentesService.crearIncidente.and.returnValue(of({}));

    await component.submit();
    expect(incidentesService.crearIncidente).toHaveBeenCalled();
    component.crearIncidenciaForm.reset();
    router.navigate(['/home/consultar_incidentes']);
    expect(component.crearIncidenciaForm.reset).toHaveBeenCalled();
  });

  it('should show error toast on failed submit', async () => {
    component.crearIncidenciaForm.controls['customer'].setValue('Test Customer');
    component.crearIncidenciaForm.controls['userName'].setValue('Test User');
    component.crearIncidenciaForm.controls['email'].setValue('test@example.com');
    component.crearIncidenciaForm.controls['userAddress'].setValue('Test Address');
    component.crearIncidenciaForm.controls['phoneNumber'].setValue('1234567890');
    component.crearIncidenciaForm.controls['issueDescription'].setValue('Test Description');
    component.crearIncidenciaForm.controls['issuePriority'].setValue('High');
    component.crearIncidenciaForm.controls['issueType'].setValue('Issue');
    component.crearIncidenciaForm.controls['issueComment'].setValue('Test Comment');

    incidentesService.crearIncidente.and.returnValue(throwError({error: {message: 'Error'}}));
    const toastSpy = jasmine.createSpyObj('HTMLIonToastElement', ['present']);
    toastController.create.and.returnValue(Promise.resolve(toastSpy));

    await component.submit();
    expect(toastController.create).toHaveBeenCalled();
    expect(toastSpy.present).toHaveBeenCalled();
  });

  it('should show error toast if form is invalid on confirm', async () => {
    component.crearIncidenciaForm.controls['customer'].setValue('');
    const toastSpy = jasmine.createSpyObj('HTMLIonToastElement', ['present']);
    toastController.create.and.returnValue(Promise.resolve(toastSpy));

    await component.confirmarCrearIncidente();
    expect(toastController.create).toHaveBeenCalledWith({
      message: '',
      duration: 5000,
      cssClass: 'fs-normal',
      color: 'danger',
      icon: 'alert-circle-outline',
      position: 'bottom',
      swipeGesture: 'vertical'
    });
    expect(toastSpy.present).toHaveBeenCalled();
  });

  it('should show confirmation alert if form is valid on confirm', async () => {
    component.crearIncidenciaForm.controls['customer'].setValue('Test Customer');
    component.crearIncidenciaForm.controls['userName'].setValue('Test User');
    component.crearIncidenciaForm.controls['email'].setValue('test@example.com');
    component.crearIncidenciaForm.controls['userAddress'].setValue('Test Address');
    component.crearIncidenciaForm.controls['phoneNumber'].setValue('1234567890');
    component.crearIncidenciaForm.controls['issueDescription'].setValue('Test Description');
    component.crearIncidenciaForm.controls['issuePriority'].setValue('High');
    component.crearIncidenciaForm.controls['issueType'].setValue('Issue');
    component.crearIncidenciaForm.controls['issueComment'].setValue('Test Comment');

    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertController.create.and.returnValue(Promise.resolve(alertSpy));

    await component.confirmarCrearIncidente();
    expect(alertController.create).toHaveBeenCalledWith({
      header: '',
      message: '',
      buttons: [
        {
          text: '',
          role: 'cancel',
          cssClass: 'secondary',
          handler: jasmine.any(Function)
        },
        {
          text: '',
          handler: jasmine.any(Function)
        }
      ]
    });
    expect(alertSpy.present).toHaveBeenCalled();
  });

  it('should show logout confirmation alert on cerrarSesion', async () => {
    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertController.create.and.returnValue(Promise.resolve(alertSpy));

    await component.cerrarSesion();
    expect(alertController.create).toHaveBeenCalledWith({
      header: '',
      message: '',
      buttons: [
        {
          text: '',
          role: 'cancel',
          cssClass: 'secondary',
          handler: jasmine.any(Function)
        },
        {
          text: '',
          handler: jasmine.any(Function)
        }
      ]
    });
    expect(alertSpy.present).toHaveBeenCalled();
  });

  it('should navigate to login on logout confirmation', async () => {
    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertController.create.and.returnValue(Promise.resolve(alertSpy));

    await component.cerrarSesion();
    const handler = alertController.create.calls.mostRecent().args[0].buttons[1].handler;
    handler();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to /home/consultar_incidentes when home is called', () => {
    component.home();
    expect(router.navigate).toHaveBeenCalledWith(['/home/consultar_incidentes']);
  });

  it('should set clientes when role is 4', () => {
    const mockUsers: Usuario[] = [
      {
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
      }
    ];

    authService.getUsers.and.returnValue(of(mockUsers));

    component.loadUsersByRol('4');

    expect(authService.getUsers).toHaveBeenCalledWith('4');
    expect(component.clientes).toEqual(mockUsers);
    expect(component.isLoading).toBeFalse();
  });

  it('should call initializeTranslations and loadUsersByRol on ngOnInit', () => {
    spyOn(component, 'initializeTranslations');
    spyOn(component, 'loadUsersByRol');

    component.ngOnInit();

    expect(component.initializeTranslations).toHaveBeenCalled();
    expect(component.loadUsersByRol).toHaveBeenCalledWith('4');
  });

  it('should set hasLoadTranslations to true when translation is loaded', () => {
    const mockTranslation = {key: 'value'};
    translateService.getTranslation.and.returnValue(of(mockTranslation));

    component.initializeTranslations();

    expect(translateService.getTranslation).toHaveBeenCalledWith('es');
    expect(component.hasLoadTranslations).toBeTrue();
  });

  it('should set hasLoadTranslations to false when translation is not loaded', () => {
    translateService.getTranslation.and.returnValue(of(null));

    component.initializeTranslations();

    expect(translateService.getTranslation).toHaveBeenCalledWith('es');
    expect(component.hasLoadTranslations).toBeFalse();
  });

  it('should navigate to /home/consultar_incidentes when home is called', () => {
    component.home();
    expect(router.navigate).toHaveBeenCalledWith(['/home/consultar_incidentes']);
  });
});
