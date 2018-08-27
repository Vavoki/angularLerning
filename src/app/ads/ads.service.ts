import { Injectable } from '@angular/core';
import { Ads } from './ads.model';
import { BehaviorSubject } from 'rxjs';
import { ads } from './ads-ititial';

@Injectable()
export class AdsService {
  private ads: Ads[] = ads;
  adsChanged = new BehaviorSubject<Ads[]>(this.ads);
  public ads$ = this.adsChanged.asObservable();

  getAds() {
    return this.ads.slice();
  }
  getAd(id: number) {
    return this.ads[id];
  }
  updateAd(index: number, newAd: Ads) {
    this.ads[index] = newAd;
    this.adsChanged.next(this.ads.slice());
  }
  newAd(newAd: Ads) {
    this.ads.push(newAd);
    this.adsChanged.next(this.ads.slice());
  }
  deleteAd(index: number) {
    this.ads.splice(index, 1);
    this.adsChanged.next(this.ads.slice());
  }

  public searchByTitle(term: string): void {
    let result;
    if (term !== '') {
      result = this.ads.filter(item => item.title === term);
      this.adsChanged.next(result);
    } else {
      this.adsChanged.next( this.ads);
    }
  }
  public filter(term: string): void {
    let result;
    console.log(term);
    result = this.ads.filter(item => item.type === term);
      this.adsChanged.next(result);
  }
 }
