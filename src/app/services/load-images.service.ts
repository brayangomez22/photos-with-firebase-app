import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root',
})
export class LoadImagesService {
  private FOLDER_IMAGES = 'img';

  constructor(public firestore: AngularFirestore) {}

  loadImagesFirebase(images: FileItem[]) {
    console.log(images);
  }

  private saveImage(image: { name: string; url: string }) {
    this.firestore.collection(`/${this.FOLDER_IMAGES}`).add(image);
  }
}
