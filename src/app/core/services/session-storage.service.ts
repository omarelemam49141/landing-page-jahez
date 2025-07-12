import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { enSessionStorageKeys } from '../enums/en-session-storage-keys';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  //properties
  private secretKey = "embeded-store-front-secret-key";

  constructor() { }

  //methods
  private encrypt(value: any) {
    const stringValue = JSON.stringify(value);
    return CryptoJS.AES.encrypt(stringValue, this.secretKey).toString();
  }

  private decrypt(value: any) {
    const bytes = CryptoJS.AES.decrypt(value, this.secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  private getItem(key: string): any {
    const storedValue = sessionStorage.getItem(key);
    if (storedValue) {
      let decryptedValue = this.decrypt(storedValue);
      return decryptedValue;
    }
    return null;
  }

  private setItem(key: string, value: any) {
    const encryptedValue = this.encrypt(value);
    sessionStorage.setItem(key, encryptedValue);
  }

  //setters
  set lang(lang: string) {
    this.setItem(enSessionStorageKeys.lang, lang);
  }
  //getters
  get lang() {
    return this.getItem(enSessionStorageKeys.lang);
  }
}
