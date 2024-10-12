import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import {LoginPage} from './login.page';
import {EventEmitter} from '@angular/core';
import {LangChangeEvent, TranslateModule, TranslateService} from '@ngx-translate/core';
import {of, throwError} from 'rxjs';
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
      declarations: [LoginPage, InternationalizationComponent, FooterComponent],
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
    mockAuthService.login.and.returnValue(
      of({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW5kYWNhbG1haWwuY29tIiwidXNlcm5hbWUiOiJiZWRhbW9rYSIsImV4cCI6MTcyODcwMTg0NX0.8AweMAcU5LCvA7TzPRf5kRJgHCRgrTEEfEC_gg4Ml7c'
      })
    );
    component.submit();
    expect(component.isLoading).toBeTrue();
    tick();
    fixture.whenStable().then(() => {
      flush();
      expect(mockAuthService.login).toHaveBeenCalledWith('', '');
    });
  }));

  it('should submit the form and display a toast on successful login', fakeAsync(() => {
    const mockError = {error: {message: 'invalid credentials'}};
    mockAuthService.login.and.returnValue(throwError(() => mockError));
    component.submit();
    fixture.whenStable().then(() => {
      expect(mockAuthService.login).toHaveBeenCalled();
    });
  }));

  it('should submit the form with no error message', fakeAsync(() => {
    const mockError = {};
    mockAuthService.login.and.returnValue(throwError(() => mockError));
    component.submit();
    fixture.whenStable().then(() => {
      expect(mockAuthService.login).toHaveBeenCalled();
    });
  }));
});
