import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { MessageComponent } from './profile/message/message.component';
import { DetailMessageComponent } from './profile/message/detail-message/detail-message.component';
const type = 'asd';
const appRoute: Routes = [
  { path: '', redirectTo: '/ads', pathMatch: 'full' },
  { path: 'ads', loadChildren: './ads/ads.module#AdsModule' },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/message', component: MessageComponent, canActivate: [AuthGuard] },
  { path: 'profile/message/:id', component: DetailMessageComponent, canActivate: [AuthGuard] },
];

export const routing = RouterModule.forRoot(appRoute);

