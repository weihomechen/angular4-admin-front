import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user';
import { fadeIn } from '../../animations/fade-in';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css'],
    animations: [fadeIn]
})
export class UserLoginComponent implements OnInit {
    public user: User = new User();
    public error: Error;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public userService: UserService
    ) {
    }

    ngOnInit() {
        // console.log("--- user-login-component ---");
        // console.log(this.router);
        // console.log(this.activatedRoute);

        // let activatedRouteSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
        // let routerState: RouterState = this.router.routerState;
        // let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;

        // console.log(activatedRouteSnapshot);
        // console.log(routerState);
        // console.log(routerStateSnapshot);
    }

    public doLogin(): void {
        // console.log(this.user);
        this.userService.login(this.user);
    }

    public doLogout(): void {
        this.userService.logout();
        this.router.navigateByUrl("home");
    }

    public forgetPwd(): void {
        this.router.navigateByUrl("forgetpwd");
    }
}
