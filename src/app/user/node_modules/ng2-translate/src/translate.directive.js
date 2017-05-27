import { Directive, ElementRef, Input } from '@angular/core';
import { isDefined } from './util';
import { TranslateService } from './translate.service';
export var TranslateDirective = (function () {
    function TranslateDirective(translateService, element) {
        var _this = this;
        this.translateService = translateService;
        this.element = element;
        // subscribe to onTranslationChange event, in case the translations of the current lang change
        if (!this.onTranslationChangeSub) {
            this.onTranslationChangeSub = this.translateService.onTranslationChange.subscribe(function (event) {
                if (event.lang === _this.translateService.currentLang) {
                    _this.checkNodes(true, event.translations);
                }
            });
        }
        // subscribe to onLangChange event, in case the language changes
        if (!this.onLangChangeSub) {
            this.onLangChangeSub = this.translateService.onLangChange.subscribe(function (event) {
                _this.checkNodes(true, event.translations);
            });
        }
        // subscribe to onDefaultLangChange event, in case the default language changes
        if (!this.onDefaultLangChangeSub) {
            this.onDefaultLangChangeSub = this.translateService.onDefaultLangChange.subscribe(function (event) {
                _this.checkNodes(true);
            });
        }
    }
    Object.defineProperty(TranslateDirective.prototype, "translate", {
        set: function (key) {
            if (key) {
                this.key = key;
                this.checkNodes();
            }
        },
        enumerable: true,
        configurable: true
    });
    TranslateDirective.prototype.ngAfterViewChecked = function () {
        this.checkNodes();
    };
    TranslateDirective.prototype.checkNodes = function (forceUpdate, translations) {
        if (forceUpdate === void 0) { forceUpdate = false; }
        var nodes = this.element.nativeElement.childNodes;
        for (var i = 0; i < nodes.length; ++i) {
            var node = nodes[i];
            if (node.nodeType === 3) {
                var key = void 0;
                if (this.key) {
                    key = this.key;
                }
                else {
                    var content = node.textContent.trim();
                    if (content.length) {
                        // we want to use the content as a key, not the translation value
                        if (content !== node.currentValue) {
                            key = content;
                            // the content was changed from the user, we'll use it as a reference if needed
                            node.originalContent = node.textContent;
                        }
                        else if (node.originalContent && forceUpdate) {
                            node.lastKey = null;
                            // the current content is the translation, not the key, use the last real content as key
                            key = node.originalContent.trim();
                        }
                    }
                }
                this.updateValue(key, node, translations);
            }
        }
    };
    TranslateDirective.prototype.updateValue = function (key, node, translations) {
        var _this = this;
        if (key) {
            var interpolateParams = this.translateParams;
            if (node.lastKey === key && this.lastParams === interpolateParams) {
                return;
            }
            this.lastParams = interpolateParams;
            var onTranslation = function (res) {
                if (res !== key) {
                    node.lastKey = key;
                }
                if (!node.originalContent) {
                    node.originalContent = node.textContent;
                }
                node.currentValue = isDefined(res) ? res : (node.originalContent || key);
                // we replace in the original content to preserve spaces that we might have trimmed
                node.textContent = _this.key ? node.currentValue : node.originalContent.replace(key, node.currentValue);
            };
            if (isDefined(translations)) {
                var res = this.translateService.getParsedResult(translations, key, interpolateParams);
                if (typeof res.subscribe === "function") {
                    res.subscribe(onTranslation);
                }
                else {
                    onTranslation(res);
                }
            }
            else {
                this.translateService.get(key, interpolateParams).subscribe(onTranslation);
            }
        }
    };
    TranslateDirective.prototype.ngOnDestroy = function () {
        if (this.onLangChangeSub) {
            this.onLangChangeSub.unsubscribe();
        }
        if (this.onDefaultLangChangeSub) {
            this.onDefaultLangChangeSub.unsubscribe();
        }
        if (this.onTranslationChangeSub) {
            this.onTranslationChangeSub.unsubscribe();
        }
    };
    TranslateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[translate],[ng2-translate]'
                },] },
    ];
    /** @nocollapse */
    TranslateDirective.ctorParameters = function () { return [
        { type: TranslateService, },
        { type: ElementRef, },
    ]; };
    TranslateDirective.propDecorators = {
        'translate': [{ type: Input },],
        'translateParams': [{ type: Input },],
    };
    return TranslateDirective;
}());
