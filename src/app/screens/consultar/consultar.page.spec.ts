import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {ConsultarPage} from './consultar.page';

describe('ConsultarPage', () => {
  let component: ConsultarPage;
  let fixture: ComponentFixture<ConsultarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
