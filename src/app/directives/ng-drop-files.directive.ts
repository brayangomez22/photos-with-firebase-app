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
    this._preventStop(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseOn.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transfer = this._getTransfer(event);

    if (!transfer) {
      return;
    }

    this._extractFiles(transfer.files);
    this._preventStop(event);

    this.mouseOn.emit(false);
  }

  private _getTransfer(event: any) {
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  }

  private _extractFiles(fileList: FileList) {
    for (const property in Object.getOwnPropertyNames(fileList)) {
      const temporaryFile = fileList[property];

      if (this._fileCanBeUploaded(temporaryFile)) {
        const newFile = new FileItem(temporaryFile);
        this.files.push(newFile);
      }
    }

    console.log(this.files);
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
