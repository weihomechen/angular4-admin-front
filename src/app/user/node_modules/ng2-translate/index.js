import { NgModule } from "@angular/core";
import { Http, HttpModule } from "@angular/http";
import { TranslatePipe } from "./src/translate.pipe";
import { TranslateParser, DefaultTranslateParser } from "./src/translate.parser";
import { TranslateService, TranslateLoader, TranslateStaticLoader } from "./src/translate.service";
import { TranslateDirective } from "./src/translate.directive";
export * from "./src/translate.pipe";
export * from "./src/translate.service";
export * from "./src/translate.parser";
export * from "./src/translate.directive";
export function translateLoaderFactory(http) {
    return new TranslateStaticLoader(http);
}
export var TranslateModule = (function () {
    function TranslateModule() {
    }
    TranslateModule.forRoot = function (providedLoader) {
        if (providedLoader === void 0) { providedLoader = {
            provide: TranslateLoader,
            useFactory: translateLoaderFactory,
            deps: [Http]
        }; }
        return {
            ngModule: TranslateModule,
            providers: [
                providedLoader,
                TranslateService,
                { provide: TranslateParser, useClass: DefaultTranslateParser }
            ]
        };
    };
    TranslateModule.decorators = [
        { type: NgModule, args: [{
                    imports: [HttpModule],
                    declarations: [
                        TranslatePipe,
                        TranslateDirective
                    ],
                    exports: [
                        HttpModule,
                        TranslatePipe,
                        TranslateDirective
                    ]
                },] },
    ];
    /** @nocollapse */
    TranslateModule.ctorParameters = function () { return []; };
    return TranslateModule;
}());
