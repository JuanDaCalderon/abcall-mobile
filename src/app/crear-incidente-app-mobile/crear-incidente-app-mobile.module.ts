import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {CrearIncidenteAppMobilePageRoutingModule} from './crear-incidente-app-mobile-routing.module';

import {CrearIncidenteAppMobilePage} from './crear-incidente-app-mobile.page';
import {FooterComponent, InternationalizationComponent} from 'src/components';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CrearIncidenteAppMobilePageRoutingModule,
    TranslateModule,
    FooterComponent,
    InternationalizationComponent
  ],
  declarations: [CrearIncidenteAppMobilePage]
})
export class CrearIncidenteAppMobilePageModule {}
