import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './shared/data-storage';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private apiService: DataStorageService) {}
  ngOnInit() {
    firebase.initializeApp({
      // tslint:disable-next-line:quotemark
      apiKey: "AIzaSyBtFFoowSLXgNi0QTaw4klQU3enVKNF6U8",
      // tslint:disable-next-line:quotemark
      authDomain: "ngeducationalproject.firebaseapp.com",
    });
    this.apiService.getAds();
  }
}

