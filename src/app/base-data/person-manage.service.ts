import { Injectable, Optional } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { IPersonItem } from './model/table-person-item';

@Injectable()
export class PersonManageService {

    protected basePath = 'api/personManager'; // 真实的api路径
    public defaultHeaders: Headers = new Headers();

    private personUrl = 'assets/mock-data/person.json';

    constructor(private http: Http, @Optional() custormPath?: string) {
        if (custormPath) {
            this.basePath = custormPath;
        }
        this.defaultHeaders.set("content-type", "application/json");
    }

    // 获取人员列表，可带搜索和分页条件
    getPersons(searchObj?, page?: number, size?: number, sort?: string, extraHttpRequestParams?: any): Observable<IPersonItem[]> {
        return this.http
            .get(this.personUrl)
            .map(response => response.json() as IPersonItem[]);

        // 实际应用的举例写法
        // const path = this.basePath + '/person/search';
        // let queryParameters = new URLSearchParams();
        // let headerParams = this.defaultHeaders;
        // if (page !== undefined) {
        //     queryParameters.set('page', String(page));
        // }
        // if (size !== undefined) {
        //     queryParameters.set('size', String(size));
        // }
        // if (sort !== undefined) {
        //     queryParameters.set('sort', String(sort));
        // }

        // let requestOptions: RequestOptionsArgs = {
        //     method: 'POST',
        //     headers: headerParams,
        //     search: queryParameters
        // };
        // requestOptions.body = JSON.stringify(searchObj);

        // return this.http.request(path, requestOptions)
        //     .map((response: Response) => {
        //         if (response.status === 204) {
        //             return undefined;
        //         } else {
        //             return response.json();
        //         }
        //     });
    }

    // 通过id获取人员
    getPersonById(id: string): Observable<IPersonItem[]> {
        return this.http
            .get(this.personUrl)
            .map(response => response.json() as IPersonItem[]);
    }

    // 添加人员
    addPerson(personObj): Observable<{}> {
        return Observable.of(true);

        // 实际应用时的写法,增删改大致相同
        // const path = this.basePath + '/person';
        // let queryParameters = new URLSearchParams();
        // let headerParams = this.defaultHeaders;
        // if (!personObj) {
        //     throw new Error('新增人员缺少必要参数');
        // }
        // let requestOptions: RequestOptionsArgs = {
        //     method: 'POST',
        //     headers: headerParams,
        //     search: queryParameters
        // };
        // requestOptions.body = JSON.stringify(personObj);
        // return this.http.request(path, requestOptions)
        //     .map((response: Response) => {
        //         if (response.status === 204) {
        //             return undefined;
        //         } else {
        //             return response;
        //         }
        //     });
    }

    // 删除人员
    delPersons(delList: string[]): Observable<boolean> {
        return Observable.create(function (observer) {
            setTimeout(() => { observer.next(true); }, 1000);
            // setTimeout(() => { observer.next(true); }, 3000);
            // setTimeout(() => { observer.error('error'); }, 10000);
            // setTimeout(() => { observer.complete(); }, 5000);
        });
    }

    // 修改人员
    updatePerson(personId, updateDTO): Observable<{}> {
        return Observable.of(true);
    }
}
