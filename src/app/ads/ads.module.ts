import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdsComponent } from './ads.component';
import { AdEditComponent } from './ad-edit/ad-edit.component';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { AdListComponent } from './ad-list/ad-list.component';
import { AdItemComponent } from './ad-list/ad-item/ad-item.component';
import { routing } from './ads-routing.module';
import { ControllAdsComponent } from './controll-ads/controll-ads.component';
@NgModule({
  declarations: [
    AdsComponent,
    AdEditComponent,
    AdDetailsComponent,
    AdListComponent,
    AdItemComponent,
    ControllAdsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    routing
  ]
})
export class AdsModule {

}
