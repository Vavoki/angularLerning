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
        console.log(fileUpload);
        const storageRef = firebase.storage().ref();
        const date = Date.now();
        const field = date + fileUpload.name;
        console.log('field', field);
        const uploadTask = storageRef.child(`${this.basePath}/${field}`).put(fileUpload);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            // in progress
            const snap = snapshot as firebase.storage.UploadTaskSnapshot;
            progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
          },
          (error) => {
            // fail
            console.log(error);
          },
          () => {
            // success
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              console.log('File available at', downloadURL);
              const url = downloadURL;
              this.imgListUrl.push(downloadURL);
              this.imgListUrlChanged.next(this.imgListUrl);
              console.log(this.imgListUrlChanged);
            });
          }
        );
  }
}
