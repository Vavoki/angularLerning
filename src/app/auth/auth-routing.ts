import { Routes, RouterModule } from '@angular/router';
import { SingUpComponent } from './sing-up/sing-up.component';
import { SingInComponent } from './sing-in/sing-in.component';

const authRouter: Routes = [
  { path: 'singup', component: SingUpComponent },
  { path: 'singin', component: SingInComponent },
];
export const routing = RouterModule.forChild(authRouter);
