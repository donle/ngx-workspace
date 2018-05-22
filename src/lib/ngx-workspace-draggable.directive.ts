import { Directive, Input, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import { Point } from './interfaces/point';
import { TileProfile } from './interfaces/tile';
import { NgxWorkspaceService } from './ngx-workspace.service';
import { NgxWorkspaceDataService, DATA_TYPE } from './ngx-workspace-data.service';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  @Input() public appDraggable: boolean;
  @Input('appDragScale') public draggableScale: { top: number, left: number, right: number, botton: number };
  @Input('appProfile') public appProfile: { tile: TileProfile, unitHeight: number };
  @Input('appShadow') public appShadowElement: any;
  @Output('appPosition') public appPosition: EventEmitter<{ move: Point, tileName: string }>;

  private originalOffset: { left: number, top: number };
  private isMouseDown: boolean;
  private lastPosition: Point;
  private moveTo: Point;

  constructor(
    private el: ElementRef,
    private dataService: NgxWorkspaceDataService<boolean>,
    private dragService: NgxWorkspaceService
  ) {
    this.isMouseDown = false;
    this.lastPosition = null;
    this.appPosition = new EventEmitter<{ move: Point, tileName: string }>();
    this.moveTo = null;
  }

  @HostListener('mousedown', ['$event']) onMouseDown(evt: MouseEvent) {
    if (!this.appDraggable) return;

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
  }

  @HostListener('mouseup') onMouseUp() {
    if (!this.isMouseDown) return;
    this.el.nativeElement.style.border = null;
    this.appPosition.emit(
      {
        move: this.moveTo,
        tileName: this.appProfile.tile.name
      });
    this.dragElementTo(this.moveTo);
    this.moveTo = null;
    this.isMouseDown = false;
    this.resetPosition();
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.isMouseDown) {
      this.appPosition.emit(
        {
          move: this.moveTo,
          tileName: this.appProfile.tile.name
        });
      this.dragElementTo(this.moveTo);
      this.moveTo = null;
    }
    this.isMouseDown = false;
    this.resetPosition();
  }

  @HostListener('mousemove', ['$event']) onMouseMove(evt: MouseEvent) {
    if (!this.appDraggable || !this.isMouseDown) return;

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

    let shadowMovesTo = {
      X: Math.round(this.moveTo.X / this.appProfile.unitHeight),
      Y: Math.round(this.moveTo.Y / this.appProfile.unitHeight)
    };
    this.moveElementShadowToByUnits(shadowMovesTo);
    const isOverlapped = this.dragService.isShadowCoveredOnTiles(this.appProfile.tile.name, {
      begin: shadowMovesTo,
      end: {
        X: shadowMovesTo.X + this.appProfile.tile.unitWidth,
        Y: shadowMovesTo.Y + this.appProfile.tile.unitHeight
      }
    });
    if (isOverlapped) {
      this.appShadowElement.style.background = 'rgba(255, 50, 0, 0.5)';
    } else {
      this.appShadowElement.style.background = 'rgba(0, 21, 59, 0.3)';
    }

    const board = document.querySelector('.drag-board');
    const distanceToBottom = board.clientHeight - this.el.nativeElement.offsetHeight - this.el.nativeElement.offsetTop;
    if (-distanceToBottom >= this.appProfile.unitHeight / 2) this.dataService.sendMessage({
      type: DATA_TYPE.ASK_FOR_EXTENDING_WORKBOARD,
      payload: true
    });
  }

  private dragElementTo(point: Point) {
    if (!point) return;
    this.el.nativeElement.style.top = point.Y + 'px';
    this.el.nativeElement.style.left = point.X + 'px';
  }

  private moveElementShadowToByUnits(point: Point) {
    if (!point) return;
    this.appShadowElement.style.top = (point.Y * this.appProfile.unitHeight) + 'px';
    this.appShadowElement.style.left = (point.X * this.appProfile.unitHeight) + 'px';
  }

  private resetPosition() {
    this.el.nativeElement.style.zIndex = null;
    this.appShadowElement.style.display = null;
  }
}
