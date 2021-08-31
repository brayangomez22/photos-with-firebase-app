import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]',
})
export class NgDropFilesDirective {
  @Input() files: FileItem[] = [];
  @Output() mouseOn: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseOn.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseOn.emit(false);
  }

  // VALIDATIONS
  private _fileCanBeUploaded(file: File): boolean {
    if (!this._fileWasAlreadyDroppeado(file.name) && this._isImage(file.type)) {
      return true;
    } else {
      return false;
    }
  }

  private _preventStop(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileWasAlreadyDroppeado(nameFile: string): boolean {
    for (const file of this.files) {
      if (file.nameFile === nameFile) {
        console.log('pepe');
        return true;
      }
    }

    return false;
  }

  private _isImage(typeFile: string): boolean {
    return typeFile === '' || typeFile === undefined
      ? false
      : typeFile.startsWith('image');
  }
}
