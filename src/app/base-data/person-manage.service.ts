import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ITablePersonItem } from './model/table-person-item';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class PersonManageService {

    private personUrl = 'assets/mock-data/person.json';
    constructor(private http: Http) { }

    // 获取人员，可带搜索条件
    getPersons(searchObj?): Promise<ITablePersonItem[]> {
        return this.http
            .get(this.personUrl)
            .toPromise()
            .then(response => response.json() as ITablePersonItem[])
            .catch(this.handleError);
    }

    addPerson(personObj){
        
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
