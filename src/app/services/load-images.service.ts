import { Injectable } from '@angular/core';

import { FileItem } from '../models/file-item';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadImagesService {
  private FOLDER_IMAGES = 'img';

  constructor(
    public firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  loadImagesFirebase(images: FileItem[]) {
    for (const item of images) {
      item.isGoing = true;
      if (item.progress >= 100) {
        continue;
      }

      const file = item.file;
      const filePath = `${this.FOLDER_IMAGES}/${item.nameFile}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);

      // con esta función nos suscribimos a los cambios en el progreso
      uploadTask
        .percentageChanges()
        .subscribe((resp) => (item.progress = Number(resp)));
      // obtengo el url de descarga cuando este disponible
      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() =>
            fileRef.getDownloadURL().subscribe((url) => {
              console.log('Imagen cargada con exito');
              item.url = url;
              item.isGoing = false;
              this.saveImage({
                name: item.nameFile,
                url: item.url,
              });
            })
          )
        )
        .subscribe();
    }
  }

  private saveImage(image: { name: string; url: string }) {
    this.firestore.collection(`/${this.FOLDER_IMAGES}`).add(image);
  }
}
