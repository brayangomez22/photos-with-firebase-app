import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styles: [],
})
export class LoadComponent implements OnInit {
  private FOLDER_IMAGES = 'img';
  collection: any;
  dataBD: any;

  constructor(private db: Firestore) {}

  ngOnInit(): void {}

  private saveImage(image: { name: string; url: string }) {
    this.collection = collection(this.db, 'items');
    this.dataBD.collectionData(`/${this.FOLDER_IMAGES}`).add(image);
  }
}
