import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Menu } from './menu';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MenuService {
    private menusUrl = '/assets/mock-data/menu.json';
    constructor(private http: Http) { }

    getMenus(): Observable<Menu[]> {
        return this.http
            .get(this.menusUrl)
            .map(response => response.json() as Menu[]);
    }

}
