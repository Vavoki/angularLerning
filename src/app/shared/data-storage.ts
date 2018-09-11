import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { AdsService } from '../ads/ads.service';
import { Ads } from '../ads/ads.model';
import { AuthService } from '../auth/auth.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type':  'application/json',
  })
};
const urlPost = 'http://localhost:3000/posts';
@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private adsService: AdsService,
              private authService: AuthService
              ) {}
  deleteAdd(id: number) {
    const url = `${urlPost}/${id}`;
    return this.httpClient.delete(url, httpOptions)
      .subscribe();
  }
  addNewAdd (ad: Ads, id: number) {
    ad.id = id;
    ad.emailAds = this.authService.email;
    ad.contact[0].email = this.authService.email;
     this.httpClient.post<Ads>('http://localhost:3000/posts', ad, httpOptions)
     .subscribe((addNewAdd: Ads) => {
       this.adsService.newAd(addNewAdd, id);
     });
   }
  getAds() {

    this.httpClient.get<Ads[]>('http://localhost:3000/posts',
    {
      observe: 'body',
      responseType: 'json',

    })
    .map(
      (ads) => {
        console.log(ads);
        // tslint:disable-next-line:prefer-const
        for (let ad of ads) {
          if (!ad['ingredients']) {
            console.log(ad);
            ad['ingredients'] = [];
          }
        }
        return ads;
      }
    )
    .subscribe(
        (ads: Ads[]) => {
          this.adsService.setAds(ads);
        }
      );
  }
}
