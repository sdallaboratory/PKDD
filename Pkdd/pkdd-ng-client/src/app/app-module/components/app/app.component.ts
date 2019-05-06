import { Component } from '@angular/core';
import { OnlineService } from 'src/app/core/services/online.service';
import { filter, skip } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { NoNetworkModalComponent } from 'src/app/layout/components/no-network-modal/no-network-modal.component';

@Component({
  selector: 'pkdd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private readonly online: OnlineService,
    private readonly dialog: MatDialog
  ) {
    // online.isOnline.subscribe(state => console.log(state));
    online.isOnline.pipe(filter(o => !o)).subscribe(() => {
      this.dialog.open(NoNetworkModalComponent, { disableClose: true, width: '95vw', maxWidth: '700px' });
      console.log('dialog');
    });
    online.isOnline.pipe(skip(1), filter(o => o)).subscribe(() => location.reload());

  }
}
