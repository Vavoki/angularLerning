import { Component, OnInit } from '@angular/core';
import { Ads } from '../ads.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AdsService } from '../ads.service';
import { AuthService } from '../../auth/auth.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { state, trigger, transition, style, animate } from '@angular/animations';
import { Img } from '../../shared/img.model';
import { DataStorageService } from '../../shared/data-storage';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
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
  ads: any;
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
              private apiService: DataStorageService,
              private httpClient: HttpClient,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    let email;
    console.log('ROUTER', this.route.snapshot.params['id']);
    this.route.params
      .switchMap((params: Params) => {
        console.log('sss');
        this.id = +params['id'];
        return this.getCurrentAds(this.id);
      })
      .subscribe((data) => {
          console.log(data);
          this.ads = data[0];
          this.imgs = this.ads.imgs;
          this.contacts = this.ads.contact;
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
      });
  }
  getCurrentAds(id: number) {
    const url = `http://localhost:3000/posts?id=${id}`;
   return this.httpClient.get<Ads>(
     url,
    {
      observe: 'body',
      responseType: 'json',

    });
    }
  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDelete() {
    this.apiService.deleteAdd(this.id);
    this.adsService.deleteAd(this.id);
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['../']);
    }, 1000);
  }
  onOpen() {
    this.isOpen = true;
  }
  changeTitleImg(event) {
    this.title = event.target.src;
  }
  allAdsAuth() {
    this.adsService.authAdsElem = this.authAds;
    this.router.navigate(['/ads/list']);
  }
}
