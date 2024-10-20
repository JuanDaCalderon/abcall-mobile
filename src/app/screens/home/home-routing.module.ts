import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home.page';
import {PATHS} from '../../constants';

const redirectTo: string = `/${PATHS.home}/${PATHS.consultar}`;

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: PATHS.consultar,
        loadChildren: () => import('../').then((m) => m.ConsultarPageModule)
      },
      {
        path: PATHS.crear,
        loadChildren: () => import('../').then((m) => m.CrearPageModule)
      },
      {
        path: PATHS.chatbot,
        loadChildren: () => import('../').then((m) => m.ChatbotPageModule)
      },
      {
        path: '',
        redirectTo: redirectTo,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: redirectTo,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class HomePageRoutingModule {}
