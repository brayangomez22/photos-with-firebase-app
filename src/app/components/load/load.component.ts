import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styles: [],
})
export class LoadComponent implements OnInit {
  private FOLDER_IMAGES = 'img';

  constructor(
    public firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {}

  ngOnInit(): void {}

  private saveImage(image: { name: string; url: string }) {
    this.firestore.collection(`/${this.FOLDER_IMAGES}`).add(image);
  }
}
