import { Component, OnInit } from '@angular/core';
import { AdsService } from '../ads.service';
import { FormsModule } from '@angular/forms';
import { Types } from '../../shared/typesFilter.model';
import { ApiService } from '../../api.service';
import { DataStorageService } from '../../shared/data-storage';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-control-filter-ads',
  templateUrl: './control-filter-ads.component.html',
  styleUrls: ['./control-filter-ads.component.css']
})
export class ControlFilterAdsComponent implements OnInit {
  minModel = 0;
  maxModel = 99999999;
  hide = false;
  types: Types[];
  constructor(private adsService: AdsService,
              private rout: ActivatedRoute,
              private apiService: DataStorageService,
              private router: Router) { }

  ngOnInit() {
    if (this.rout.snapshot.queryParams.id) {
      this.hide = true;
    }
    this.apiService.getTypesFilter();
  }
  filter (term: string) {
   this.adsService.filterObj.type = term;
   this.adsService.filterchanged.next(this.adsService.filterObj);
   this.router.navigate(['/ads'], {queryParams: this.adsService.filterObj});
  //  this.adsService.filter();
  //  this.apiService.getAdsOffsetLimit(0, 5);
  }
  onPrice() {
  this.adsService.filterObj.minPrice = +this.minModel;
  this.adsService.filterObj.maxPrice = +this.maxModel;
  this.adsService.filterchanged.next(this.adsService.filterObj);
  this.router.navigate(['/ads'], {queryParams: this.adsService.filterObj});
  // this.adsService.filter();
  // this.apiService.getAdsOffsetLimit(0, 5);
  }
}
