import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdsService } from '../ads.service';
import { Ads } from '../ads.model';
import { Subscription } from 'rxjs';
import { state, trigger, transition, style, animate } from '@angular/animations';
import { PaginationCustomService } from '../pagination/pagination.service';
import { DataStorageService } from '../../shared/data-storage';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({opacity: 1}))
      ])
    ])
  ]
})
export class AdListComponent implements OnInit {
  ads: Ads[];
  p = 1;
  pager: any = {};
  pagedItems: Ads[];
  subsctiption: Subscription;
  constructor(public adsService: AdsService,
              private paginationService: PaginationCustomService,
              private apiService: DataStorageService,
              private httpClient: HttpClient) { }

  ngOnInit() {
    this.adsService.adsChanged.subscribe(data => {
      if (data) {
        this.ads = data;
        this.setPage(1);
      }
    });

  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.paginationService.getPager(this.ads.length, page);
    // get current page of items
    const limit = 5;
    this.pagedItems = this.ads.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // this.getAdsOffsetLimit(page, limit);
  }
  getAdsOffsetLimit(page: number, limit: number) {
    console.log(this.adsService.filterObj);
    this.httpClient.get<Ads[]>(`http://localhost:3000/posts?_page=${page}&_limit=${limit}`,
    {
      observe: 'body',
      responseType: 'json',

    })
    .map(
      (ads) => {
        // tslint:disable-next-line:prefer-const
        for (let ad of ads) {
          if (!ad['imgs']) {
            ad['imgs'] = [];
          }
        }
        return ads;
      }
    )
    .subscribe(
        (ads: Ads[]) => {
          this.pagedItems = ads;
        }
      );
  }
}
