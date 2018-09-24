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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import 'hammerjs';
import 'mousetrap';
import { ModalGalleryModule } from 'angular-modal-gallery';
import { faExternalLinkAlt, faPlus, faTimes, faDownload } from '@fortawesome/fontawesome-free-solid';
import * as fontawesome from '@fortawesome/fontawesome';
fontawesome.library.add(faExternalLinkAlt, faPlus, faTimes, faDownload);
import { NgxGalleryModule } from 'ngx-gallery';
import { FeedbackAuthorComponent } from './ad-details/feedback-author/feedback-author.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';


@NgModule({
  declarations: [
    AdsComponent,
    AdEditComponent,
    AdDetailsComponent,
    AdListComponent,
    AdItemComponent,
    ControllAdsComponent,
    ControlFilterAdsComponent,
    FeedbackAuthorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    TextMaskModule,
    NgxPaginationModule,
    ModalGalleryModule.forRoot(),
    NgxGalleryModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
  ]
})
export class AdsModule {

}
