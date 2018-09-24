import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { routing } from './app-routing.module';
import { AdsModule } from './ads/ads.module';
import { AdsService } from './ads/ads.service';
import { ApiService } from './api.service';
import { DataStorageService } from './shared/data-storage';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ProfileComponent } from './profile/profile.component';
import 'hammerjs';
import 'mousetrap';
import { ModalGalleryModule } from 'angular-modal-gallery';
import { faExternalLinkAlt, faPlus, faTimes, faDownload } from '@fortawesome/fontawesome-free-solid';
import * as fontawesome from '@fortawesome/fontawesome';
fontawesome.library.add(faExternalLinkAlt, faPlus, faTimes, faDownload);
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationCustomService } from './ads/pagination/pagination.service';
import { UploadService } from './ads/ad-edit/upload.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AdsModule,
    AuthModule,
    routing,
    ModalGalleryModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    UploadService,
    AdsService,
    ApiService,
    DataStorageService,
    AuthService,
    PaginationCustomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
