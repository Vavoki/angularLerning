import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdsService } from '../ads.service';
import { Ads } from '../ads.model';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { PaginationCustomService } from '../pagination/pagination.service';
import { DataStorageService } from '../../shared/data-storage';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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
export class AdListComponent implements OnInit, OnDestroy {
  ads: Ads[];
  p = 1;
  pager: any = {};
  pagedItems: Ads[];
  lengthI: number;
  constructor(public adsService: AdsService,
              private paginationService: PaginationCustomService,
              private apiService: DataStorageService,
              private httpClient: HttpClient,
              private route: ActivatedRoute,
              private pagerService: PaginationCustomService) { }

  ngOnInit() {
    //  this.apiService.getAds();
    this.setPage(1);
    this.adsService.adsChanged.subscribe(data => {
      if (data) {
        this.ads = data;
      }
      if (this.route.url['value'].length) {
        if (this.route.url['value'][0].path === 'list') {
          console.log('AUTHOR', this.adsService.authAdsElem);
          this.ads = this.adsService.authAdsElem;
        }
      }
    });
    // this.adsService.filterchanged.subscribe(data => {
    //   console.log('data =>>>', data);
    //   this.setPage(1);
    // });
    // if (this.route.url['value'].length) {
    //   if (this.route.url['value'][0].path === 'list') {
    //     console.log('OK');
    //     this.setPage(1);
    //   }
    // }
    console.log(this.ads);
  }
  setPage(page: number) {
    // console.log('ADS', this.ads);
    // get pager object from service
    this.getlentgRequst(page);
    this.getAdsOffsetLimit(page, 5);
    // this.getlentgRequst(page);
    // get current page of items
    // const limit = 5;
    // this.pagedItems = this.ads.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // console.log(this.pagedItems);
     // this.getAdsOffsetLimit(page, limit);
  }
  getAdsOffsetLimit(page: number, limit: number) {
    const filterObj = this.adsService.filterObj;
    console.log(filterObj);
    let url = `http://localhost:3000/posts?_page=${page}&_limit=${limit}&price_gte=${filterObj.price.min}&price_lte=${filterObj.price.max}`;
    if (filterObj.type !== '' && filterObj.type !== 'No type' && filterObj.type !== 'All') {
      url = url + `&type=${filterObj.type}`;
    }
    if (filterObj.term !== '') {
      url = url + `&title=${filterObj.term}`;
    }
    this.httpClient.get<Ads[]>(
      url,
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
        console.log('Setads', ads);
        this.adsService.setAds(ads);
        }
      );
  }
  getlentgRequst(page: number) {
    const filterObj = this.adsService.filterObj;
    let url = `http://localhost:3000/posts?price_gte=${filterObj.price.min}&price_lte=${filterObj.price.max}`;
    if ( filterObj.type !== 'No type' && filterObj.type !== '' && filterObj.type !== 'All') {
      url = url + `&type=${filterObj.type}`;
    }
    if (filterObj.term !== '') {
      url = url + `&title=${filterObj.term}`;
    }
    this.httpClient.get<Ads[]>(
     url,
    {
      observe: 'body',
      responseType: 'json',

    })
    .map(
      (ads) => {
        return ads;
      }
    )
    .subscribe(
        (ads: Ads[]) => {
         this.lengthI = ads.length;
         this.pager = this.paginationService.getPager( this.lengthI, page);
        }
      );
  }
  ngOnDestroy() {
  }
}
