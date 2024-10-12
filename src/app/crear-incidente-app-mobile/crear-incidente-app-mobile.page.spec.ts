import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CrearIncidenteAppMobilePage} from './crear-incidente-app-mobile.page';

describe('CrearIncidenteAppMobilePage', () => {
  let component: CrearIncidenteAppMobilePage;
  let fixture: ComponentFixture<CrearIncidenteAppMobilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearIncidenteAppMobilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
