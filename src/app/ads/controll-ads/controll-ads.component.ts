import { Component, OnInit } from '@angular/core';
import { AdsService } from '../ads.service';
import { FormsModule } from '@angular/forms';
import { DataStorageService } from '../../shared/data-storage';
import { Types } from '../../shared/typesFilter.model';

@Component({
  selector: 'app-controll-ads',
  templateUrl: './controll-ads.component.html',
  styleUrls: ['./controll-ads.component.css']
})
export class ControllAdsComponent implements OnInit {
  types: Types[];
  constructor(private adsService: AdsService,
              private apiService: DataStorageService) { }
  ngOnInit() {
  }
  inputforSerach(term: string) {
    this.adsService.filterObj.term = term;
    this.adsService.filter();
  }
}
