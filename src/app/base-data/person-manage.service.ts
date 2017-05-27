import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { IPersonItem } from './model/table-person-item';

@Injectable()
export class PersonManageService {

    private personUrl = 'assets/mock-data/person.json';
    constructor(private http: Http) { }

    // 获取人员列表，可带搜索条件
    getPersons(searchObj?): Observable<IPersonItem[]> {
        return this.http
            .get(this.personUrl)
            .map(response => response.json() as IPersonItem[]);
    }

    // 通过id获取人员
    getPersonById(id: string): Observable<IPersonItem[]> {
        return this.http
            .get(this.personUrl)
            .map(response => response.json() as IPersonItem[]);
    }

    // 添加人员
    addPerson(personObj): Observable<boolean> {
        return Observable.of(true);
    }

    // 删除人员
    delPersons(delList: string[]): Observable<boolean> {
        return Observable.create(function (observer) {
            setTimeout(() => { observer.next(true); }, 1000);
            setTimeout(() => { observer.next(true); }, 3000);
            // setTimeout(() => { observer.error('error'); }, 10000);
            setTimeout(() => { observer.complete(); }, 5000);
        });
    }
}
