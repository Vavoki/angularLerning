import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdsComponent } from './ads.component';
import { AdEditComponent } from './ad-edit/ad-edit.component';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { AdListComponent } from './ad-list/ad-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { Angulartics2Module } from 'angulartics2';
const recipesRouters: Routes = [
  {
    path: 'ads', component: AdsComponent, children: [
      { path: '' , component: AdListComponent},
      { path: 'list' , component: AdListComponent},
      { path: 'new', component: AdEditComponent, canActivate: [AuthGuard]},
      { path: 'list/:id', component: AdDetailsComponent},
      { path: 'list/:id/edit', component: AdEditComponent, canActivate: [AuthGuard]},
      { path: ':id', component: AdDetailsComponent},
      { path: ':id/edit', component: AdEditComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRouters),
    Angulartics2Module,
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})

export class RecipesRoutingModule {}
