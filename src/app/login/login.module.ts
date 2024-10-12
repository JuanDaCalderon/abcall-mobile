import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {LoginPageRoutingModule} from './login-routing.module';

import {LoginPage} from './login.page';
import {FooterComponent, InternationalizationComponent} from 'src/components';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    TranslateModule,
    FooterComponent,
    InternationalizationComponent
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
