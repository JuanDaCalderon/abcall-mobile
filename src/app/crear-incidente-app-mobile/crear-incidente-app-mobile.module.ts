import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CrearIncidenteAppMobilePageRoutingModule} from './crear-incidente-app-mobile-routing.module';

import {CrearIncidenteAppMobilePage} from './crear-incidente-app-mobile.page';
import {FooterComponent} from 'src/components';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IonicModule, CrearIncidenteAppMobilePageRoutingModule, FooterComponent],
  declarations: [CrearIncidenteAppMobilePage]
})
export class CrearIncidenteAppMobilePageModule {}
