import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataStorageService } from '../shared/data-storage';

@Injectable()
export class AuthService {
  token: string;
  user: any;
  errMesage: string;
  constructor(private router: Router,
              private apiService: DataStorageService) {}
  singupUser(formValue) {
    const phone = [];
    const fields = Object.keys(formValue.phone);
    fields.forEach(field => {
      phone.push(formValue.phone[field].name);
    });
    formValue.phone = phone;
    this.apiService.addNewUser(formValue)
    .subscribe(data => {console.log('MESSAGE', data); }, err => {this.errMesage = err.error.message; });
  }
  singinUser(login: string, password: string) {
    const formValue = {login: login, password: password};
    this.apiService.loginUser(formValue)
    .subscribe(
      data => { this.router.navigate(['/']); this.token = data.token; this.user = data.user; },
       err => { this.errMesage = err.error.message; });
  }
  isAuth() {
    return this.token != null;
  }
  loggout() {
    this.token = null;
  }
}
