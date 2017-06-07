import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MdlDefaultTableModel, IMdlTableModelItem } from '@angular-mdl/core';
import { IPersonItem } from '../model/table-person-item';
import { TabControlService } from '../../layout/header/tab/tabControl.service';
import { PersonManageService } from '../person-manage.service';
import 'rxjs/add/operator/toPromise';
import { fadeIn } from '../../animations/fade-in';

declare var SweetAlert: any;
declare var Common: any;

@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.css'],
    animations: [fadeIn]
})
export class PersonListComponent implements OnInit {

    tableData;
    selected = [];
    tableModel = new MdlDefaultTableModel([
        { key: 'name', name: '姓名', sortable: true, numeric: true },
        { key: 'sex', name: '性别', numeric: true },
        { key: 'team', name: '队伍', sortable: true },
        { key: 'account', name: '账号', sortable: true, numeric: true },
        { key: 'role', name: '角色', numeric: true },
        { key: 'position', name: '职位', sortable: true, numeric: true }
    ]);
    searchObj = {
        name: '',
        team: '',
        account: ''
    };

    constructor(private http: Http,
        private tabControlService: TabControlService,
        private personManageService: PersonManageService) {
    }

    ngOnInit() {
        this.initTable();
    }

    initTable(searchObj?) {
        this.personManageService.getPersons(searchObj).subscribe(personArr => {
            this.tableData = personArr;
            this.tableModel.data.length = 0;
            this.tableModel.addAll(this.tableData);
            Common.stopLoading();
        }
        );
    }

    selectionChanged($event) {
        this.selected = $event.value;
    }

    // 添加人员
    addPerson() {
        this.tabControlService.newTab({ 'name': '添加人员', 'link': '/person-add' });
    }

    // 查看人员
    checkPerson() {
        if (this.selected.length !== 1) {
            SweetAlert.notice('请选择一个人员进行查看', '查看人员');
            return;
        } else if (this.tabControlService.isExist('/person-edit')) {
            SweetAlert.notice('已经存在相同的页面，请先处理该页面');
        } else {
            const personId = this.selected[0].id;
            this.tabControlService.newTab({
                name: '查看人员',
                link: '/person-edit',
                params: personId
            });
        }

    }

    // 修改人员
    editPerson() {
        if (this.selected.length !== 1) {
            SweetAlert.notice('请选择一个人员进行修改', '修改人员');
            return;
        } else if (this.tabControlService.isExist('/person-edit')) {
            SweetAlert.notice('已经存在相同的页面，请先处理该页面');
        } else {
            const personId = this.selected[0].id;
            this.tabControlService.newTab({
                name: '修改人员',
                link: '/person-edit',
                params: personId,
                fragment: 'edit'
            });
        }
    }

    // 删除人员
    delPerson() {
        if (!this.selected || this.selected.length === 0) {
            SweetAlert.notice('请选择人员进行删除', '删除人员');
            return;
        } else {
            SweetAlert.confirm('确定删除这' + this.selected.length + '个人员？', '删除人员', () => {
                const delList = [];
                this.selected.forEach(person => {
                    delList.push(person.id);
                });
                this.personManageService.delPersons(delList).subscribe({
                    next: x => { SweetAlert.alert('删除人员成功'); this.initTable(); },
                    error: error => SweetAlert.warning('删除失败'),
                    complete: () => SweetAlert.alert('完成')
                });
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
