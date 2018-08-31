import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdsComponent } from './ads.component';
import { AdEditComponent } from './ad-edit/ad-edit.component';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { AdListComponent } from './ad-list/ad-list.component';
import { AdItemComponent } from './ad-list/ad-item/ad-item.component';
import { RecipesRoutingModule } from './ads-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ControllAdsComponent } from './controll-ads/controll-ads.component';
import { ControlFilterAdsComponent } from './control-filter-ads/control-filter-ads.component';
import { TextMaskModule } from 'angular2-text-mask';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
    AdsComponent,
    AdEditComponent,
    AdDetailsComponent,
    AdListComponent,
    AdItemComponent,
    ControllAdsComponent,
    ControlFilterAdsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    FormsModule,
    HttpClientModule,
    TextMaskModule,
    NgxPaginationModule
  ]
})
export class AdsModule {

}
