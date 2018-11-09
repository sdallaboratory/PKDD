import { EnvironmentService } from './environment.service';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlConstructorService {

  private readonly backendApiUrl = 'api';
  private readonly personsUrl = 'persons';
  private readonly bioUrl = `${this.personsUrl}/bio`;
  private readonly contentUrl = `contents`;
  private readonly adminUrl = `admin`;

  constructor(
  ) {
  }

  public getPersonUrl(id: null | number): string {
    const baseUrl = `${this.backendApiUrl}/${this.personsUrl}`;
    return isNullOrUndefined(id) ? baseUrl : `${baseUrl}/${id}`;
  }

  public getBioUrl(id: null | number): string {
    const baseUrl = `${this.backendApiUrl}/${this.bioUrl}`;
    return isNullOrUndefined(id) ? baseUrl : `${baseUrl}/${id}`;
  }

  public getContentsUrl(bioId: number, contentsId: null | number, parentId: null | number): string {
    const baseUrl = `${this.getBioUrl(bioId)}/${this.contentUrl}`;
    const contentsUrl = isNullOrUndefined(contentsId) ? baseUrl : `${baseUrl}/${contentsId}`;
    return isNullOrUndefined(parentId) ? contentsUrl : `${contentsUrl}/${parentId}`;
  }

  public getUsersUrl(id: null | number = null) {
    const baseUrl = `${this.backendApiUrl}/${this.adminUrl}`;
    return isNullOrUndefined(id) ? baseUrl : `${baseUrl}/${id}`;
  }
}
