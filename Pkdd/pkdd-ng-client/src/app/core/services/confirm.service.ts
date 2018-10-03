import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor() { }

  public confirm(message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const confirmed = confirm(message);
      resolve(confirmed);
    });
  }
}
