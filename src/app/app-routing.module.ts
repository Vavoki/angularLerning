import { Routes, RouterModule } from '@angular/router';

const appRoute: Routes = [
  {path: '', redirectTo: '/ads', pathMatch: 'full'},
  {path: 'ads', loadChildren: './ads/ads.module#AdsModule'}
];

export const routing = RouterModule.forRoot(appRoute);

