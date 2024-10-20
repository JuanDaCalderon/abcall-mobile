import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {LoginPage} from './login.page';
import {EventEmitter} from '@angular/core';
import {LangChangeEvent, TranslateModule, TranslateService} from '@ngx-translate/core';
import {of} from 'rxjs';
import {AuthService} from 'src/app/services';
import {Router} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {loginUser} from './models';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let toastMock: {present: jasmine.Spy};
  const mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['login']);
  const translateService = jasmine.createSpyObj('translateService', [
    'getTranslation',
    'instant',
    'get',
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
    getTranslation: translateService.getTranslation.and.returnValue(of({'abc.login': 'login'})),
    getLangs: translateService.getLangs.and.returnValue(['en', 'es']),
    getDefaultLang: translateService.getDefaultLang.and.returnValue('en'),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        {provide: TranslateService, useValue: translateServiceMock},
        {provide: Router, useValue: mockRouter}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form and display a toast on successful login', fakeAsync(() => {
    toastMock = {present: jasmine.createSpy('present')};
    const loginResponseObject: loginUser = {
      id: 'e754610c-ee4f-471d-9925-b9bffa702589',
      email: 'juandacalji@gmail.com',
      username: 'bedamoka',
      nombres: 'juan david',
      apellidos: 'calderon jimenez',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW5kYWNhbGppQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYmVkYW1va2EiLCJleHAiOjE3MjkxMjM5MTV9.-ohXO8kW-TsMmAW57H-txm_P1cENenKrcTf6La-DzOI'
    };
    component.loginForm = new FormGroup({
      email: new FormControl('test@example.com'),
      password: new FormControl('password123')
    });
    mockAuthService.login.and.returnValue(of(loginResponseObject));
    component.toastSuccess$ = of(toastMock as unknown as HTMLIonToastElement);
    component.submit();
    tick();
    expect(component.isLoading).toBeFalse();
    expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(toastMock.present).toHaveBeenCalledTimes(1);
  }));
});
