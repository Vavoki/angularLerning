import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {
  model: any = {};
  public myModel = '+';
  public mask = ['+', '(', /\d/, /\d/, /\d/, ')', /[0-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/ ];
  registrationForm: FormGroup;
  constructor(private authService: AuthService,
              private route: Router) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.initForm();
  }
  private initForm() {
    const userLogin = '';
    const userPassword = '';
    const userName = '';
    const userEmail = '';
    const phone = new FormArray([]);

    this.registrationForm = new FormGroup({
      'login': new FormControl(userLogin, Validators.required),
      'password':  new FormControl(userPassword, Validators.required),
      'email':  new FormControl(userEmail, Validators.required),
      'name':  new FormControl(userName, Validators.required),
      'phone': phone,
    });
  }
  onAddPhoto() {
    (<FormArray>this.registrationForm.get('phone')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
      })
    );
  }
  onSubmit() {
    this.authService.singupUser(this.registrationForm.value);
    this.route.navigate(['/ads']);
  }
}
