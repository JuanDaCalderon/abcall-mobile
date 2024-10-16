import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CrearIncidenteAppMobilePage} from './crear-incidente-app-mobile.page';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {EventEmitter} from '@angular/core';
import {LangChangeEvent} from '@ngx-translate/core';
import {of} from 'rxjs';
import {IonicModule} from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http'; // Import HttpClientModule
import {IncidentesService} from '../../services/incidentes.service'; // Adjust the path as needed

describe('CrearIncidenteAppMobilePage', () => {
  let component: CrearIncidenteAppMobilePage;
  let fixture: ComponentFixture<CrearIncidenteAppMobilePage>;

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
    getTranslation: translateService.getTranslation.and.returnValue(of({'abc.crearIncidenciaAppMobile': 'crearIncidenciaAppMobile'})),
    getLangs: translateService.getLangs.and.returnValue(['en', 'es']),
    getDefaultLang: translateService.getDefaultLang.and.returnValue('en'),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearIncidenteAppMobilePage],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot(), HttpClientModule],
      providers: [{provide: TranslateService, useValue: translateServiceMock}, IncidentesService]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearIncidenteAppMobilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
