import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './shared/data-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private apiService: DataStorageService) {}
  ngOnInit() {
    this.apiService.getAds();
  }
}

