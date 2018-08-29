import { Component, OnInit } from '@angular/core';
import { AdsService } from '../ads.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controll-ads',
  templateUrl: './controll-ads.component.html',
  styleUrls: ['./controll-ads.component.css']
})
export class ControllAdsComponent implements OnInit {
  constructor(private adsService: AdsService) { }
  ngOnInit() {
  }
  inputforSerach(term: string) {
    this.adsService.filterObj.term = term;
    this.adsService.filter();
  }
}