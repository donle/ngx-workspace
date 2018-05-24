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
import { NgxWorkspaceService } from '../ngx-workspace.service';
import { NgxWidgetLoaderDirective } from '../ngx-widget-loader.directive';
import { WidgetProfile } from '../interfaces/widget';
import { NgxWorkspaceDataService, DATA_TYPE } from '../ngx-workspace-data.service';
import { Point } from '../interfaces/point';

@Component({
  selector: 'ngx-drag-element',
  templateUrl: './ngx-drag-element.component.html',
  styleUrls: ['./ngx-drag-element.component.scss']
})
export class NgxDragElementComponent implements OnInit, DoCheck, AfterViewInit, OnDestroy {
  @Input('widget') widget: WidgetProfile;
  @Input('component') widgetComponent: typeof Component;
  @Input('responsive') responsiveMode: boolean;
  @Input('unit-height') unitHeight: number;
  @Input('edit') enableEditMode: boolean;
  @Input('drag-scale') dragScale: {
    left: number,
    right: number,
    top: number,
    bottom: number
  };
  @ViewChild('elementRef') elementRef: ElementRef;
  @ViewChild('elementShadow') elementShadow: ElementRef;
  @ViewChild(NgxWidgetLoaderDirective) widgetContainer: NgxWidgetLoaderDirective;
  private componentRef: ComponentRef<Component>;
  // private elementChecked = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private dataService: NgxWorkspaceDataService<any>,
    private dragService: NgxWorkspaceService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.unitHeight = 0;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadApplicationComponent();
    this.elementRef.nativeElement.id = this.widget.name;
  }

  ngDoCheck() {
    if (this.widget.overlapped) {
      const boxShadow = `0 2px 4px -1px rgba(255,107,107, .2), 0 4px 5px 0 rgba(255,107,107, .14), 0 1px 10px 0 rgba(255,107,107, .12)`;
      this.elementRef.nativeElement.style.border = '2px solid #f44336';
      this.elementRef.nativeElement.style.boxShadow = boxShadow;
    } else {
      this.elementRef.nativeElement.style.border = null;
      this.elementRef.nativeElement.style.boxShadow = null;
    }
    // if (!this.elementChecked && this.widget) {
    //   this.elementChecked = true;
    //   this.dragService.add(this.widget);
    // }
  }

  ngOnDestroy() {
    if (this.componentRef) this.componentRef.destroy();
  }

  private loadApplicationComponent(appName: string = this.widget.name) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory<Component>(this.widgetComponent);
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
        width: (this.widget.unitWidth * this.unitHeight) + 'px',
        height: (this.widget.unitHeight * this.unitHeight) + 'px',
        top: (this.widget.offsetTopUnit * this.unitHeight) + 'px',
        left: (this.widget.offsetLeftUnit * this.unitHeight) + 'px'
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
    let widget = this.dragService.Widgets.find(_widget => _widget.name === pos.widgetName);

    pos.move.X = Math.round(pos.move.X / this.unitHeight);
    pos.move.Y = Math.round(pos.move.Y / this.unitHeight);
    widget.offsetLeftUnit = pos.move.X;
    widget.offsetTopUnit = pos.move.Y;
    pos.move.X *= this.unitHeight;
    pos.move.Y *= this.unitHeight;
    this.cdr.detectChanges();

    let overlappedWidgets = this.dragService.widgetsOverlappedWithOthers();
    this.createOverlapNotification(overlappedWidgets);
  }

  private createOverlapNotification(overlappedWidgets: Array<{index: number, overlapped: boolean}>) {
    for (let widget of overlappedWidgets) {
      this.dragService.Widgets[widget.index].overlapped = widget.overlapped;
    }
  }
}
