import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Menu } from './menu';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MenuService {
    private menusUrl = '/assets/mock-data/menu.json';
    constructor(private http: Http) { }

    getMenus(): Promise<Menu[]> {
        return this.http
            .get(this.menusUrl).
            toPromise()
            .then(response => response.json() as Menu[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
