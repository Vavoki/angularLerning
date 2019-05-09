import { Injectable, OnInit } from '@angular/core';
import { Ads } from './ads.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Types } from '../shared/typesFilter.model';
import { log } from 'util';


@Injectable()
export class AdsService {
  filterObj = {
    type: '',
    title: '',
    minPrice: 0,
    maxPrice: 9999999
  };
  ads: any[] = [];
  types: Types[] = [];
  length;
  result;
  authAdsElem: Ads[] = [];
  typesChanged = new BehaviorSubject<Types[]>(this.types);
  filterchanged = new BehaviorSubject<any>(this.filterObj);
  public filterchanged$ = this.filterchanged.asObservable();
  public types$ = this.typesChanged.asObservable();
  adsChanged = new BehaviorSubject<Ads[]>(this.ads);
  public ads$ = this.adsChanged.asObservable();
  pager: any = 0;
  pagerChanged = new BehaviorSubject<any>(this.pager);
  public pager$ = this.pagerChanged.asObservable();

  constructor() {}
  pagination(pager) {
    this.pager = pager;
    this.pagerChanged.next(this.pager);
  }
  setAds(adsApi: Ads[]) {
    this.ads = adsApi;
    this.adsChanged.next(this.ads);
  }
  setTypes(typesApi: Types[]) {
    this.types = typesApi;
    this.typesChanged.next(this.types);
  }
  getAd(id: number) {
    const arr = this.ads.filter(item => item.id === id);
    const result = arr[0];
    return result;
  }
  updateAd(newAd: Ads) {

    for (let i = 0; i < this.ads.length; i++) {
      if (this.ads[i].id === newAd.id) {
          this.ads[i] = newAd;
      }
    }
    this.adsChanged.next(this.ads);

  }
  newAd(newAd: Ads, id: number) {
    newAd.id = id;
    this.ads.push(newAd);
    this.length = this.ads[this.ads.length - 1].id;
    this.adsChanged.next(this.ads);
  }
  deleteAd(index: number) {
    this.ads = this.ads.filter(item => item.id !== index);
    this.length = this.ads[this.ads.length - 1].id;
    this.adsChanged.next(this.ads);
  }
  getAdsbyAuth(login: string) {
    console.log(this.ads, 'GET', login);
   const result = this.ads.filter(item => item.user.login === login);
   return result;
  }
  public searchByTitle(term: string,  result: Ads[]) {
    if (term !== '') {
      result = result.filter(item => {
        if (item.title.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
          return item;
        }
      });
      // item.title.toLowerCase() === term.toLowerCase());
    } else {
      result = result;
    }
    return result;
  }
  public filterbyType(term , result: Ads[])  {
    if (term === '' || term === 'No type' || term === 'All') {
      result = result;
    } else {
     result = result.filter(item => item.type.toLowerCase() === term.toLowerCase());
    }
    return result;
  }
  public priceRange(min: number, max: number,  result: Ads[]) {
    result = result.filter(item => item.price > min && item.price <= max);
    return result;
  }
  public filter(): void {
    this.result = this.ads;
    this.result = this.searchByTitle(this.filterObj.title, this.result);
    this.result = this.filterbyType(this.filterObj.type, this.result);
    this.result = this.priceRange(this.filterObj.minPrice, this.filterObj.maxPrice, this.result);
    this.adsChanged.next(this.result);
  }
 }
