import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-current-message',
  templateUrl: './current-message.component.html',
  styleUrls: ['./current-message.component.css']
})
export class CurrentMessageComponent implements OnInit {
  @Input() message: any;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
