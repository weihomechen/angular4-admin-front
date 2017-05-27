import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UserService } from '../user.service';

declare var SweetAlert: any;
declare var Common: any;

@Component({
  selector: 'app-user-forgetpwd',
  templateUrl: './user-forgetpwd.component.html',
  styleUrls: ['./user-forgetpwd.component.css']
})
export class UserForgetpwdComponent implements OnInit {
  mail;
  private error: Error;


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  doGetNewPwd() {
    Common.startLoading();
    this.userService.forgetPwd(this.mail).subscribe({
      next: msg => { Common.stopLoading(); SweetAlert.alert(msg) },
      error: error => console.log(error)
    });
  }

  goBackLogin() {
    this.router.navigate([{ outlets: { user: ['user-login'] } }]);
  }

}
