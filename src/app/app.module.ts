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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageComponent } from './profile/message/message.component';
import { CurrentMessageComponent } from './profile/message/current-message/current-message.component';
import { MessageService } from './profile/message.service';
import { DetailMessageComponent } from './profile/message/detail-message/detail-message.component';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Angulartics2RouterlessModule } from 'angulartics2/routerlessmodule';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    MessageComponent,
    CurrentMessageComponent,
    DetailMessageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AdsModule,
    AuthModule,
    routing,
    ModalGalleryModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    Angulartics2Module.forRoot({
      pageTracking: {
        clearHash: true,
        clearQueryParams: true,
      }
    }),
    Angulartics2RouterlessModule.forRoot(),
  ],
  providers: [
    UploadService,
    AdsService,
    ApiService,
    DataStorageService,
    AuthService,
    PaginationCustomService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
