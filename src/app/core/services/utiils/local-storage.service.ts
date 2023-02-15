import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
type StorageKeys = 'AUTHOR_NAME' | 'USER_DATA' | 'SIDEBAR_STATE';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getDecodedToken(): any {
    try {
      const data: any = localStorage.getItem(`token`);
      return jwtDecode(data);
    } catch (error) {
      return error;
    }
  }
  getToken() {
    try {
      const data: any = localStorage.getItem(`token`);
      return JSON.parse(data) as string;
    } catch (error) {
      return error;
    }
  }
  getRefreshToken() {
    try {
      const data: any = localStorage.getItem(`refresh-token`);
      return JSON.parse(data) as string;
    } catch (error) {
      return error;
    }
  }
  setRefreshToken(token: string) {
    try {
      localStorage.setItem(`refresh-token`, JSON.stringify(token));
    } catch (error) {
      return error;
    }
  }
  setToken(token: string) {
    try {
      localStorage.setItem(`token`, JSON.stringify(token));
    } catch (error) {
      return error;
    }
  }
  clearAll() {
    try {
      localStorage.clear();
    } catch (error) {
      return error;
    }
  }
  setData(data: any, key: StorageKeys) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      return error;
    }
  }
  getDate(key: StorageKeys) {
    try {
      const data: any = localStorage.getItem(key);
      return JSON.parse(data);
    } catch (error) {
      return error;
    }
  }
  removeData(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      return error;
    }
  }
}
