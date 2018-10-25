import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdsService } from '../../ads.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { DataStorageService } from '../../../shared/data-storage';

@Component({
  selector: 'app-feedback-author',
  templateUrl: './feedback-author.component.html',
  styleUrls: ['./feedback-author.component.css']
})
export class FeedbackAuthorComponent implements OnInit, OnDestroy {
  isOpen = false;
  subsctiption: Subscription;
  id: number;
  constructor(private adsService: AdsService,
              private route: ActivatedRoute,
              private apiService: DataStorageService) { }

  ngOnInit() {
    this.subsctiption = this.route.params
    .switchMap((params: Params) => {
      const id = +params['id'];
      return this.apiService.getCurrentAds(id);
    })
    .subscribe((data) => {
      console.log(data.user.id);
      this.id = data.user.id;
    });
  }
  ngOnDestroy() {
    this.subsctiption.unsubscribe();
  }
  onOpen() {
    this.isOpen = true;
  }
  onSubmit(form: NgForm) {
    const message = {...form.value, ...{user: this.id}};
    console.log(message);
    this.apiService.postMessage(message).subscribe();
  }
}
