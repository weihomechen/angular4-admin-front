import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { IPersonItem } from './model/table-person-item';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class PersonManageService {

    private personUrl = 'assets/mock-data/person.json';
    constructor(private http: Http) { }

    getPersons(): Promise<IPersonItem[]> {
        return this.http
            .get(this.personUrl)
            .toPromise()
            .then(response => response.json() as IPersonItem[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
