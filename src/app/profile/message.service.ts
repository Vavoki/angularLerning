import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage';

@Injectable()
export class MessageService {

  constructor() { }

  message: any[] = [];
  messageChanged = new BehaviorSubject<any>(this.message);
  public message$ = this.messageChanged.asObservable();

  setMessage(apiMessages: any[]) {
      this.message = apiMessages;
      this.messageChanged.next(this.message);
  }
}
