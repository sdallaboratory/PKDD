import { Component, OnInit } from '@angular/core';
import { PkddUser } from '../../../models/auth/pkdd-user';
import { UserRepositoryService } from '../../services/user-repository.service';
import { SearchService } from 'src/app/search/services/search.service';
import { UserCategory } from '../../models/user-category';
import { PkddRoles } from 'src/app/models/auth/pkdd-roles.enum';
import { NotificatorService } from 'src/app/notification/services/notificator.service';

@Component({
  selector: 'pkdd-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public query = '';
  public users: PkddUser[] = [];
  private _usersCategories: UserCategory[] = [];
  public isLoading = true;

  public get usersCategories() {
    // this.fillCategories();
    return this._usersCategories;

  }

  constructor(
    private readonly repos: UserRepositoryService,
    private readonly search: SearchService,
    private readonly notificator: NotificatorService
  ) { }

  async ngOnInit() {
    const usersPromise = this.repos.getUsers();
    this.notificator.trackPromise(usersPromise, { showProgress: true });
    this.users = await usersPromise;
    this.update();
    this.isLoading = false;
  }



  public update() {
    const filteredUsers = this.search.search(this.users, this.query);
    console.log(filteredUsers);
    this._usersCategories = [
      {
        name: 'Новые пользователи',
        users: filteredUsers.filter(u => !u.isConfirmed && !u.isBanned)
      },
      {
        name: 'Администраторы',
        users: filteredUsers.filter(u => u.roles.includes('admin'))
      },
      {
        name: 'Эксперты и модераторы',
        users: filteredUsers.filter(u => u.isConfirmed && !u.isBanned && !u.roles.includes('admin'))
      },
      {
        name: 'Забаненные пользователи',
        users: filteredUsers.filter(u => u.isBanned)
      },
    ];
  }

  public async onQueryChange(newQuery: string) {
    this.query = newQuery;
    await this.update();
  }

}
