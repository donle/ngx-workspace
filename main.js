(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"header\"></nav>\n<div class=\"layout wrap\">\n  <div class=\"flex8\">\n    <ngx-workboard [widgets]=\"widgets\" [responsive-scale]=\"responsiveScale\" [edit]=\"editable\" [responsive]=\"enableResponsive\"></ngx-workboard>\n  </div>\n  <div class=\"flex4\">\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header {\n  height: 56px; }\n\n.layout {\n  display: flex; }\n\n.flex8 {\n  max-width: 66.6666667%;\n  flex: auto; }\n\n.flex4 {\n  max-width: 66.6666667%;\n  flex: auto; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _widget_a_widget_a_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widget-a/widget-a.component */ "./src/app/widget-a/widget-a.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.widgets = [
            {
                name: 'widget A',
                unitHeight: 2,
                unitWidth: 1,
                offsetLeftUnit: 0,
                offsetTopUnit: 1,
                component: _widget_a_widget_a_component__WEBPACK_IMPORTED_MODULE_1__["WidgetAComponent"]
            },
            {
                name: 'widget A',
                unitHeight: 2,
                unitWidth: 1,
                offsetLeftUnit: 0,
                offsetTopUnit: 1,
                component: _widget_a_widget_a_component__WEBPACK_IMPORTED_MODULE_1__["WidgetAComponent"]
            },
            {
                name: 'widget A',
                unitHeight: 2,
                unitWidth: 1,
                offsetLeftUnit: 0,
                offsetTopUnit: 1,
                component: _widget_a_widget_a_component__WEBPACK_IMPORTED_MODULE_1__["WidgetAComponent"]
            }
        ];
        this.editable = false;
        this.enableResponsive = true;
        this.responsiveScale = 768;
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ngx_workspace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-workspace */ "./node_modules/ngx-workspace/dist/index.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _widget_a_widget_a_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./widget-a/widget-a.component */ "./src/app/widget-a/widget-a.component.ts");
/* harmony import */ var _widget_b_widget_b_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./widget-b/widget-b.component */ "./src/app/widget-b/widget-b.component.ts");
/* harmony import */ var _widget_c_widget_c_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./widget-c/widget-c.component */ "./src/app/widget-c/widget-c.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _widget_a_widget_a_component__WEBPACK_IMPORTED_MODULE_5__["WidgetAComponent"],
                _widget_b_widget_b_component__WEBPACK_IMPORTED_MODULE_6__["WidgetBComponent"],
                _widget_c_widget_c_component__WEBPACK_IMPORTED_MODULE_7__["WidgetCComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatRadioModule"],
                ngx_workspace__WEBPACK_IMPORTED_MODULE_3__["NgxWorkspaceModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
            entryComponents: [
                _widget_a_widget_a_component__WEBPACK_IMPORTED_MODULE_5__["WidgetAComponent"],
                _widget_b_widget_b_component__WEBPACK_IMPORTED_MODULE_6__["WidgetBComponent"],
                _widget_c_widget_c_component__WEBPACK_IMPORTED_MODULE_7__["WidgetCComponent"]
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/widget-a/widget-a.component.html":
/*!**************************************************!*\
  !*** ./src/app/widget-a/widget-a.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  widget-a works!\n</p>\n"

/***/ }),

/***/ "./src/app/widget-a/widget-a.component.scss":
/*!**************************************************!*\
  !*** ./src/app/widget-a/widget-a.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/widget-a/widget-a.component.ts":
/*!************************************************!*\
  !*** ./src/app/widget-a/widget-a.component.ts ***!
  \************************************************/
/*! exports provided: WidgetAComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetAComponent", function() { return WidgetAComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WidgetAComponent = /** @class */ (function () {
    function WidgetAComponent() {
    }
    WidgetAComponent.prototype.ngOnInit = function () {
    };
    WidgetAComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-widget-a',
            template: __webpack_require__(/*! ./widget-a.component.html */ "./src/app/widget-a/widget-a.component.html"),
            styles: [__webpack_require__(/*! ./widget-a.component.scss */ "./src/app/widget-a/widget-a.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], WidgetAComponent);
    return WidgetAComponent;
}());



/***/ }),

/***/ "./src/app/widget-b/widget-b.component.html":
/*!**************************************************!*\
  !*** ./src/app/widget-b/widget-b.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  widget-b works!\n</p>\n"

/***/ }),

/***/ "./src/app/widget-b/widget-b.component.scss":
/*!**************************************************!*\
  !*** ./src/app/widget-b/widget-b.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/widget-b/widget-b.component.ts":
/*!************************************************!*\
  !*** ./src/app/widget-b/widget-b.component.ts ***!
  \************************************************/
/*! exports provided: WidgetBComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetBComponent", function() { return WidgetBComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WidgetBComponent = /** @class */ (function () {
    function WidgetBComponent() {
    }
    WidgetBComponent.prototype.ngOnInit = function () {
    };
    WidgetBComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-widget-b',
            template: __webpack_require__(/*! ./widget-b.component.html */ "./src/app/widget-b/widget-b.component.html"),
            styles: [__webpack_require__(/*! ./widget-b.component.scss */ "./src/app/widget-b/widget-b.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], WidgetBComponent);
    return WidgetBComponent;
}());



/***/ }),

/***/ "./src/app/widget-c/widget-c.component.html":
/*!**************************************************!*\
  !*** ./src/app/widget-c/widget-c.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  widget-c works!\n</p>\n"

/***/ }),

/***/ "./src/app/widget-c/widget-c.component.scss":
/*!**************************************************!*\
  !*** ./src/app/widget-c/widget-c.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/widget-c/widget-c.component.ts":
/*!************************************************!*\
  !*** ./src/app/widget-c/widget-c.component.ts ***!
  \************************************************/
/*! exports provided: WidgetCComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetCComponent", function() { return WidgetCComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WidgetCComponent = /** @class */ (function () {
    function WidgetCComponent() {
    }
    WidgetCComponent.prototype.ngOnInit = function () {
    };
    WidgetCComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-widget-c',
            template: __webpack_require__(/*! ./widget-c.component.html */ "./src/app/widget-c/widget-c.component.html"),
            styles: [__webpack_require__(/*! ./widget-c.component.scss */ "./src/app/widget-c/widget-c.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], WidgetCComponent);
    return WidgetCComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\projects\ngx-workspace\demo\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map