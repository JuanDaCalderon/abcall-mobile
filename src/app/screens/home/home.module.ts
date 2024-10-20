import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageRoutingModule} from './home-routing.module';
import {HomePage} from './home.page';

@NgModule({
  imports: [IonicModule, CommonModule, HomePageRoutingModule],
  declarations: [HomePage]
})
export class HomePageModule {}
