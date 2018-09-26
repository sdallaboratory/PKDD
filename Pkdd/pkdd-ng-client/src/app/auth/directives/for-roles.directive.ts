import { Directive, ElementRef, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[pkddForRoles]',
})
export class ForRolesDirective implements OnInit {

  private roles = [];

  constructor(
    private element: ElementRef,
    private template: TemplateRef<any>,
    private view: ViewContainerRef,
    private auth: AuthService
  ) { }

  public ngOnInit() {
    this.auth.userChanged.subscribe(user => {
      this.updateViewAsync();
    });
  }

  @Input()
  public set pkddForRoles(val) {
    if (typeof val === 'string') {
      // TODO: preprocess string
      this.roles = val.toLowerCase().split(' ');
    } else {
      this.roles = val;
    }
    this.updateViewAsync();
  }

  private async updateViewAsync() {
    if (await this.checkRoleAsync()) {
      this.view.createEmbeddedView(this.template);
    } else {
      this.view.clear();
    }
  }

  private async checkRoleAsync() {
    const user = await this.auth.getUserAsync();

    if (!user || !user.roles || !this.roles) {
      return false;
    }
    
    return this.roles.some(role => user.roles.includes(role));
  }
}
