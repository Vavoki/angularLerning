import { Component, OnInit } from '@angular/core';
import { Ads } from './ads.model';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from '../shared/data-storage';


@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

  constructor(private http: HttpClient,
              private apiService: DataStorageService) {}
  ngOnInit() {
   // this.apiService.getAds();
  }

}
