import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';
import { AppComponent } from './app.component';

import { DemoComponent } from './demo/demo/demo.component';
import { Demo1Component } from './demo/demo1/demo1.component';
import { Demo2Component } from './demo/demo2/demo2.component';
import { Demo3Component } from './demo/demo3/demo3.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/demo',
        pathMatch: 'full'
    },
    { path: 'demo1', component: Demo1Component },
    { path: 'demo2', component: Demo2Component },
    { path: 'demo3', component: Demo3Component }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

export class CustomReuseStrategy implements RouteReuseStrategy {

    handlers: { [key: string]: DetachedRouteHandle } = {};

    // 决定是否将当前的路由进行分离并暂存
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        console.log('CustomReuseStrategy:shouldDetach', route);
        return true;
    }
    // 存储分离出的路由
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        console.log('CustomReuseStrategy:store', route, handle);
        this.handlers[route.routeConfig.path] = handle;
    }
    // 决定当前的路由是否还原
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        console.log('CustomReuseStrategy:shouldAttach', route);
        return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    }
    // 取得之前暂存的路由
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        console.log('CustomReuseStrategy:retrieve', route);
        return this.handlers[route.routeConfig.path]; // 从暂存处取回
    }
    // 决定是否重用路由
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        // 在此处可以取得跳转前和跳转后的路由路径
        console.log('CustomReuseStrategy:shouldReuseRoute', future, curr);
        return future.routeConfig === curr.routeConfig;
    }
}
