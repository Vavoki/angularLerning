import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;
  email: string;
  constructor(private router: Router) {}
  singupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }
  singinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response =>  {
          this.router.navigate( ['/'] );
          firebase.auth().currentUser.getIdToken()
         .then(
           (token: string) => {
             this.token = token;
             this.email = firebase.auth().currentUser.email;
            }
         );
        }
      )
      .catch (
        error => console.log(error)
      );
  }
  getToken() {
    firebase.auth().currentUser.getIdToken()
    .then(
      (token: string) => this.token = token
    );
    return this.token;
  }
  isAuth() {
    return this.token != null;
  }
  loggout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
