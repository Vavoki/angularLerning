import { Injectable, OnInit } from '@angular/core';
import { Ads } from './ads.model';
import { BehaviorSubject } from 'rxjs';
import { ads } from './ads-ititial';
import {HttpClient} from '@angular/common/http';
import { ApiService } from '../api.service';
import { ThrowStmt } from '@angular/compiler';

@Injectable()
export class AdsService {
  ads: Ads[] = ads;
  result = ads;
  adsChanged = new BehaviorSubject<Ads[]>(this.ads);
  public ads$ = this.adsChanged.asObservable();
  constructor(private apiService: ApiService) {}
  getAd(id: number) {
    return this.ads[id];
  }
  updateAd(index: number, newAd: Ads) {
    this.ads[index] = newAd;
    this.adsChanged.next(this.ads);
  }
  newAd(newAd: Ads) {
    this.ads.push(newAd);
    this.adsChanged.next(this.ads);
  }
  deleteAd(index: number) {
    this.ads.splice(index, 1);
    this.adsChanged.next(this.ads);
  }

  public searchByTitle(term: string): void {
    if (term !== '') {
      this.result = this.ads.filter(item => item.title.toLowerCase() === term.toLowerCase());
      this.adsChanged.next(this.result);
    } else {
      this.result = this.ads.slice();
      this.adsChanged.next(this.result);
    }
  }
  public filter(term: string): void {
    console.log(this.result);
    let arr;
    if (term === '' || term === 'No type') {
      arr = this.ads.slice();
    } else {
      arr = this.ads.filter(item => item.type === term);
    }
    if (this.result.length === 0) {
      this.result = arr;
    } else {
      this.result = this.result.filter(i => arr[arr.indexOf(i)] === i);
    }
    this.adsChanged.next(this.result);
  }
  public priceRange(min: number, max: number) {
    console.log(this.result);
    let arr;
    arr =  this.ads.filter(item => item.price >= min && item.price <= max);
    if (this.result.length === 0) {
      this.result = arr;
    } else {
      this.result = this.result.filter(i => arr[arr.indexOf(i)] === i);
    }
    this.adsChanged.next(this.result);
  }
 }
