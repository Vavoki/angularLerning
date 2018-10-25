import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { PaginationService } from 'ngx-pagination';
import { PaginationCustomService } from '../pagination/pagination.service';
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
export class AdDetailsComponent implements OnInit, OnDestroy {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  id: number;
  userId: number;
  ads: any;
  authAds: Ads[];
  imgs;
  link: number;
  contacts;
  title;
  isOpen = false;
  subsctiption: Subscription;
  adsSub: Subscription;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private adsService: AdsService,
              private authService: AuthService,
              private apiService: DataStorageService,
              private paginationService: PaginationCustomService,
              private httpClient: HttpClient,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.subsctiption = this.route.params
      .switchMap((params: Params) => {
        this.id = +params['id'];
        return this.apiService.getCurrentAds(this.id);
      })
      .subscribe((data) => {
          this.ads = data;
          this.imgs = this.ads.imgs;
          this.userId = data.user.id;
          this.getAds(data.user.id);
          this.galleryOptions = [
            {
              width: '350px',
              imageSize: `contain`,
            },
            {
              breakpoint: 500,
              width: '150px',
              height: '350px',
              thumbnailsColumns: 3 },
            {
              breakpoint: 300,
              width: '50%',
              height: '200px',
              thumbnailsColumns: 2 }
          ];
        let element = {};
        this.galleryImages = [];
        for (let i = 0; i < this.imgs.length; i++) {
          element = {
            small: this.imgs[i],
            medium:  this.imgs[i],
            big:  this.imgs[i]
          };
          this.galleryImages.push(element);
          this.title = this.imgs[0];
        }
      });
  }
  ngOnDestroy() {
    this.subsctiption.unsubscribe();
  }
  getAds(id: number) {
    this.adsSub = this.apiService.getAdsbyUserId(id)
   .subscribe(
     (data) => {
      this.authAds = data[0];
      this.adsService.setAds(data[0]);
      const pager = this.paginationService.getPager( data[1], 1);
      this.adsService.pagination(pager);
     }
     );
  }
  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDelete() {
    this.apiService.deleteAdd(this.id);
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
    this.router.navigate(['/ads/list'], {queryParams: {id: this.userId}});
  }
}
