import { Injectable, OnInit } from '@angular/core';
import { Ads } from './ads.model';
import { BehaviorSubject } from 'rxjs';
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
  ads: Ads[];
  length;
  result;
  adsChanged = new BehaviorSubject<Ads[]>(this.ads);
  public ads$ = this.adsChanged.asObservable();
  constructor(private authService: AuthService) {}
  setAds(adsApi: Ads[]) {
    this.ads = adsApi;
    this.length = this.ads[this.ads.length - 1].id;
    this.adsChanged.next(this.ads);
  }
  getAd(id: number) {
    const arr = this.ads.filter(item => item.id === id);
    const result = arr[0];
    return result;
  }
  updateAd(index: number, newAd: Ads) {
    for (let i = 0; i < this.ads.length; i++) {
      if (this.ads[i].id === index) {
          this.ads[i] = newAd;
      }
    }
    this.adsChanged.next(this.ads);

  }
  newAd(newAd: Ads, id: number) {
    newAd.emailAds = this.authService.email;
    newAd.contact[0].email = this.authService.email;
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
  getAdsbyAuth(email: string) {
    const result = this.ads.filter(item => item.contact[0].email === email);
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
    this.adsChanged.next(this.result);
  }
 }
