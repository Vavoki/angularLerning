import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { AdsService } from '../ads/ads.service';
import { Ads } from '../ads/ads.model';
import { AuthService } from '../auth/auth.service';
import { Types } from './typesFilter.model';
import { PaginationCustomService } from '../ads/pagination/pagination.service';
import { Observable } from 'rxjs/Rx';
import { query } from '@angular/animations';
import { take } from 'rxjs/operators';
import { MessageService } from '../profile/message.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type':  'application/json',
  })
};
@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private adsService: AdsService,
              private paginationService: PaginationCustomService,
              private messageService: MessageService
              ) {}
  deleteAdd(id: number) {
    const url = `http://localhost:3001/ads/${id}`;
    return this.httpClient.delete(url, httpOptions)
    .map(
      (ads) => {
        return ads;
      }
    )
    .subscribe(
        (ads: any) => {
        const newAds = ads[0];
        this.adsService.setAds(newAds);
        const pager = this.paginationService.getPager( ads[1], 1);
        this.adsService.pagination(pager);
        }
      );
  }
  updateAdd(id: number, updAdd: Ads) {
    updAdd.id = id;
    const url = `http://localhost:3001/ads/edit/${id}`;
    return this.httpClient.put(url, updAdd, httpOptions)
    .map(
      (ads) => {
        return ads;
      }
    )
    .subscribe(
        (ads: any) => {
        const newAds = ads[0];
        this.adsService.setAds(newAds);
        }
      );
  }
  addNewAdd (ad: any) {
     this.httpClient.post<Ads>('http://localhost:3001/ads', ad, httpOptions)
     .map(
      (ads) => {
        return ads;
      }
    )
    .subscribe(
        (ads: any) => {
        const newAds = ads[0];
        this.adsService.setAds(newAds);
        const pager = this.paginationService.getPager( ads[1], 1);
        this.adsService.pagination(pager);
        }
      );
   }
   // tslint:disable-next-line:no-shadowed-variable
   getAdsOffsetLimit(page: number, limit: number, query?: any) {
    const filterObj = this.adsService.filterObj;
    let skip;
    if (page === 1 || page === 0) {
      skip =  0;
    } else {
      skip = (page - 1) * 5;
    }
    if (Object.keys(query).length === 0) {
      query = filterObj;
    }
    const newQuery = {...query, ...{take: limit}, ...{skip: skip}};
    const url =
    `http://localhost:3001/ads`;
    this.httpClient.get<any[]>(
      url,
    {
      observe: 'body',
      responseType: 'json',
      params: newQuery,

    })
    .map(
      (ads) => {
        return ads;
      }
    )
    .subscribe(
        (ads: any) => {
        const newAds = ads[0];
        this.adsService.setAds(newAds);
        const pager = this.paginationService.getPager( ads[1], page);
        this.adsService.pagination(pager);
        }
      );
  }
  addNewUser(formValue): Observable<any> {
    const result = this.httpClient.post<any>(`http://localhost:3001/user`, formValue, httpOptions);
     return result;
  }
  loginUser(formValue): Observable<any> {
    const result = this.httpClient.post<any>(`http://localhost:3001/user/login`, formValue, httpOptions);
     return result;
  }
  getCurrentAds(id: number) {
    const url = `http://localhost:3001/ads/${id}`;
    return this.httpClient.get<any>(
     url,
    {
      observe: 'body',
      responseType: 'json',

    });
    }
  getCurrentMessage(id: number) {
    return this.httpClient.get<any>(
      `http://localhost:3001/message/${id}`,
    {
      observe: 'body',
      responseType: 'json',
   });
  }
  getAdsbyUserId(id: number) {
    const url = `http://localhost:3001/ads/userAds/${id}`;
    return this.httpClient.get<any[]>(
      url,
      {
        observe: 'body',
        responseType: 'json',
      }
    );
  }
  getTypesFilter() {

    this.httpClient.get<Types[]>('http://localhost:3001/types',
    {
      observe: 'body',
      responseType: 'json',

    })
    .map(
      // tslint:disable-next-line:no-shadowed-variable
      (types) => {
        return types;
      }
    )
    .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        (types: any) => {
          this.adsService.setTypes(types);
        }
      );
  }
  postMessage(message: any) {
   const result =  this.httpClient.post<any>(`http://localhost:3001/message`, message, httpOptions);
   return result;
  }
  getMessage(id: number) {
    this.httpClient.get<any[]>(
      `http://localhost:3001/message?id=${id}`,
    {
      observe: 'body',
      responseType: 'json',

    })
    .map(
      (message) => {
        return message;
      }
    )
    .subscribe(
        (message: any) => {
         this.messageService.setMessage(message);
        }
      );
  }
}
