import { Component, OnInit } from '@angular/core';
import { Ads } from '../ads.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AdsService } from '../ads.service';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {
  id: number;
  ads: Ads;
  imgs;
  contacts;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private adsService: AdsService) { }

  ngOnInit() {
    console.log(this.route.params);
    this.route.params
      .subscribe((params: Params) => {
          this.id = +params['id'];
          this.ads = this.adsService.getAd(this.id);
          this.imgs = this.ads.imgs;
          this.contacts = this.ads.contact;
      });
    console.log('ads', this.ads);
    console.log('img', this.imgs[0].imgPath);
  }

}
