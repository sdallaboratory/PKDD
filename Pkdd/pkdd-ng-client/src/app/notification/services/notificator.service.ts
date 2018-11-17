import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Notification } from '../models/notification';
import { PromiseTrackInfo } from '../models/promise-track-info';
import { remove } from 'src/app/core/utils/remove';

@Injectable({
  providedIn: 'root'
})
export class NotificatorService {

  private readonly promises: Promise<any>[] = [];

  public enabled = true;

  constructor(
    public readonly snackBar: MatSnackBar,
  ) { }

  public toggleNotificationsEnabled(): boolean {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  public notificate(notification: Notification): void {
    if (!this.enabled) {
      return;
    }

    this.snackBar.open(notification.message, notification.action, {
      duration: 1000 + notification.message.length * 25,
      panelClass: [notification.type]
    });
  }

  public success(message: string): void {
    this.notificate({ message, action: 'Готово 😁', type: 'success' });
  }

  public fail(message: string): void {
    this.notificate({ message, action: 'Ошибка 😬', type: 'fail' });
  }

  public async trackPromise<T>(promise: Promise<T>, info: PromiseTrackInfo = {}) {
    if (info.showProgress) {
      this.promises.push(promise);
    }
    try {
      await promise;
      if (info.successMessage) {
        this.success(info.successMessage);
      }
    } catch {
      if (info.failMessage) {
        this.fail(info.failMessage);
      }
    } finally {
      remove(this.promises, promise);
    }
  }

  public get showProgress() {
    return this.promises.length > 0;
  }
}
