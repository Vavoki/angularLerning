import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const type = 'asd';
const appRoute: Routes = [
  {path: '', redirectTo: '/ads', pathMatch: 'full'},
  {path: 'ads', loadChildren: './ads/ads.module#AdsModule'},
  {path: 'profile', component: ProfileComponent},
];

export const routing = RouterModule.forRoot(appRoute);

