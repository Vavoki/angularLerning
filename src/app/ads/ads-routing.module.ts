import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdsComponent } from './ads.component';
import { AdEditComponent } from './ad-edit/ad-edit.component';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { AdListComponent } from './ad-list/ad-list.component';
import { AuthGuard } from '../auth/auth.guard';
const recipesRouters: Routes = [
  {
    path: 'ads', component: AdsComponent, children: [
      { path: '' , component: AdListComponent},
      { path: 'new', component: AdEditComponent, canActivate: [AuthGuard]},
      { path: ':id', component: AdDetailsComponent, canActivate: [AuthGuard]},
      { path: ':id/edit', component: AdEditComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRouters),
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})

export class RecipesRoutingModule {}
