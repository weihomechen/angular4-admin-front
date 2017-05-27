import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { TabControlService } from '../../layout/header/tab/tabControl.service';
declare var SweetAlert: any;

@Component({
    selector: 'app-layout-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    private currentUser;
    constructor(
        private userService: UserService,
        private tabControlService: TabControlService
    ) { }

    ngOnInit() {
        this.userService.currentUser.subscribe({
            next: (data) => this.currentUser = data,
            error: error => console.log(error)
        });
    }

    getUserInfo() {
        if (!this.currentUser) {
            SweetAlert.notice('请先登录');
            return;
        }
        this.tabControlService.newTab({ name: '用户信息', link: 'user-info' });
    }

    changePwd() {
        if (!this.currentUser) {
            SweetAlert.notice('请先登录');
            return;
        }
        this.tabControlService.newTab({ name: '修改密码', link: 'user-change-pwd' });
    }

    logout() {
        this.userService.logout();
    }

}
