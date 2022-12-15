import { HttpClient, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { config } from '../config';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppHttpService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  get(url: string, params?: any) {
    return this.http.request('GET', config.api.baseUrl + url, {
      params: new HttpParams({ fromObject: params }),
      headers: new HttpHeaders({
        Authorization: config.api.tokenValue(this.storage.get('token') || ''),
      }),
    });
  }

  post(url: string, body: any, params: any = {}): Observable<any> {
    const token =
      this.storage.get('token') &&
      config.api.tokenValue(this.storage.get('token'));

    return this.http.request('POST', config.api.baseUrl + url, {
      body: body,
      params: new HttpParams({ fromObject: params }),
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token && { Authorization: token }),
      }),
    });
  }

  patch(url: string, body: any, params: any = {}): Observable<any> {
    return this.http.request('PATCH', config.api.baseUrl + url, {
      body: body,
      params: new HttpParams({ fromObject: params }),
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: config.api.tokenValue(this.storage.get('token') || ''),
      }),
    });
  }

  delete(url: string, params: any = {}): Observable<any> {
    return this.http.request('DELETE', config.api.baseUrl + url, {
      params: new HttpParams({ fromObject: params }),
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: config.api.tokenValue(this.storage.get('token') || ''),
      }),
    });
  }
}
