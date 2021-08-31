export class FileItem {
  public file: File;
  public nameFile: string;
  public url: string;
  public isGoing: boolean;
  public progress: number;

  constructor(file: File) {
    this.file = file;
    this.nameFile = file.name;
    this.url = '';
    this.isGoing = false;
    this.progress = 0;
  }
}
