import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _user$ = new ReplaySubject<any>(1);

  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: StorageService,
  ) {

  }
}
