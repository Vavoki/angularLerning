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
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AdsModule,
    routing
  ],
  providers: [
    AdsService,
    ApiService,
    DataStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
