import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class UserService implements CanActivate {

  userId;
  userInfo: object;
  constructor(
    private router: Router
  ) { }

  canActivate() {
    if (!this.userId) {
      this.router.navigate(['/user/user-login']);
    }
    return !!this.userId;
  }
}
