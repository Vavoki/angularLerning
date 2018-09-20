import { Component, OnInit } from '@angular/core';
import { AdsService } from '../ads.service';
import { FormsModule } from '@angular/forms';
import { Types } from '../../shared/typesFilter.model';
import { ApiService } from '../../api.service';
import { DataStorageService } from '../../shared/data-storage';
@Component({
  selector: 'app-control-filter-ads',
  templateUrl: './control-filter-ads.component.html',
  styleUrls: ['./control-filter-ads.component.css']
})
export class ControlFilterAdsComponent implements OnInit {
  minModel = 0;
  maxModel = 99999999;
  types: Types[];
  constructor(private adsService: AdsService,
              private apiService: DataStorageService) { }

  ngOnInit() {
    this.apiService.getTypesFilter();
  }
  filter (term: string) {
    console.log(term);
   this.adsService.filterObj.type = term;
   console.log(this.adsService.filterchanged.getValue());
   this.adsService.filterchanged.next(this.adsService.filterObj);
   this.adsService.filter();
  }
  onPrice() {
  this.adsService.filterObj.price.min = this.minModel;
  this.adsService.filterObj.price.max = this.maxModel;
  console.log(this.adsService.filterchanged.getValue());
  this.adsService.filterchanged.next(this.adsService.filterObj);
  this.adsService.filter();
  }
}
