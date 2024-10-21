import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {CrearPageRoutingModule} from './crear-routing.module';
import {CrearPage} from './crear.page';
import {FooterComponent, InternationalizationComponent} from 'src/app/components';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CrearPageRoutingModule,
    TranslateModule,
    FooterComponent,
    InternationalizationComponent
  ],
  declarations: [CrearPage]
})
export class CrearPageModule {}
