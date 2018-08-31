import { Component, OnInit } from '@angular/core';
import { Ads } from '../ads.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AdsService } from '../ads.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {
  id: number;
  ads: Ads;
  authAds: Ads[];
  imgs;
  link: number;
  contacts;
  isOpen = false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private adsService: AdsService,
              private authService: AuthService) { }

  ngOnInit() {
    console.log(this.ads);
    let email;
    this.route.params
      .subscribe((params: Params) => {
          this.id = +params['id'];
          this.ads = this.adsService.getAd(this.id);
          this.imgs = this.ads.imgs;
          this.contacts = this.ads.contact;
      });
      // this.link = '/ads/' + this.id;
      // console.log(this.link);
      email = this.contacts[0].email;
      this.authAds = this.adsService.getAdsbyAuth(email, this.id);
  }
  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDelete() {
    this.adsService.deleteAd(this.id);
    this.router.navigate(['../']);
  }
  onOpen() {
    this.isOpen = true;
  }
}
