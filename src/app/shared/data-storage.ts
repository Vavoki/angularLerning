import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { AdsService } from '../ads/ads.service';
import { Ads } from '../ads/ads.model';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private adsService: AdsService,
              ) {}

  storeRecipes() {
/*
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-f088a.firebaseio.com/recipes.json',
    this.recipeService.getRecipes(), {
      reportProgress: true,
    })
    return this.httpClient.request(req); */
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
