import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdsService } from '../ads.service';
import { Ads } from '../ads.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  ads: Ads[];
  subsctiption: Subscription;
  constructor(public adsService: AdsService) { }

  ngOnInit() {

  }
}
