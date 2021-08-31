import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { LoadImagesService } from '../../services/load-images.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styles: [],
})
export class LoadComponent implements OnInit {
  isOnElement = false;
  files: FileItem[] = [];

  constructor(public _loadImagesService: LoadImagesService) {}

  ngOnInit(): void {}

  loadImages() {
    this._loadImagesService.loadImagesFirebase(this.files);
  }
}
