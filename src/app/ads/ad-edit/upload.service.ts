import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  imgListUrl: any[] = [];
  private basePath = '/uploads';
  imgListUrlChanged = new BehaviorSubject<any[]>(this.imgListUrl);
  public imgs$ = this.imgListUrlChanged.asObservable();
  constructor() { }

  pushFileToStorage(fileUpload: any, progress: { percentage: number }) {
        const storageRef = firebase.storage().ref();
        const date = Date.now();
        const field = date + fileUpload.name;
        const uploadTask = storageRef.child(`${this.basePath}/${field}`).put(fileUpload);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            const snap = snapshot as firebase.storage.UploadTaskSnapshot;
            progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
          },
          (error) => {
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              const url = downloadURL;
              this.imgListUrl.push(downloadURL);
              this.imgListUrlChanged.next(this.imgListUrl);
            });
          }
        );
  }
}
