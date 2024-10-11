import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {InternationalizationComponent} from './internationalization.component';

describe('InternationalizationComponent', () => {
  let component: InternationalizationComponent;
  let fixture: ComponentFixture<InternationalizationComponent>;
  let mockTranslateService: jasmine.SpyObj<TranslateService>;

  beforeEach(waitForAsync(() => {
    mockTranslateService = jasmine.createSpyObj('TranslateService', ['getLangs', 'getDefaultLang', 'use']);
    mockTranslateService.getLangs.and.returnValue(['en', 'es']);
    mockTranslateService.getDefaultLang.and.returnValue('en');
    TestBed.configureTestingModule({
      declarations: [InternationalizationComponent],
      providers: [{provide: TranslateService, useValue: mockTranslateService}],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
    fixture = TestBed.createComponent(InternationalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.langs).toEqual(['en', 'es']);
    expect(component.defaultLang).toBe('en');
  });

  it('should change language and image path when changeLang is triggered', () => {
    const event = {
      target: {getAttribute: () => 'es'}
    } as unknown as Event;

    component.changeLang(event);
    fixture.detectChanges();

    expect(component.defaultLang).toBe('en');
    expect(component.imgPath).toBe('assets/img/es.jpg');
    expect(mockTranslateService.use).toHaveBeenCalledWith('en');
  });

  it('should revert to defaultLang if no data-lang-value is found in event', () => {
    const event = {
      target: {getAttribute: () => null}
    } as unknown as Event;

    component.changeLang(event);
    fixture.detectChanges();

    expect(component.defaultLang).toBe('en');
    expect(component.imgPath).toBe('assets/img/es.jpg');
    expect(mockTranslateService.use).toHaveBeenCalledWith('en');
  });

  it('should give me default language when attribute is the same language', () => {
    component.langs = ['fr'];
    const event = {
      target: {getAttribute: () => 'fr'}
    } as unknown as Event;

    component.changeLang(event);
    fixture.detectChanges();
    expect(component.defaultLang).toBe('es');
    expect(component.imgPath).toBe('assets/img/en.jpg');
    expect(mockTranslateService.use).toHaveBeenCalledWith('es');
  });
});
