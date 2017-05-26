import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';

import { User } from './model/user';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService implements CanActivate {

    private userId;
    private userInfo: object;
    private userLoginUrl = '/assets/mock-data/user-login.json';
    private subject: Subject<User> = new Subject<User>();
    constructor(
        private http: Http,
        private router: Router
    ) { }

    canActivate() {
        if (!this.userId) {
            this.router.navigate(['/user/user-login']);
        }
        return !!this.userId;
    }

    public get currentUser(): Observable<User> {
        return this.subject.asObservable();
    }

    public login(user: User) {
        return this.http
            .get(this.userLoginUrl)
            .map((response: Response) => {
                const user = response.json();
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.userId = user.userId;
                    this.subject.next(Object.assign({}, user));
                }
                return response;
            })
            .subscribe(
            data => {
                console.log('登陆成功');
                this.router.navigate(['/home']);
            },
            error => {
                console.error(error)
            }
            );
    }

    public logout(): void {
        localStorage.removeItem('currentUser');
        this.subject.next(Object.assign({}));
    }

}
