import {
  Component,
   OnInit,
   Input,
   ChangeDetectorRef,
   ViewChild,
   ElementRef,
   DoCheck,
   ComponentFactoryResolver,
   AfterViewInit,
   ComponentRef,
   OnDestroy
  } from '@angular/core';
import { WsWorkspaceService } from '../services/ws-workspace.service';
import { WsWidgetLoaderDirective } from '../directives/ws-widget-loader.directive';
import { WidgetProfile } from '../interfaces/widget';
import { WsWorkspaceDataService, DATA_TYPE } from '../services/ws-workspace-data.service';
import { Point } from '../interfaces/point';

@Component({
  selector: 'ws-drag-element',
  templateUrl: './ws-drag-element.component.html',
  styleUrls: ['./ws-drag-element.component.scss']
})
export class WsDragElementComponent implements OnInit, DoCheck, AfterViewInit, OnDestroy {
  @Input('wsWidget') wsWidget: WidgetProfile;
  @Input('wsComponent') wsComponent: typeof Component;
  @Input('wsResponsive') responsiveMode: boolean;
  @Input('wsUnitHeight') unitHeight: number;
  @Input('wsEditable') enableEditMode: boolean;
  @Input('wsDragScale') dragScale: {
    left: number,
    right: number,
    top: number,
    bottom: number
  };
  @ViewChild('elementRef') elementRef: ElementRef;
  @ViewChild('elementShadow') elementShadow: ElementRef;
  @ViewChild(WsWidgetLoaderDirective) widgetContainer: WsWidgetLoaderDirective;
  private componentRef: ComponentRef<Component>;
  constructor(
    private cdr: ChangeDetectorRef,
    private dataService: WsWorkspaceDataService<any>,
    private dragService: WsWorkspaceService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.unitHeight = 0;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadApplicationComponent();
    this.elementRef.nativeElement.id = this.wsWidget.name;
  }

  ngDoCheck() {
    if (this.wsWidget.overlapped) {
      const boxShadow = `0 2px 4px -1px rgba(255,107,107, .2), 0 4px 5px 0 rgba(255,107,107, .14), 0 1px 10px 0 rgba(255,107,107, .12)`;
      this.elementRef.nativeElement.style.border = '2px solid #f44336';
      this.elementRef.nativeElement.style.boxShadow = boxShadow;
    } else {
      this.elementRef.nativeElement.style.border = null;
      this.elementRef.nativeElement.style.boxShadow = null;
    }
  }

  ngOnDestroy() {
    if (this.componentRef) this.componentRef.destroy();
  }

  private loadApplicationComponent(appName: string = this.wsWidget.name) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory<Component>(this.wsComponent);
    let viewContainerRef = this.widgetContainer.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent<Component>(componentFactory);
  }

  public get getWidgetStyle() {
    if (!this.responsiveMode) {
      return {
        width: '100%'
      };
    } else {
      return {
        position: 'absolute',
        width: (this.wsWidget.unitWidth * this.unitHeight) + 'px',
        height: (this.wsWidget.unitHeight * this.unitHeight) + 'px',
        top: (this.wsWidget.offsetTopUnit * this.unitHeight) + 'px',
        left: (this.wsWidget.offsetLeftUnit * this.unitHeight) + 'px'
      };
    }
  }

  public getAppProfile(widget: WidgetProfile) {
    return {
      unitHeight: this.unitHeight,
      widget
    };
  }

  public getPosition(pos: { move: Point, widgetName: string }) {
    if (!pos.move || !this.responsiveMode) return;
    let _widget = this.dragService.Widgets.find(_w => _w.name === pos.widgetName);

    pos.move.X = Math.round(pos.move.X / this.unitHeight);
    pos.move.Y = Math.round(pos.move.Y / this.unitHeight);
    _widget.offsetLeftUnit = pos.move.X;
    _widget.offsetTopUnit = pos.move.Y;
    pos.move.X *= this.unitHeight;
    pos.move.Y *= this.unitHeight;
    this.cdr.detectChanges();

    let overlappedWidgets = this.dragService.widgetsOverlappedWithOthers();
    this.createOverlapNotification(overlappedWidgets);
  }

  private createOverlapNotification(overlappedWidgets: Array<boolean>) {
    for (let i = 0; i < overlappedWidgets.length; i++) {
      this.dragService.Widgets[i].overlapped = overlappedWidgets[i];
    }
  }
}
