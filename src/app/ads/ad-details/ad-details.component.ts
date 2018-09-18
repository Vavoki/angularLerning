import { Component, OnInit } from '@angular/core';
import { Ads } from '../ads.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AdsService } from '../ads.service';
import { AuthService } from '../../auth/auth.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { state, trigger, transition, style, animate } from '@angular/animations';
import { Img } from '../../shared/img.model';
import { DataStorageService } from '../../shared/data-storage';
@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css'],
  animations: [
    trigger('fade', [
      transition('void <=> *', [
        style({ opacity: 0 }),
        animate(1000, style({opacity: 1}))
      ])
    ])
  ]

})
export class AdDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  id: number;
  ads: Ads;
  authAds: Ads[];
  imgs;
  link: number;
  contacts;
  title;
  isOpen = false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private adsService: AdsService,
              private authService: AuthService,
              private apiService: DataStorageService) { }

  ngOnInit() {
    let email;
    this.route.params
      .subscribe((params: Params) => {
          this.id = +params['id'];
          this.ads = this.adsService.getAd(this.id);
          this.imgs = this.ads.imgs;
          this.contacts = this.ads.contact;
      });
      email = this.contacts[0].email;
      this.authAds = this.adsService.getAdsbyAuth(email);
      this.galleryOptions = [
        {
          imageSize: `contain`,
        },
        {
          breakpoint: 500,
          width: '300px',
          height: '300px',
          thumbnailsColumns: 3 },
        {
          breakpoint: 300,
          width: '100%',
          height: '200px',
          thumbnailsColumns: 2 }
      ];
    let element = {};
    this.galleryImages = [];
    for (let i = 0; i < this.imgs.length; i++) {
      element = {
        small: this.imgs[i].imgPath,
        medium:  this.imgs[i].imgPath,
        big:  this.imgs[i].imgPath
      };
      this.galleryImages.push(element);
      this.title = this.imgs[0].imgPath;
    }
  }
  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDelete() {
    this.apiService.deleteAdd(this.id);
    this.adsService.deleteAd(this.id);
    this.router.navigate(['../']);
  }
  onOpen() {
    this.isOpen = true;
  }
  changeTitleImg(event) {
    this.title = event.target.src;
  }
}
