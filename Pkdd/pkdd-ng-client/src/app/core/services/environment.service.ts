import { Injectable } from '@angular/core';
import { Configuration } from '../../models/core/configuration';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() {
    this.config = environment;
  }

  public readonly config: Configuration;
}
