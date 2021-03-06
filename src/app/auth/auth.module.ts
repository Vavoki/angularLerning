import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { routing } from './auth-routing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { TextMaskModule } from 'angular2-text-mask';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2RouterlessModule } from 'angulartics2/routerlessmodule';

@NgModule({
  declarations: [
    SingInComponent,
    SingUpComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    routing,
    TextMaskModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    Angulartics2Module,
    Angulartics2RouterlessModule.forRoot(),
  ],
  exports: [BrowserModule, BrowserAnimationsModule]
})
export class AuthModule {

}
