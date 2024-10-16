import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule, TranslateService, LangChangeEvent} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {ToastController, AlertController} from '@ionic/angular';
import {CrearIncidenteAppMobilePage} from './crear-incidente-app-mobile.page';
import {IncidentesService} from '../../services/incidentes.service';
import {of, throwError} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
import {EventEmitter} from '@angular/core';

describe('CrearIncidenteAppMobilePage', () => {
  let component: CrearIncidenteAppMobilePage;
  let fixture: ComponentFixture<CrearIncidenteAppMobilePage>;
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
    const incidentesServiceSpy = jasmine.createSpyObj('IncidentesService', ['crearIncidente']);
    const toastControllerSpy = jasmine.createSpyObj('ToastController', ['create']);
    const alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CrearIncidenteAppMobilePage],
      imports: [IonicModule.forRoot(), RouterTestingModule, ReactiveFormsModule, TranslateModule.forRoot(), HttpClientModule],
      providers: [
        {provide: TranslateService, useValue: translateServiceMock},
        {provide: IncidentesService, useValue: incidentesServiceSpy},
        {provide: ToastController, useValue: toastControllerSpy},
        {provide: AlertController, useValue: alertControllerSpy},
        {provide: Router, useValue: routerSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearIncidenteAppMobilePage);
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

  it('should initialize the form', () => {
    expect(component.crearIncidenciaForm).toBeDefined();
    const controls = component.crearIncidenciaForm.controls;
    expect(controls['customer']).toBeDefined();
    expect(controls['datetime']).toBeDefined();
    expect(controls['userName']).toBeDefined();
    expect(controls['email']).toBeDefined();
    expect(controls['userAddress']).toBeDefined();
    expect(controls['phoneNumber']).toBeDefined();
    expect(controls['issueDescription']).toBeDefined();
    expect(controls['issuePriority']).toBeDefined();
    expect(controls['issueStatus']).toBeDefined();
  });

  it('should call submit on confirmation', async () => {
    component.crearIncidenciaForm.controls['customer'].setValue('Test Customer');
    component.crearIncidenciaForm.controls['datetime'].setValue(new Date().toISOString());
    component.crearIncidenciaForm.controls['userName'].setValue('Test User');
    component.crearIncidenciaForm.controls['email'].setValue('test@example.com');
    component.crearIncidenciaForm.controls['userAddress'].setValue('Test Address');
    component.crearIncidenciaForm.controls['phoneNumber'].setValue('1234567890');
    component.crearIncidenciaForm.controls['issueDescription'].setValue('Test Description');
    component.crearIncidenciaForm.controls['issuePriority'].setValue('High');
    component.crearIncidenciaForm.controls['issueStatus'].setValue('Open');

    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertController.create.and.returnValue(Promise.resolve(alertSpy));

    spyOn(component, 'submit');

    await component.confirmarCrearIncidente();
    const handler = alertController.create.calls.mostRecent().args[0].buttons[1].handler;
    handler();
    expect(component.submit).toHaveBeenCalled();
  });

  it('should call incidentesService.crearIncidente on submit', async () => {
    component.crearIncidenciaForm.controls['customer'].setValue('Test Customer');
    component.crearIncidenciaForm.controls['datetime'].setValue(new Date().toISOString());
    component.crearIncidenciaForm.controls['userName'].setValue('Test User');
    component.crearIncidenciaForm.controls['email'].setValue('test@example.com');
    component.crearIncidenciaForm.controls['userAddress'].setValue('Test Address');
    component.crearIncidenciaForm.controls['phoneNumber'].setValue('1234567890');
    component.crearIncidenciaForm.controls['issueDescription'].setValue('Test Description');
    component.crearIncidenciaForm.controls['issuePriority'].setValue('High');
    component.crearIncidenciaForm.controls['issueStatus'].setValue('Open');

    incidentesService.crearIncidente.and.returnValue(of({}));

    await component.submit();
    expect(incidentesService.crearIncidente).toHaveBeenCalled();
  });

  it('should show error toast on failed submit', async () => {
    component.crearIncidenciaForm.controls['customer'].setValue('Test Customer');
    component.crearIncidenciaForm.controls['datetime'].setValue(new Date().toISOString());
    component.crearIncidenciaForm.controls['userName'].setValue('Test User');
    component.crearIncidenciaForm.controls['email'].setValue('test@example.com');
    component.crearIncidenciaForm.controls['userAddress'].setValue('Test Address');
    component.crearIncidenciaForm.controls['phoneNumber'].setValue('1234567890');
    component.crearIncidenciaForm.controls['issueDescription'].setValue('Test Description');
    component.crearIncidenciaForm.controls['issuePriority'].setValue('High');
    component.crearIncidenciaForm.controls['issueStatus'].setValue('Open');

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
    component.crearIncidenciaForm.controls['datetime'].setValue(new Date().toISOString());
    component.crearIncidenciaForm.controls['userName'].setValue('Test User');
    component.crearIncidenciaForm.controls['email'].setValue('test@example.com');
    component.crearIncidenciaForm.controls['userAddress'].setValue('Test Address');
    component.crearIncidenciaForm.controls['phoneNumber'].setValue('1234567890');
    component.crearIncidenciaForm.controls['issueDescription'].setValue('Test Description');
    component.crearIncidenciaForm.controls['issuePriority'].setValue('High');
    component.crearIncidenciaForm.controls['issueStatus'].setValue('Open');

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
});
