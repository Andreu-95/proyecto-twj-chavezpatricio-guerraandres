import { Injectable } from '@angular/core';

@Injectable()
export class MasterURLService {

  private _url: string;

  constructor() {
    this._url = 'http://localhost:1337/';
  }

  get url(): string {
    return this._url
  }

  set url(nuevoURL: string) {
    this._url = nuevoURL
  }
}
