import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AdsService } from '../ads.service';
import { FormsModule } from '@angular/forms';
import { DataStorageService } from '../../shared/data-storage';
import { Types } from '../../shared/typesFilter.model';
import { Observable, Subject, Subscription } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
@Component({
  selector: 'app-controll-ads',
  templateUrl: './controll-ads.component.html',
  styleUrls: ['./controll-ads.component.css']
})
export class ControllAdsComponent implements OnInit, OnDestroy {
  private keyUp = new Subject<any>();
  subscription: Subscription;
  types: Types[];
  constructor(private adsService: AdsService,
              private apiService: DataStorageService) {
                this.subscription = this.keyUp
                .map(value => value.target.value)
                .debounceTime(500)
                .distinctUntilChanged()
                .flatMap((search) => {
                  return Observable.of(search).delay(500);
                })
                .subscribe((data) => {
                  console.log('data', data);
                  this.adsService.filterObj.term = data;
                  this.adsService.filter();
                });
              }
  ngOnInit() {
    console.log('start');
    console.log(this.subscription);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('end');
    console.log(this.subscription);
  }
}
