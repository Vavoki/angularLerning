import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@fortawesome/fontawesome';
import { DataStorageService } from '../../../shared/data-storage';

@Component({
  selector: 'app-detail-message',
  templateUrl: './detail-message.component.html',
  styleUrls: ['./detail-message.component.css']
})
export class DetailMessageComponent implements OnInit {
  message: any;
  constructor(private route: ActivatedRoute,
              private apiService: DataStorageService) { }

  ngOnInit() {
    this.route.params
    .switchMap((param: Params) => {
      return this.apiService.getCurrentMessage(+param['id']);
    }).subscribe(
      (data) => {
        this.message = data;
      }
    );
  }

}
