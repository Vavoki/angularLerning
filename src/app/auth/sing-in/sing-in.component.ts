import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../../shared/data-storage';
@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  constructor(private authService: AuthService,
              private spinner: NgxSpinnerService,
              private rout: ActivatedRoute,
              private apiServer: DataStorageService) { }

  ngOnInit() {
    if (Object.keys(this.rout.snapshot.queryParams).length > 0) {
      console.log(this.rout.snapshot.queryParams);
    }
  }
  onSubmit(form: NgForm) {
    const login = form.value.login;
    const password = form.value.password;
    this.authService.singinUser(login, password);
  }
}
