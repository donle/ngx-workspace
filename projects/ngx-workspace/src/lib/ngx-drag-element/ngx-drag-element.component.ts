import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, HostListener, ViewChild, ElementRef, DoCheck, ComponentFactoryResolver, AfterViewInit, ComponentRef, Type, OnDestroy } from '@angular/core';
import { NgxWorkspaceService } from '../ngx-workspace.service';
import { NgxWidgetLoaderDirective } from '../ngx-widget-loader.directive';
import { TileProfile } from '../interfaces/tile';
import { NgxWorkspaceDataService, DATA_TYPE } from '../ngx-workspace-data.service';
import { Point } from '../interfaces/point';

@Component({
  selector: 'ngx-drag-element',
  templateUrl: './ngx-drag-element.component.html',
  styleUrls: ['./ngx-drag-element.component.scss']
})
export class DragElementComponent implements OnInit, DoCheck, AfterViewInit, OnDestroy {
  @Input('element') tile: TileProfile;
  @Input('component') widgetComponent: typeof Component;
  @Input('responsiveMode') responsiveMode: boolean;
  @ViewChild('elementRef') elementRef: ElementRef;
  @ViewChild('elementShadow') elementShadow: ElementRef;
  @ViewChild(NgxWidgetLoaderDirective) widgetContainer: NgxWidgetLoaderDirective;
  private componentRef: ComponentRef<Component>;
  private elementChecked: boolean = false;
  private dragMessagId: string;
  private unitHeight: number;
  private dragScale: {
    left: number,
    right: number,
    top: number,
    bottom: number
  };

  public enableEditMode: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private dataService: NgxWorkspaceDataService<any>,
    private dragService: NgxWorkspaceService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.unitHeight = 0;
    this.dataService.sendMessage({ type: DATA_TYPE.ASK_FOR_UNIT_HEIGHT, payload: true });
    this.dataService.sendMessage({ type: DATA_TYPE.ASK_FOR_DRAG_SCALE, payload: true });
  }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(data => {
      switch(data.type) {
        case DATA_TYPE.ASK_FOR_DRAG_SCALE: this.dragScale = data.payload; return;
        case DATA_TYPE.ASK_FOR_EDIT_MODE: this.enableEditMode = data.payload; return;
        case DATA_TYPE.ASK_FOR_UNIT_HEIGHT: this.unitHeight = data.payload; return;
      }
    });
  }

  ngAfterViewInit () {
    this.loadApplicationComponent();
    this.elementRef.nativeElement.id = this.tile.name;
  }

  ngDoCheck () {
    if (this.tile.overlapped) {
      this.elementRef.nativeElement.style.border = '2px solid #f44336';
      this.elementRef.nativeElement.style.boxShadow = '0 2px 4px -1px rgba(255,107,107, .2), 0 4px 5px 0 rgba(255,107,107, .14), 0 1px 10px 0 rgba(255,107,107, .12)';
    } else {
      this.elementRef.nativeElement.style.border = null;
      this.elementRef.nativeElement.style.boxShadow = null;
    }
    if (!this.elementChecked && this.tile) {
      this.elementChecked = true;
      this.dragService.add(this.tile);
    }
  }

  ngOnDestroy() {
    if (this.componentRef) this.componentRef.destroy();
  }

  private loadApplicationComponent (appName: string = this.tile.name) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory<Component>(this.widgetComponent);
    let viewContainerRef = this.widgetContainer.viewContainerRef;
    viewContainerRef.clear();
    
    this.componentRef = viewContainerRef.createComponent<Component>(componentFactory);
  }

  public get getTileStyle() {
    if (!this.responsiveMode) {
      return {
        width: '100%'
      }
    } else {
      return {
        position: 'absolute',
        width: (this.tile.unitWidth * this.unitHeight) + 'px',
        height: (this.tile.unitHeight * this.unitHeight) + 'px',
        top: (this.tile.offsetTopUnit * this.unitHeight) + 'px',
        left: (this.tile.offsetLeftUnit * this.unitHeight) + 'px'
      }
    }
  }

  public getAppProfile(tile: TileProfile) {
    return {
      unitHeight: this.unitHeight,
      tile
    }
  }

  public getPosition(pos: { move: Point, tileName: string }) {
    if (!pos.move || !this.responsiveMode) return;
    let tile = this.dragService.Tiles.find(_tile => _tile.name === pos.tileName);

    pos.move.X = Math.round(pos.move.X / this.unitHeight);
    pos.move.Y = Math.round(pos.move.Y / this.unitHeight);
    tile.offsetLeftUnit = pos.move.X;
    tile.offsetTopUnit = pos.move.Y;
    pos.move.X *= this.unitHeight;
    pos.move.Y *= this.unitHeight;
    this.cdr.detectChanges();

    let tiles_index = this.dragService.tilesOverlappedWithOthers(this.dragService.Tiles);
    this.createOverlapNotification(tiles_index);
  }

  private createOverlapNotification(tiles_index: Array<number>) {
    for (let i = 0; i < this.dragService.Tiles.length; i++) {
      this.dragService.Tiles[i].overlapped = tiles_index.includes(i) ? true : false;
    }
  }
}
