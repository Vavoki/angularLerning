import { Component, OnInit, Input } from '@angular/core';
import { Ads } from '../../ads.model';
import { state, trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-ad-item',
  templateUrl: './ad-item.component.html',
  styleUrls: ['./ad-item.component.css'],
  animations: [
    trigger('fade', [
      transition('void <=> *', [
        style({ opacity: 0 }),
        animate(1000, style({opacity: 1}))
      ])
    ])
  ]
})
export class AdItemComponent implements OnInit {
  @Input() ads: Ads;
  @Input() index: number;
  link = '1';
  constructor() { }

  ngOnInit() {
  }

}
