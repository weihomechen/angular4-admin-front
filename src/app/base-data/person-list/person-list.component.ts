import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { MdlDefaultTableModel, IMdlTableModelItem } from '@angular-mdl/core';
import { ITablePersonItem } from '../model/table-person-item';
import { TabControlService } from '../../layout/header/tab/tabControl.service';
import { PersonManageService } from '../person-manage.service';
import 'rxjs/add/operator/toPromise';

declare var $: any;

@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit, AfterViewInit {

    text1: string;
    text2: string;
    text3: string;
    tableData;
    tableModel = new MdlDefaultTableModel([
        { key: 'id', name: 'id', sortable: true },
        { key: 'name', name: 'name', sortable: true, numeric: true },
        { key: 'sex', name: 'sex', numeric: true },
        { key: 'team', name: 'team', sortable: true },
        { key: 'account', name: 'account', sortable: true, numeric: true },
        { key: 'role', name: 'role', numeric: true },
        { key: 'position', name: 'position', sortable: true, numeric: true }
    ]);
    constructor(private http: Http,
        private tabControlService: TabControlService,
        private personManageService: PersonManageService,
        private router: Router) {
    }

    ngOnInit() {
        this.personManageService.getPersons().then(personArr => {
            this.tableData = personArr;
            this.tableModel.addAll(this.tableData);
        }
        );
    }

    ngAfterViewInit() {
        const tableNode = $('#person_manage_table');
        const trNode = $('tr', tableNode);
        $('tr td:th-child(2)', tableNode).css('display', 'none');
    }

    addPerson() {
        this.tabControlService.newTab({ 'name': '添加人员', 'link': '/base-data/person-add' });
        this.router.navigateByUrl('base-data/person-add');
    }

    onInputBlur(event) {

    }

    onInputFocus(event) {
    }

    onInputKeyup(event) { }


}
