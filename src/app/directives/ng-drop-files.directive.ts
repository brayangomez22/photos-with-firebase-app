import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]',
})
export class NgDropFilesDirective {
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
}
