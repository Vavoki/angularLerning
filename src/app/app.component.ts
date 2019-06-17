import { Component, OnInit, VERSION } from '@angular/core';
import { DataStorageService } from './shared/data-storage';
import * as firebase from 'firebase';
import {
  AccessibilityConfig, Action, AdvancedLayout, ButtonEvent,
  ButtonsConfig, ButtonsStrategy, ButtonType, Description, DescriptionStrategy, GalleryService,
  DotsConfig, GridLayout, Image, ImageModalEvent, LineLayout, PlainGalleryConfig, PlainGalleryStrategy, PreviewConfig
} from 'angular-modal-gallery';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  arr = [1, 2, 3, 4, 5, 6];
  titlearr: any = '1';
  constructor(private apiService: DataStorageService, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics
              ) {
                angulartics2GoogleAnalytics.startTracking();
              }
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBtFFoowSLXgNi0QTaw4klQU3enVKNF6U8',
      authDomain: 'ngeducationalproject.firebaseapp.com',
      databaseURL: 'https://ngeducationalproject.firebaseio.com',
      projectId: 'ngeducationalproject',
      storageBucket: 'ngeducationalproject.appspot.com',
      messagingSenderId: '103154692115'
    });
  }
  onEditer(event) {
    const arr = [];
    arr.push(event.target.firstChild);
    this.titlearr = arr[0].textContent;
  }
}

