import { Component, OnInit } from '@angular/core';
import { AdsService } from '../ads.service';
import { Ads } from '../ads.model';


@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  ads: Ads[];
  constructor(private adsService: AdsService) { }

  ngOnInit() {
    this.ads = this.adsService.getAds();
    console.log(this.ads);
  }

}
