import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdsService } from '../ads.service';
import { Ads } from '../ads.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit, OnDestroy {
  ads: Ads[];
  subsctiption: Subscription;
  constructor(private adsService: AdsService) { }

  ngOnInit() {
    this.subsctiption = this.adsService.adsChanged
    .subscribe(
      (ads: Ads[]) => {
        this.ads = ads;
      }
    );
    this.ads = this.adsService.getAds();
    console.log(this.ads);
  }
  ngOnDestroy() {
    this.subsctiption.unsubscribe();
  }
}
