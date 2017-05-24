import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MdlDefaultTableModel, IMdlTableModelItem } from '@angular-mdl/core';
import { ITablePersonItem } from '../model/table-person-item';
import { TabControlService } from '../../layout/header/tab/tabControl.service';
import { PersonManageService } from '../person-manage.service';
import 'rxjs/add/operator/toPromise';

declare var SweetAlert: any;

@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

    tableData;
    selected;
    tableModel = new MdlDefaultTableModel([
        { key: 'name', name: 'name', sortable: true, numeric: true },
        { key: 'sex', name: 'sex', numeric: true },
        { key: 'team', name: 'team', sortable: true },
        { key: 'account', name: 'account', sortable: true, numeric: true },
        { key: 'role', name: 'role', numeric: true },
        { key: 'position', name: 'position', sortable: true, numeric: true }
    ]);
    searchObj = {
        name: '',
        team: '',
        account: ''
    };

    constructor(private http: Http,
        private tabControlService: TabControlService,
        private personManageService: PersonManageService,
        private router: Router) {
    }

    ngOnInit() {
        this.initTable();
    }

    initTable(searchObj?) {
        this.personManageService.getPersons(searchObj).then(personArr => {
            this.tableData = personArr;
            this.tableModel.data.length = 0;
            this.tableModel.addAll(this.tableData);
        }
        );
    }

    selectionChanged($event) {
        this.selected = $event.value;
    }

    // 添加人员
    addPerson() {
        this.tabControlService.newTab({ 'name': '添加人员', 'link': '/base-data/person-add' });
        this.router.navigateByUrl('base-data/person-add');
    }

    // 查看人员
    checkPerson() {
        if (!this.selected || this.selected.length !== 1) {
            SweetAlert.notice('请选择一个人员进行查看', '查看人员');
            return;
        }
    }

    // 修改人员
    editPerson() {
        if (!this.selected || this.selected.length !== 1) {
            SweetAlert.notice('请选择一个人员进行修改', '修改人员');
            return;
        }
    }

    // 删除人员
    delPerson() {
        if (!this.selected || this.selected.length === 0) {
            SweetAlert.notice('请选择人员进行删除', '删除人员');
            return;
        } else {
            SweetAlert.confirm('确定删除这' + this.selected.length + '个人员？', '删除人员', function () {

            });
        }
    }

    // 搜索
    search() {
        if (!this.searchObj.name && !this.searchObj.team && !this.searchObj.account) {
            SweetAlert.notice('请至少输入一个搜索条件', '搜索人员');
            return;
        } else {
            // console.log('searchObj:' + JSON.stringify(this.searchObj));
            this.initTable(this.searchObj);
        }
    }

    // 重置
    reset() {
        this.searchObj = {
            name: '',
            team: '',
            account: ''
        };
        this.initTable();
    }

    onInputBlur(event) {
    }

    onInputFocus(event) {
    }

    onInputKeyup(event) { }

}
