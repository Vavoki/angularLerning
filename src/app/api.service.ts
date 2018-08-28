import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Ads } from './ads/ads.model';

@Injectable()
export class ApiService {
  ads: Ads[];
  constructor(private http: HttpClient) {}
  getPosts() {
    return this.http.get<Ads[]>('http://localhost:3000/posts')
      .subscribe(
        (data) => {
          this.ads = data;
        }
      );
  }
 }
