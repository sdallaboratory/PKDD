import { Component, OnInit } from '@angular/core';
import { PkddUser } from '../../../models/auth/pkdd-user';
import { UserRepositoryService } from '../../services/user-repository.service';

@Component({
  selector: 'pkdd-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public users: PkddUser[] = [];

  constructor(
    private readonly repos: UserRepositoryService
  ) { }

  ngOnInit() {
    this.repos.getUsers().then(v => this.users = v);
  }

}
