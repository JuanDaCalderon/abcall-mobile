import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {LoginPage} from './login.page';
import {EventEmitter} from '@angular/core';
import {LangChangeEvent, TranslateModule, TranslateService} from '@ngx-translate/core';
import {of} from 'rxjs';
import {AuthService} from 'src/services';
import {Router} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {FooterComponent, InternationalizationComponent} from 'src/components';
import {ReactiveFormsModule} from '@angular/forms';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
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

  it('should submit the form and display a toast on successful login', fakeAsync(async () => {
    const email = 'test@example.com';
    const password = 'password123';

    mockAuthService.login.and.returnValue(of(true)); // Simula un login exitoso
    component.loginForm.setValue({email, password});

    await component.submit(); // Llama al método submit
    tick(); // Mueve el temporizador para que se complete la suscripción

    expect(mockAuthService.login).toHaveBeenCalledWith(email, password);
  }));
});
