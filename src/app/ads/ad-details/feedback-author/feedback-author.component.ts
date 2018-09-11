import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-author',
  templateUrl: './feedback-author.component.html',
  styleUrls: ['./feedback-author.component.css']
})
export class FeedbackAuthorComponent implements OnInit {
  isOpen = false;
  constructor() { }

  ngOnInit() {
  }
  onOpen() {
    this.isOpen = true;
  }
}
