import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ConsultarPage} from './consultar.page';
import {ConsultarPageRoutingModule} from './consultar-routing.module';
@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ConsultarPageRoutingModule],
  declarations: [ConsultarPage]
})
export class ConsultarPageModule {}
