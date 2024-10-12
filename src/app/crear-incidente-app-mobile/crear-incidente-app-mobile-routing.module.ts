import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CrearIncidenteAppMobilePage} from './crear-incidente-app-mobile.page';

const routes: Routes = [
  {
    path: '',
    component: CrearIncidenteAppMobilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearIncidenteAppMobilePageRoutingModule {}
