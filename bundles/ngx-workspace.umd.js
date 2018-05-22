(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('element-resize-detector'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs', 'element-resize-detector', '@angular/common'], factory) :
    (factory((global.ngx = global.ngx || {}, global.ngx.workspace = {}),global.ng.core,null,null,global.ng.common));
}(this, (function (exports,core,rxjs,elementResizeDetectorMaker,common) { 'use strict';

    elementResizeDetectorMaker = elementResizeDetectorMaker && elementResizeDetectorMaker.hasOwnProperty('default') ? elementResizeDetectorMaker['default'] : elementResizeDetectorMaker;

    var DATA_TYPE;
    (function (DATA_TYPE) {
        DATA_TYPE[DATA_TYPE["ASK_FOR_UNIT_HEIGHT"] = 0] = "ASK_FOR_UNIT_HEIGHT";
        DATA_TYPE[DATA_TYPE["ASK_FOR_DRAG_SCALE"] = 1] = "ASK_FOR_DRAG_SCALE";
        DATA_TYPE[DATA_TYPE["ASK_FOR_EDIT_MODE"] = 2] = "ASK_FOR_EDIT_MODE";
        DATA_TYPE[DATA_TYPE["ASK_FOR_EXTENDING_WORKBOARD"] = 3] = "ASK_FOR_EXTENDING_WORKBOARD";
    })(DATA_TYPE || (DATA_TYPE = {}));
    var NgxWorkspaceDataService = /** @class */ (function () {
        function NgxWorkspaceDataService() {
            this.messageSource = new rxjs.BehaviorSubject({ type: null, payload: null });
            this.currentMessage = this.messageSource.asObservable();
        }
        NgxWorkspaceDataService.prototype.sendMessage = function (message) {
            this.messageSource.next(message);
        };
        NgxWorkspaceDataService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        NgxWorkspaceDataService.ctorParameters = function () { return []; };
        return NgxWorkspaceDataService;
    }());

    var NgxWorkboardComponent = /** @class */ (function () {
        function NgxWorkboardComponent(cdr, dataService) {
            this.cdr = cdr;
            this.dataService = dataService;
            this.unitHeight = 0;
            this.responsiveMode = true;
        }
        NgxWorkboardComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.dataService.currentMessage.subscribe(function (data) {
                switch (data.type) {
                    case DATA_TYPE.ASK_FOR_EDIT_MODE: {
                        if (!_this.enableEditMode)
                            _this.autoBoardHeight();
                        return;
                    }
                    case DATA_TYPE.ASK_FOR_EXTENDING_WORKBOARD: {
                        _this.extendDragboard();
                        return;
                    }
                }
            });
        };
        NgxWorkboardComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (window.innerWidth < this.responsiveMinimalWidth)
                this.responsiveMode = false;
            this.unitHeight = this.boardElement.nativeElement.offsetWidth / 12;
            this.dragScale = {
                left: this.boardElement.nativeElement.offsetLeft,
                right: this.boardElement.nativeElement.offsetWidth + this.boardElement.nativeElement.offsetLeft,
                top: this.boardElement.nativeElement.offsetTop,
                bottom: 0
            };
            this.autoBoardHeight();
            this.boardElement.nativeElement.style.width = '100%';
            this.boardElement.nativeElement.style.position = 'relative';
            this.cdr.detectChanges();
            var unitsOfGrid = Math.round(this.boardElement.nativeElement.offsetHeight / this.unitHeight + 0.49) * 12;
            this.updateGrids(unitsOfGrid);
            this.workspaceResizeDetector = elementResizeDetectorMaker();
            this.workspaceResizeDetector.listenTo(this.boardElement.nativeElement, function (element) {
                _this.onWindowResize();
            });
        };
        NgxWorkboardComponent.prototype.ngOnDestroy = function () {
            this.enableEditMode = false;
            this.workspaceResizeDetector.removeAllListeners(this.boardElement.nativeElement);
        };
        // @HostListener('window:resize') onWindowResize() {
        // @HostListener('window:resize') onWindowResize() {
        NgxWorkboardComponent.prototype.onWindowResize = 
        // @HostListener('window:resize') onWindowResize() {
        function () {
            if (window.innerWidth < this.responsiveMinimalWidth) {
                this.responsiveMode = false;
                this.enableEditMode = false;
            }
            else {
                this.responsiveMode = true;
            }
            var newHeight = this.boardElement.nativeElement.offsetWidth / 12;
            if (newHeight !== this.unitHeight) {
                this.unitHeight = newHeight;
                this.autoBoardHeight();
                this.updateGridSize();
                this.dragScale.right = this.boardElement.nativeElement.offsetWidth + this.boardElement.nativeElement.offsetLeft;
            }
            this.cdr.detectChanges();
        };
        NgxWorkboardComponent.prototype.autoBoardHeight = function () {
            var maxHeightToTop = 0;
            for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
                var tile = _a[_i];
                if (tile.unitHeight + tile.offsetTopUnit > maxHeightToTop) {
                    maxHeightToTop = tile.unitHeight + tile.offsetTopUnit;
                }
            }
            this.boardElement.nativeElement.style.minHeight = (this.unitHeight * maxHeightToTop + 24) + 'px';
        };
        NgxWorkboardComponent.prototype.updateGridSize = function () {
            var grids = this.backgroundRef.nativeElement.querySelectorAll('.grid');
            for (var _i = 0, grids_1 = grids; _i < grids_1.length; _i++) {
                var grid = grids_1[_i];
                grid.style.height = this.unitHeight + 'px';
                grid.style.width = this.unitHeight + 'px';
            }
            // let unitsOfNewGrid = Math.round(this.boardElement.nativeElement.offsetHeight / this.unitHeight + 0.49) * 12 - grids.length;
            // this.updateGrids(unitsOfNewGrid);
        };
        NgxWorkboardComponent.prototype.updateGrids = function (num) {
            if (num < 0) {
                var currentGrids = this.backgroundRef.nativeElement.querySelectorAll('.grid');
                for (var i = 0; i < -num; i++) {
                    currentGrids[i].remove();
                }
            }
            else {
                var grid = document.createElement('li');
                grid.className += 'grid';
                grid.style.height = this.unitHeight + 'px';
                grid.style.width = this.unitHeight + 'px';
                grid.innerHTML = '<span></span>';
                for (var i = 0; i < num; i++) {
                    this.backgroundRef.nativeElement.appendChild(grid.cloneNode(true));
                }
            }
        };
        NgxWorkboardComponent.prototype.extendDragboard = function () {
            var newHeight = this.boardElement.nativeElement.offsetHeight + this.unitHeight * 4;
            this.boardElement.nativeElement.style.minHeight = newHeight + 'px';
            this.updateGrids(48);
        };
        NgxWorkboardComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-workboard',
                        templateUrl: './ngx-workboard.component.html',
                        styleUrls: ['./ngx-workboard.component.scss']
                    },] },
        ];
        /** @nocollapse */
        NgxWorkboardComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef, },
            { type: NgxWorkspaceDataService, },
        ]; };
        NgxWorkboardComponent.propDecorators = {
            "tiles": [{ type: core.Input, args: ['widgets',] },],
            "responsiveMinimalWidth": [{ type: core.Input, args: ['screenMinWidth',] },],
            "boardElement": [{ type: core.ViewChild, args: ['workboard',] },],
            "backgroundRef": [{ type: core.ViewChild, args: ['background',] },],
        };
        return NgxWorkboardComponent;
    }());

    var NgxWorkspaceService = /** @class */ (function () {
        function NgxWorkspaceService() {
            this.tiles = [];
        }
        NgxWorkspaceService.prototype.initTileOptions = function (tile) {
            if (tile.overlapped === undefined)
                tile.overlapped = false;
            if (tile.highlighted === undefined)
                tile.highlighted = false;
        };
        Object.defineProperty(NgxWorkspaceService.prototype, "Tiles", {
            get: function () {
                return this.tiles;
            },
            enumerable: true,
            configurable: true
        });
        NgxWorkspaceService.prototype.add = function (tile) {
            this.initTileOptions(tile);
            this.tiles.push(tile);
        };
        NgxWorkspaceService.prototype.remove = function (tile) {
            var index = this.tiles.findIndex(function (_tile) { return tile.name === _tile.name; });
            if (index >= 0)
                this.tiles.splice(index, 1);
        };
        NgxWorkspaceService.prototype.tilesOverlappedWithOthers = function (tiles) {
            tiles = tiles || this.tiles;
            var occupiedTiles = [];
            for (var i = 0; i < tiles.length; i++) {
                var src_tile = tiles[i];
                for (var j = i + 1; j < tiles.length; j++) {
                    var dest_tile = tiles[j];
                    var srcTileArea = {
                        begin: {
                            X: src_tile.offsetLeftUnit,
                            Y: src_tile.offsetTopUnit
                        },
                        end: {
                            X: src_tile.offsetLeftUnit + src_tile.unitWidth,
                            Y: src_tile.offsetTopUnit + src_tile.unitHeight
                        }
                    };
                    var destTileArea = {
                        begin: {
                            X: dest_tile.offsetLeftUnit,
                            Y: dest_tile.offsetTopUnit
                        },
                        end: {
                            X: dest_tile.offsetLeftUnit + dest_tile.unitWidth,
                            Y: dest_tile.offsetTopUnit + dest_tile.unitHeight
                        }
                    };
                    if (this.isInsideAreaOf(destTileArea, srcTileArea)) {
                        if (!occupiedTiles.includes(i))
                            occupiedTiles.push(i);
                        occupiedTiles.push(j);
                    }
                }
            }
            return occupiedTiles;
        };
        NgxWorkspaceService.prototype.isInsideAreaOf = function (origin, target) {
            return target.end.X > origin.begin.X && target.begin.X < origin.end.X && target.end.Y > origin.begin.Y && target.begin.Y < origin.end.Y;
        };
        NgxWorkspaceService.prototype.isShadowCoveredOnTiles = function (tilename, area) {
            for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
                var tile = _a[_i];
                if (tile.name === tilename)
                    continue;
                var srcTileArea = {
                    begin: {
                        X: tile.offsetLeftUnit,
                        Y: tile.offsetTopUnit
                    },
                    end: {
                        X: tile.offsetLeftUnit + tile.unitWidth,
                        Y: tile.offsetTopUnit + tile.unitHeight
                    }
                };
                if (this.isInsideAreaOf(srcTileArea, area))
                    return true;
            }
            return false;
        };
        NgxWorkspaceService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        NgxWorkspaceService.ctorParameters = function () { return []; };
        return NgxWorkspaceService;
    }());

    var NgxWidgetLoaderDirective = /** @class */ (function () {
        function NgxWidgetLoaderDirective(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
        }
        NgxWidgetLoaderDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngx-workspace-loader]'
                    },] },
        ];
        /** @nocollapse */
        NgxWidgetLoaderDirective.ctorParameters = function () { return [
            { type: core.ViewContainerRef, },
        ]; };
        return NgxWidgetLoaderDirective;
    }());

    var DragElementComponent = /** @class */ (function () {
        function DragElementComponent(cdr, dataService, dragService, componentFactoryResolver) {
            this.cdr = cdr;
            this.dataService = dataService;
            this.dragService = dragService;
            this.componentFactoryResolver = componentFactoryResolver;
            this.elementChecked = false;
            this.enableEditMode = false;
            this.unitHeight = 0;
            this.dataService.sendMessage({ type: DATA_TYPE.ASK_FOR_UNIT_HEIGHT, payload: true });
        }
        DragElementComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.dataService.currentMessage.subscribe(function (data) {
                switch (data.type) {
                    case DATA_TYPE.ASK_FOR_EDIT_MODE:
                        _this.enableEditMode = data.payload;
                        return;
                    case DATA_TYPE.ASK_FOR_UNIT_HEIGHT:
                        _this.unitHeight = data.payload;
                        return;
                }
            });
        };
        DragElementComponent.prototype.ngAfterViewInit = function () {
            this.loadApplicationComponent();
            this.elementRef.nativeElement.id = this.tile.name;
        };
        DragElementComponent.prototype.ngDoCheck = function () {
            if (this.tile.overlapped) {
                var boxShadow = "0 2px 4px -1px rgba(255,107,107, .2), 0 4px 5px 0 rgba(255,107,107, .14), 0 1px 10px 0 rgba(255,107,107, .12)";
                this.elementRef.nativeElement.style.border = '2px solid #f44336';
                this.elementRef.nativeElement.style.boxShadow = boxShadow;
            }
            else {
                this.elementRef.nativeElement.style.border = null;
                this.elementRef.nativeElement.style.boxShadow = null;
            }
            if (!this.elementChecked && this.tile) {
                this.elementChecked = true;
                this.dragService.add(this.tile);
            }
        };
        DragElementComponent.prototype.ngOnDestroy = function () {
            if (this.componentRef)
                this.componentRef.destroy();
        };
        DragElementComponent.prototype.loadApplicationComponent = function (appName) {
            if (appName === void 0) { appName = this.tile.name; }
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.widgetComponent);
            var viewContainerRef = this.widgetContainer.viewContainerRef;
            viewContainerRef.clear();
            this.componentRef = viewContainerRef.createComponent(componentFactory);
        };
        Object.defineProperty(DragElementComponent.prototype, "getTileStyle", {
            get: function () {
                if (!this.responsiveMode) {
                    return {
                        width: '100%'
                    };
                }
                else {
                    return {
                        position: 'absolute',
                        width: (this.tile.unitWidth * this.unitHeight) + 'px',
                        height: (this.tile.unitHeight * this.unitHeight) + 'px',
                        top: (this.tile.offsetTopUnit * this.unitHeight) + 'px',
                        left: (this.tile.offsetLeftUnit * this.unitHeight) + 'px'
                    };
                }
            },
            enumerable: true,
            configurable: true
        });
        DragElementComponent.prototype.getAppProfile = function (tile) {
            return {
                unitHeight: this.unitHeight,
                tile: tile
            };
        };
        DragElementComponent.prototype.getPosition = function (pos) {
            if (!pos.move || !this.responsiveMode)
                return;
            var tile = this.dragService.Tiles.find(function (_tile) { return _tile.name === pos.tileName; });
            pos.move.X = Math.round(pos.move.X / this.unitHeight);
            pos.move.Y = Math.round(pos.move.Y / this.unitHeight);
            tile.offsetLeftUnit = pos.move.X;
            tile.offsetTopUnit = pos.move.Y;
            pos.move.X *= this.unitHeight;
            pos.move.Y *= this.unitHeight;
            this.cdr.detectChanges();
            var tiles_index = this.dragService.tilesOverlappedWithOthers(this.dragService.Tiles);
            this.createOverlapNotification(tiles_index);
        };
        DragElementComponent.prototype.createOverlapNotification = function (tiles_index) {
            for (var i = 0; i < this.dragService.Tiles.length; i++) {
                this.dragService.Tiles[i].overlapped = tiles_index.includes(i) ? true : false;
            }
        };
        DragElementComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-drag-element',
                        templateUrl: './ngx-drag-element.component.html',
                        styleUrls: ['./ngx-drag-element.component.scss']
                    },] },
        ];
        /** @nocollapse */
        DragElementComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef, },
            { type: NgxWorkspaceDataService, },
            { type: NgxWorkspaceService, },
            { type: core.ComponentFactoryResolver, },
        ]; };
        DragElementComponent.propDecorators = {
            "tile": [{ type: core.Input, args: ['tile',] },],
            "widgetComponent": [{ type: core.Input, args: ['component',] },],
            "responsiveMode": [{ type: core.Input, args: ['responsiveMode',] },],
            "elementRef": [{ type: core.ViewChild, args: ['elementRef',] },],
            "elementShadow": [{ type: core.ViewChild, args: ['elementShadow',] },],
            "widgetContainer": [{ type: core.ViewChild, args: [NgxWidgetLoaderDirective,] },],
        };
        return DragElementComponent;
    }());

    var DraggableDirective = /** @class */ (function () {
        function DraggableDirective(el, dataService, dragService) {
            this.el = el;
            this.dataService = dataService;
            this.dragService = dragService;
            this.isMouseDown = false;
            this.lastPosition = null;
            this.appPosition = new core.EventEmitter();
            this.moveTo = null;
        }
        DraggableDirective.prototype.onMouseDown = function (evt) {
            if (!this.appDraggable)
                return;
            this.el.nativeElement.style.zIndex = 9999;
            this.el.nativeElement.style.borderLeft = 'thick solid #0000FF';
            this.isMouseDown = true;
            this.lastPosition = {
                X: evt.clientX,
                Y: evt.clientY
            };
            this.originalOffset = {
                left: this.el.nativeElement.offsetLeft || 0,
                top: this.el.nativeElement.offsetTop || 0
            };
            this.appShadowElement.style.display = 'block';
        };
        DraggableDirective.prototype.onMouseUp = function () {
            if (!this.isMouseDown)
                return;
            this.el.nativeElement.style.border = null;
            this.appPosition.emit({
                move: this.moveTo,
                tileName: this.appProfile.tile.name
            });
            this.dragElementTo(this.moveTo);
            this.moveTo = null;
            this.isMouseDown = false;
            this.resetPosition();
        };
        DraggableDirective.prototype.onMouseLeave = function () {
            if (this.isMouseDown) {
                this.appPosition.emit({
                    move: this.moveTo,
                    tileName: this.appProfile.tile.name
                });
                this.dragElementTo(this.moveTo);
                this.moveTo = null;
            }
            this.isMouseDown = false;
            this.resetPosition();
        };
        DraggableDirective.prototype.onMouseMove = function (evt) {
            if (!this.appDraggable || !this.isMouseDown)
                return;
            this.moveTo = {
                X: evt.clientX - this.lastPosition.X,
                Y: evt.clientY - this.lastPosition.Y
            };
            this.moveTo.X += this.originalOffset.left;
            this.moveTo.Y += this.originalOffset.top;
            this.moveTo.X = Math.max(this.moveTo.X, 0);
            this.moveTo.X = Math.min(this.moveTo.X, this.draggableScale.right - this.draggableScale.left - this.el.nativeElement.offsetWidth);
            this.moveTo.Y = Math.max(this.moveTo.Y, 0);
            this.dragElementTo(this.moveTo);
            var shadowMovesTo = {
                X: Math.round(this.moveTo.X / this.appProfile.unitHeight),
                Y: Math.round(this.moveTo.Y / this.appProfile.unitHeight)
            };
            this.moveElementShadowToByUnits(shadowMovesTo);
            var isOverlapped = this.dragService.isShadowCoveredOnTiles(this.appProfile.tile.name, {
                begin: shadowMovesTo,
                end: {
                    X: shadowMovesTo.X + this.appProfile.tile.unitWidth,
                    Y: shadowMovesTo.Y + this.appProfile.tile.unitHeight
                }
            });
            if (isOverlapped) {
                this.appShadowElement.style.background = 'rgba(255, 50, 0, 0.5)';
            }
            else {
                this.appShadowElement.style.background = 'rgba(0, 21, 59, 0.3)';
            }
            var board = document.querySelector('.drag-board');
            var distanceToBottom = board.clientHeight - this.el.nativeElement.offsetHeight - this.el.nativeElement.offsetTop;
            if (-distanceToBottom >= this.appProfile.unitHeight / 2)
                this.dataService.sendMessage({
                    type: DATA_TYPE.ASK_FOR_EXTENDING_WORKBOARD,
                    payload: true
                });
        };
        DraggableDirective.prototype.dragElementTo = function (point) {
            if (!point)
                return;
            this.el.nativeElement.style.top = point.Y + 'px';
            this.el.nativeElement.style.left = point.X + 'px';
        };
        DraggableDirective.prototype.moveElementShadowToByUnits = function (point) {
            if (!point)
                return;
            this.appShadowElement.style.top = (point.Y * this.appProfile.unitHeight) + 'px';
            this.appShadowElement.style.left = (point.X * this.appProfile.unitHeight) + 'px';
        };
        DraggableDirective.prototype.resetPosition = function () {
            this.el.nativeElement.style.zIndex = null;
            this.appShadowElement.style.display = null;
        };
        DraggableDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[appDraggable]'
                    },] },
        ];
        /** @nocollapse */
        DraggableDirective.ctorParameters = function () { return [
            { type: core.ElementRef, },
            { type: NgxWorkspaceDataService, },
            { type: NgxWorkspaceService, },
        ]; };
        DraggableDirective.propDecorators = {
            "appDraggable": [{ type: core.Input },],
            "draggableScale": [{ type: core.Input, args: ['appDragScale',] },],
            "appProfile": [{ type: core.Input, args: ['appProfile',] },],
            "appShadowElement": [{ type: core.Input, args: ['appShadow',] },],
            "appPosition": [{ type: core.Output, args: ['appPosition',] },],
            "onMouseDown": [{ type: core.HostListener, args: ['mousedown', ['$event'],] },],
            "onMouseUp": [{ type: core.HostListener, args: ['mouseup',] },],
            "onMouseLeave": [{ type: core.HostListener, args: ['mouseleave',] },],
            "onMouseMove": [{ type: core.HostListener, args: ['mousemove', ['$event'],] },],
        };
        return DraggableDirective;
    }());

    var NgxWorkspaceModule = /** @class */ (function () {
        function NgxWorkspaceModule() {
        }
        NgxWorkspaceModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [
                            DragElementComponent,
                            NgxWorkboardComponent,
                            DraggableDirective
                        ],
                        providers: [
                            NgxWorkspaceService,
                        ],
                        exports: [
                            NgxWorkboardComponent,
                            DragElementComponent
                        ]
                    },] },
        ];
        return NgxWorkspaceModule;
    }());

    /*
     * Public API Surface of ngx-workspace
     */

    exports.NgxWorkboardComponent = NgxWorkboardComponent;
    exports.DragElementComponent = DragElementComponent;
    exports.NgxWorkspaceModule = NgxWorkspaceModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
