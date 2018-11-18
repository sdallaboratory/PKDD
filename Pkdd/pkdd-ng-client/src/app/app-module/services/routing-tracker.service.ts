import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { NotificatorService } from 'src/app/notification/services/notificator.service';
import { first } from 'rxjs/internal/operators/first';
import { MenuService } from 'src/app/core/services/menu.service';

@Injectable()
export class RoutingTrackerService {

  navigationStart: Observable<NavigationStart>;
  navigationEnd: Observable<any>;

  constructor(
    private readonly router: Router,
    private readonly notificator: NotificatorService,
    private readonly menu: MenuService
    ) {
    console.log('Routing tracker was created');

    this.navigationStart = router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ) as Observable<NavigationStart>;

    this.navigationEnd = router.events.pipe(
      filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError)
    ) as Observable<NavigationEnd>;

    this.navigationStart.subscribe(event => this.trackRouting(event));
  }

  private trackRouting(event) {
    this.menu.sideMenuOpened = false;
    console.log('start tracking routing', event);
    const promise = new Promise<void>((resolve, reject) => {
      const subscription = this.navigationEnd.pipe(first()).subscribe(null, () => resolve(), () => resolve());
    });
    this.notificator.trackPromise(promise, { showProgress: true });
  }

}
