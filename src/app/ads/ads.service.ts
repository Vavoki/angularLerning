import { Injectable, OnInit } from '@angular/core';
import { Ads } from './ads.model';
import { BehaviorSubject } from 'rxjs';
import { ads } from './ads-ititial';
import { ApiService } from '../api.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdsService {
  filterObj = {
    type: '',
    term: '',
    price: {
      min: 0,
      max: 9999
    },
  };
  ads: Ads[] = ads;
  result;
  adsChanged = new BehaviorSubject<Ads[]>(this.ads);
  public ads$ = this.adsChanged.asObservable();
  constructor(private apiService: ApiService,
              private authService: AuthService) {}
  setAds(adsApi: Ads[]) {
    this.ads = adsApi;
    this.adsChanged.next(this.ads);
  }
  getAd(id: number) {
    return this.ads[id];
  }
  updateAd(index: number, newAd: Ads) {
    this.ads[index] = newAd;
    this.adsChanged.next(this.ads);
  }
  newAd(newAd: Ads) {
    newAd.emailAds = this.authService.email;
    newAd.contact[0].email = this.authService.email;
    this.ads.push(newAd);
    this.adsChanged.next(this.ads);
  }
  deleteAd(index: number) {
    this.ads.splice(index, 1);
    this.adsChanged.next(this.ads);
  }
  getAdsbyAuth(email: string, index: number) {
    console.log(this.ads);
    const result = this.ads.filter(item => item.contact[0].email === email);
    result.splice(index, 1);
    return result;
  }
  public searchByTitle(term: string,  result: Ads[]) {
    if (term !== '') {
      result = result.filter(item => item.title.toLowerCase() === term.toLowerCase());
    } else {
      result = result;
    }
    return result;
  }
  public filterbyType(term , result: Ads[])  {
    if (term === '' || term === 'No type') {
     result = result;
    } else {
     result = result.filter(item => item.type.toLowerCase() === term.toLowerCase());
    }
    console.log(result);
    return result;
  }
  public priceRange(min: number, max: number,  result: Ads[]) {
    result = result.filter(item => item.price > min && item.price <= max);
    return result;
  }
  public filter(): void {
    this.result = this.ads;
    this.result = this.searchByTitle(this.filterObj.term, this.result);
    this.result = this.filterbyType(this.filterObj.type, this.result);
    this.result = this.priceRange(this.filterObj.price.min, this.filterObj.price.max, this.result);
    console.log(this.result);
    this.adsChanged.next(this.result);
  }
 }
