import { Injectable } from '@angular/core';
import { Configuration } from '../../models/core/configuration';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() {
    this.config = environment;
  }


  public readonly config: Configuration;
}
