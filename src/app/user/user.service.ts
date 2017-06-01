import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';

import { User } from './model/user';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TabControlService } from '../layout/header/tab/tabControl.service';

@Injectable()
export class UserService implements CanActivate {

    private userId;
    private userInfo: object;
    private userLoginUrl = '/assets/mock-data/user-login.json';
    private registerUrl = '/assets/mock-data/user-register.json';
    private forgetPwdUrl = '/assets/mock-data/forget-pwd.json';
    private subject: Subject<User> = new Subject<User>();
    constructor(
        private http: Http,
        private router: Router,
        private tabControlService: TabControlService
    ) { }

    canActivate() {
        if (!this.userId) {
            this.router.navigate([{ outlets: { user: ['user-login'] } }]);
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
                this.router.navigate([{ outlets: { user: null } }]);
            },
            error => {
                console.error(error);
            }
            );
    }

    public logout(): void {
        this.tabControlService.closeAll();
        setTimeout(() => {
            localStorage.removeItem('currentUser');
            this.userId = null;
            this.subject.next(Object.assign({}));
            this.router.navigate([{ outlets: { user: ['user-login'] } }]);
        }, 100);

    }

    public forgetPwd(email: string): Observable<any> {
        // return this.http
        //     .get(this.forgetPwdUrl)
        //     .map((res: Response) => res.json());
        return Observable.create((observer) => {
            observer.next('邮件发送成功，请登录邮箱查看')
        });
    }

    public register(user) {
        console.log(user);

        // 向后台post数据的写法如下
        // let data = new URLSearchParams();
        // data.append('email', user.email);
        // data.append('password', user.password);
        // return this.http.post(this.userRegisterURL,data);

        return this.http
            .get(this.registerUrl)
            .map((response: Response) => {
                let user = response.json();
                localStorage.setItem("currentUser", JSON.stringify(user));
                this.subject.next(user);
            });
    }

    // 检测邮箱是否已注册
    public isEmailUsed(email: string) {
        return Observable.create((observer) => {
            observer.next(false);
        })
    }
}
