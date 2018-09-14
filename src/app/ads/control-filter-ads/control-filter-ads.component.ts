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
  maxModel = 9999;
  types: Types[];
  constructor(private adsService: AdsService,
              private apiService: DataStorageService) { }

  ngOnInit() {
    this.apiService.getTypesFilter();
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
