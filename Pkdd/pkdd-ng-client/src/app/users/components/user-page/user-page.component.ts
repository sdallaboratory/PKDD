import { Component, OnInit } from '@angular/core';
import { ServerDataStorageService } from 'src/app/core/services/server-data-storage.service';

@Component({
  selector: 'pkdd-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  updateOnlineStatus(event) {
    const condition = navigator.onLine ? "online" : "offline";

    status.className = condition;
    status.innerHTML = condition.toUpperCase();

    log.insertAdjacentHTML("beforeend", "Event: " + event.type + "; Status: " + condition);
  }

  constructor(
    private storage: ServerDataStorageService
  ) {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  }

  ngOnInit() {
  }

}
