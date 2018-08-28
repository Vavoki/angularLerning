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
   this.adsService.filter(term);
  }
  onPrice() {
   this.adsService.priceRange(this.minModel, this.maxModel);
  }
}
