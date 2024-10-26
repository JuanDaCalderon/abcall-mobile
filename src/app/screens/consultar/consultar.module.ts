import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConsultarPage} from './consultar.page';
import {ConsultarPageRoutingModule} from './consultar-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {FooterComponent, InternationalizationComponent} from 'src/app/components';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ConsultarPageRoutingModule,
    TranslateModule,
    FooterComponent,
    InternationalizationComponent
  ],
  declarations: [ConsultarPage]
})
export class ConsultarPageModule {}
