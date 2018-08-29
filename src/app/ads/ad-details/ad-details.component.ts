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
  imgs;
  contacts;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private adsService: AdsService,
              private authService: AuthService) { }

  ngOnInit() {
    console.log(this.route.params);
    this.route.params
      .subscribe((params: Params) => {
          this.id = +params['id'];
          this.ads = this.adsService.getAd(this.id);
          this.imgs = this.ads.imgs;
          this.contacts = this.ads.contact;
      });

  }
  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDelete() {
    this.adsService.deleteAd(this.id);
    this.router.navigate(['../']);
  }
}
