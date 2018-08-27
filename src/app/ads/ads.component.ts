import { Component, OnInit } from '@angular/core';
import { DataService } from '../api.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  data;
  constructor(private apiservice: DataService) { }

  ngOnInit() {
    this.data = this.apiservice.getUsers();
    console.log('DATA', this.data.value);
  }

}
