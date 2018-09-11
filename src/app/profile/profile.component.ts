import { Component, OnInit } from '@angular/core';
import { AdsService } from '../ads/ads.service';
import { Ads } from '../ads/ads.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  authAds: Ads[];
  constructor(private adsService: AdsService,
              private authService: AuthService) { }

  ngOnInit() {
   this.authAds =  this.adsService.getAdsbyAuth(this.authService.email);
  }

}
