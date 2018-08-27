import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdsComponent } from './ads.component';
import { AdEditComponent } from './ad-edit/ad-edit.component';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { AdListComponent } from './ad-list/ad-list.component';
const recipesRouters: Routes = [
  {
    path: 'ads', component: AdsComponent, children: [
      { path: '' , component: AdListComponent},
      { path: 'new', component: AdEditComponent},
      { path: ':id', component: AdDetailsComponent},
      { path: ':id/edit', component: AdEditComponent}
    ]
  }
];

export const routing = RouterModule.forChild(recipesRouters);
