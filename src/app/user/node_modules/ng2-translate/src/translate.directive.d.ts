import { ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from './translate.service';
export declare class TranslateDirective implements AfterViewChecked, OnDestroy {
    private translateService;
    private element;
    key: string;
    lastParams: any;
    onLangChangeSub: Subscription;
    onDefaultLangChangeSub: Subscription;
    onTranslationChangeSub: Subscription;
    translate: string;
    translateParams: any;
    constructor(translateService: TranslateService, element: ElementRef);
    ngAfterViewChecked(): void;
    checkNodes(forceUpdate?: boolean, translations?: any): void;
    updateValue(key: string, node: any, translations: any): void;
    ngOnDestroy(): void;
}
