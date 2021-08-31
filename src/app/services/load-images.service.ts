import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { FileItem } from '../models/file-item';

import firebase from 'firebase';
import 'firebase/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class LoadImagesService {
  private FOLDER_IMAGES = 'img';

  constructor(public firestore: AngularFirestore) {}

  loadImagesFirebase(images: FileItem[]) {
    const storageRef = firebase.storage().ref();

    for (const item of images) {
      item.isGoing = true;
      if (item.progress >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef
        .child(`${this.FOLDER_IMAGES}/${item.nameFile}`)
        .put(item.file);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => {
          (item.progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100),
            () => {
              console.log('Img ready');
              item.isGoing = false;
              this.saveImage({
                name: item.nameFile,
                url: item.url,
              });
            };
        }
      );
    }
  }

  private saveImage(image: { name: string; url: string }) {
    this.firestore.collection(`/${this.FOLDER_IMAGES}`).add(image);
  }
}
