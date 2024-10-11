import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {FooterComponent} from './footer.component';
import {LangChangeEvent, TranslateModule, TranslateService} from '@ngx-translate/core';
import {of} from 'rxjs';
import {EventEmitter} from '@angular/core';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  const translateService = jasmine.createSpyObj('translateService', ['getTranslation', 'instant', 'get']);
  const translateServiceMock = {
    currentLang: 'es',
    onLangChange: new EventEmitter<LangChangeEvent>(),
    use: translateService.get,
    get: translateService.get.and.returnValue(of('')),
    getTranslation: translateService.getTranslation.and.returnValue(of({'abc.footer.copy': '© 2024 Mi Empresa'})),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter()
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
      providers: [{provide: TranslateService, useValue: translateServiceMock}]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load translations correctly', () => {
    expect(component.hasLoadTranslations).toBeTrue();
  });
});
