import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: any[] = [];
  constructor(private authService: AuthService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.messageChanged.subscribe(
      (data) => {
        this.messages = data[0];
        console.log(this.messages);
      }
    );
  }

}
