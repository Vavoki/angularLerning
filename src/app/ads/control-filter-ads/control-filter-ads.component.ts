import { Component, OnInit } from '@angular/core';
import { AdsService } from '../ads.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-control-filter-ads',
  templateUrl: './control-filter-ads.component.html',
  styleUrls: ['./control-filter-ads.component.css']
})
export class ControlFilterAdsComponent implements OnInit {
  minModel = 0;
  maxModel = 9999;
  constructor(private adsService: AdsService) { }

  ngOnInit() {
  }
  filter (term: string) {
   this.adsService.filterObj.type = term;
   this.adsService.filter();
  }
  onPrice() {
  this.adsService.filterObj.price.min = this.minModel;
  this.adsService.filterObj.price.max = this.maxModel;
  this.adsService.filter();
  }
}
