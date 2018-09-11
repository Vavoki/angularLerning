import { Component, OnInit, Input } from '@angular/core';
import { Ads } from '../../ads.model';

@Component({
  selector: 'app-ad-item',
  templateUrl: './ad-item.component.html',
  styleUrls: ['./ad-item.component.css']
})
export class AdItemComponent implements OnInit {
  @Input() ads: Ads;
  @Input() index: number;
  link = '1';
  constructor() { }

  ngOnInit() {
    console.log(this.index);
  }

}
