import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdsService } from '../ads.service';
import { Ads } from '../ads.model';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { PaginationCustomService } from '../pagination/pagination.service';
import { DataStorageService } from '../../shared/data-storage';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

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
  query: any;
  subscribtion: Subscription;
  pagerSub: Subscription;
  routeEvent: Subscription;
  constructor(public adsService: AdsService,
              private paginationService: PaginationCustomService,
              private apiService: DataStorageService,
              private httpClient: HttpClient,
              private route: ActivatedRoute,
              private router: Router
            ) { }

ngOnInit() {
  this.query = this.route.snapshot.queryParams;
  this.setPage(1);
  this.routeEvent = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
        this.query = this.route.snapshot.queryParams;
        this.apiService.getAdsOffsetLimit(0, 5, this.query);
      });
    this.subscribtion = this.adsService.adsChanged.subscribe(data => {
      if (data) {
        this.ads = data;
      }
      if (this.route.url['value'].length) {
        if (this.route.url['value'][0].path === 'list') {
          this.ads = data;
        }
      }
    });
    this.pagerSub = this.adsService.pagerChanged.subscribe(
      data => {
        this.pager = data;
      }
    );

  }
  setPage(page: number, query?) {
    this.apiService.getAdsOffsetLimit(page, 5, this.query);
  }
  ngOnDestroy() {
    this.subscribtion.unsubscribe();
    this.pagerSub.unsubscribe();
    this.routeEvent.unsubscribe();
  }
}
