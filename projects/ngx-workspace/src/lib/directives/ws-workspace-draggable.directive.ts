import { Directive, Input, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import { Point } from '../interfaces/point';
import { WidgetProfile } from '../interfaces/widget';
import { WsWorkspaceService } from '../services/ws-workspace.service';
import { WsWorkspaceDataService, DATA_TYPE } from '../services/ws-workspace-data.service';

@Directive({
  selector: '[wsWidgetDraggable]'
})
export class WsWidgetDraggableDirective {
  @Input() public wsWidgetDraggable: boolean;
  @Input('wsDragScale') public draggableScale: { top: number, left: number, right: number, botton: number };
  @Input('wsWidgetProfile') public widgetProfile: { widget: WidgetProfile, unitHeight: number };
  @Input('wsWidgetShadow') public widgetShadow: any;
  @Output('wsWidgetPPosition') public widgetPosition: EventEmitter<{ move: Point, widgetName: string }>;

  private originalOffset: { left: number, top: number };
  private isMouseDown: boolean;
  private lastPosition: Point;
  private moveTo: Point;

  constructor(
    private el: ElementRef,
    private dataService: WsWorkspaceDataService<boolean>,
    private dragService: WsWorkspaceService
  ) {
    this.isMouseDown = false;
    this.lastPosition = null;
    this.widgetPosition = new EventEmitter<{ move: Point, widgetName: string }>();
    this.moveTo = null;
  }

  @HostListener('mousedown', ['$event']) onMouseDown(evt: MouseEvent) {
    if (!this.wsWidgetDraggable) return;

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
    this.widgetShadow.style.display = 'block';
  }

  @HostListener('mouseup') onMouseUp() {
    if (!this.isMouseDown) return;
    this.el.nativeElement.style.border = null;
    this.widgetPosition.emit(
      {
        move: this.moveTo,
        widgetName: this.widgetProfile.widget.name
      });
    this.dragElementTo(this.moveTo);
    this.moveTo = null;
    this.isMouseDown = false;
    this.resetPosition();
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.isMouseDown) {
      this.widgetPosition.emit(
        {
          move: this.moveTo,
          widgetName: this.widgetProfile.widget.name
        });
      this.dragElementTo(this.moveTo);
      this.moveTo = null;
    }
    this.isMouseDown = false;
    this.resetPosition();
  }

  @HostListener('mousemove', ['$event']) onMouseMove(evt: MouseEvent) {
    if (!this.wsWidgetDraggable || !this.isMouseDown) return;

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
      X: Math.round(this.moveTo.X / this.widgetProfile.unitHeight),
      Y: Math.round(this.moveTo.Y / this.widgetProfile.unitHeight)
    };
    this.moveElementShadowToByUnits(shadowMovesTo);
    const isOverlapped = this.dragService.isShadowCoveredOnWidgets(this.widgetProfile.widget.name, {
      begin: shadowMovesTo,
      end: {
        X: shadowMovesTo.X + this.widgetProfile.widget.unitWidth,
        Y: shadowMovesTo.Y + this.widgetProfile.widget.unitHeight
      }
    });
    if (isOverlapped) {
      this.widgetShadow.style.background = 'rgba(255, 50, 0, 0.5)';
    } else {
      this.widgetShadow.style.background = 'rgba(0, 21, 59, 0.3)';
    }

    const board = document.querySelector('.ngx-workspace-drag-board');
    const distanceToBottom = board.clientHeight - this.el.nativeElement.offsetHeight - this.el.nativeElement.offsetTop;
    if (-distanceToBottom >= this.widgetProfile.unitHeight / 2) this.dataService.sendMessage({
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
    this.widgetShadow.style.top = (point.Y * this.widgetProfile.unitHeight) + 'px';
    this.widgetShadow.style.left = (point.X * this.widgetProfile.unitHeight) + 'px';
  }

  private resetPosition() {
    this.el.nativeElement.style.zIndex = null;
    this.widgetShadow.style.display = null;
  }
}
