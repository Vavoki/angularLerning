import { Component, OnInit, VERSION } from '@angular/core';
import { DataStorageService } from './shared/data-storage';
import * as firebase from 'firebase';
import {
  AccessibilityConfig, Action, AdvancedLayout, ButtonEvent,
  ButtonsConfig, ButtonsStrategy, ButtonType, Description, DescriptionStrategy, GalleryService,
  DotsConfig, GridLayout, Image, ImageModalEvent, LineLayout, PlainGalleryConfig, PlainGalleryStrategy, PreviewConfig
} from 'angular-modal-gallery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  arr = [1, 2, 3, 4, 5, 6];
  titlearr: any = '1';
  constructor(private apiService: DataStorageService,
              ) {}
  ngOnInit() {
    firebase.initializeApp({
      // tslint:disable-next-line:quotemark
      apiKey: "AIzaSyBtFFoowSLXgNi0QTaw4klQU3enVKNF6U8",
      // tslint:disable-next-line:quotemark
      authDomain: "ngeducationalproject.firebaseapp.com",
    });
  }
  onEditer(event) {
    console.log(event.target.firstChild);
    const arr = [];
    arr.push(event.target.firstChild);
    console.log(arr[0].textContent);
    this.titlearr = arr[0].textContent;
  }
}

