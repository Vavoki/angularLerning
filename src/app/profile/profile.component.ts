import { Component, OnInit } from '@angular/core';
import { AdsService } from '../ads/ads.service';
import { Ads } from '../ads/ads.model';
import { AuthService } from '../auth/auth.service';
import { state, trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(1000)
      ])
    ])
  ]
})
export class ProfileComponent implements OnInit {
  authAds: Ads[];
  constructor(private adsService: AdsService,
              private authService: AuthService) { }

  ngOnInit() {
   this.authAds =  this.adsService.getAdsbyAuth(this.authService.email);
  }

}
