import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class PkddHttpService {

  constructor(
    private readonly http: HttpClient
  ) { }
}
