import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AdsService } from '../ads.service';
import { FormsModule } from '@angular/forms';
import { DataStorageService } from '../../shared/data-storage';
import { Types } from '../../shared/typesFilter.model';
import { Observable, Subject, Subscription } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-controll-ads',
  templateUrl: './controll-ads.component.html',
  styleUrls: ['./controll-ads.component.css']
})
export class ControllAdsComponent implements OnInit, OnDestroy {
  private keyUp = new Subject<any>();
  subscription: Subscription;
  types: Types[];
  title = '';
  constructor(private adsService: AdsService,
              private router: Router,
              private rout: ActivatedRoute,
              private apiService: DataStorageService) {
                this.subscription = this.keyUp
                .map(value => value.target.value)
                .debounceTime(500)
                .distinctUntilChanged()
                .flatMap((search) => {
                  return Observable.of(search).delay(500);
                })
                .subscribe((data) => {
                  this.adsService.filterObj.title = data;
                  this.router.navigate(['/ads'], {queryParams: this.adsService.filterObj});
                });
              }
  ngOnInit() {
    this.title = this.rout.snapshot.queryParams.title;
    console.log(this.title);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
