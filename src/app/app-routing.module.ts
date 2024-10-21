import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PATHS} from './constants';

const routes: Routes = [
  {
    path: PATHS.login,
    loadChildren: () => import('./screens').then((m) => m.LoginPageModule)
  },
  {
    path: PATHS.home,
    loadChildren: () => import('./screens').then((m) => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: PATHS.login,
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
