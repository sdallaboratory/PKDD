import { Component, OnInit } from '@angular/core';
import { ServerDataStorageService } from 'src/app/core/services/server-data-storage.service';

@Component({
  selector: 'pkdd-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(
    private storage: ServerDataStorageService
  ) { }

  ngOnInit() {
  }

}
