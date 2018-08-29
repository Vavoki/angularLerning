import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  onSingin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.singinUser(email, password);
  }
}
