import { Component, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef, Input, OnInit, OnDestroy } from '@angular/core';
import * as elementResizeDetectorMaker from 'element-resize-detector';

import { NgxWorkspaceDataService, DATA_TYPE } from '../ngx-workspace-data.service';
import { WidgetProfile } from '../interfaces/widget';

@Component({
  selector: 'ngx-workboard',
  templateUrl: './ngx-workboard.component.html',
  styleUrls: ['./ngx-workboard.component.scss']
})
export class NgxWorkboardComponent implements OnInit, AfterViewInit, OnDestroy {
  private workspaceResizeDetector: elementResizeDetectorMaker.Erd;
  private unitHeight: number;
  public responsiveMode: boolean;
  public dragScale: {
    left: number,
    right: number,
    top: number,
    bottom: number
  };
  @Input('widgets') public widgets: Array<WidgetProfile>;
  @Input('edit') public enableEditMode: boolean;
  @Input('responsive') public enableResponsive: boolean;
  @Input('responsive-scale') public responsiveMinimalWidth: number;
  @ViewChild('workboard') private boardElement: ElementRef;
  @ViewChild('background') private backgroundRef: ElementRef;
  constructor(
    private cdr: ChangeDetectorRef,
    private dataService: NgxWorkspaceDataService<any>
  ) {
    this.unitHeight = 0;
    this.responsiveMode = true;
    this.enableResponsive = true;
  }

  ngOnInit () {
    this.dataService.currentMessage.subscribe(data => {
      switch (data.type) {
        case DATA_TYPE.ASK_FOR_EDIT_MODE: {
          if (!this.enableEditMode) this.autoBoardHeight();
          return;
        }
        case DATA_TYPE.ASK_FOR_EXTENDING_WORKBOARD: {
          this.extendDragboard();
          return;
        }
      }
    });
  }

  ngAfterViewInit() {
    if (window.innerWidth < this.responsiveMinimalWidth || !this.enableResponsive) this.responsiveMode = false;

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

    let unitsOfGrid = Math.round(this.boardElement.nativeElement.offsetHeight / this.unitHeight + 0.49) * 12;
    this.updateGrids(unitsOfGrid);

    this.workspaceResizeDetector = elementResizeDetectorMaker();
    this.workspaceResizeDetector.listenTo(this.boardElement.nativeElement, element => {
      this.onWindowResize();
    });
  }

  ngOnDestroy () {
    this.enableEditMode = false;
    this.workspaceResizeDetector.removeAllListeners(this.boardElement.nativeElement);
  }

  private onWindowResize() {
    if (window.innerWidth < this.responsiveMinimalWidth) {
      this.responsiveMode = false;
      this.enableEditMode = false;
    } else {
      this.responsiveMode = true;
    }
    const newHeight = this.boardElement.nativeElement.offsetWidth / 12;
    if (newHeight !== this.unitHeight) {
      this.unitHeight = newHeight;
      this.autoBoardHeight();
      this.updateGridSize();
      this.dragScale.right = this.boardElement.nativeElement.offsetWidth + this.boardElement.nativeElement.offsetLeft;
    }
    this.cdr.detectChanges();
  }

  private autoBoardHeight () {
    let maxHeightToTop = 0;
    for (let widget of this.widgets) {
      if (widget.unitHeight + widget.offsetTopUnit > maxHeightToTop) {
        maxHeightToTop = widget.unitHeight + widget.offsetTopUnit;
      }
    }
    this.boardElement.nativeElement.style.minHeight = (this.unitHeight * maxHeightToTop + 24) + 'px';
  }

  private updateGridSize () {
    let grids = this.backgroundRef.nativeElement.querySelectorAll('.grid');
    for (let grid of grids) {
      grid.style.height = this.unitHeight + 'px';
      grid.style.width = this.unitHeight + 'px';
    }
  }

  private updateGrids (num: number) {
    if (num < 0) {
      let currentGrids = this.backgroundRef.nativeElement.querySelectorAll('.grid');
      for (let i = 0; i < -num; i++) {
        currentGrids[i].remove();
      }
    } else {
      const grid = document.createElement('li');
      grid.className += 'grid';
      grid.style.height = this.unitHeight + 'px';
      grid.style.width = this.unitHeight + 'px';
      grid.innerHTML = '<span></span>';
      for (let i = 0; i < num; i++) {
        this.backgroundRef.nativeElement.appendChild(grid.cloneNode(true));
      }
    }
  }

  private extendDragboard () {
    const newHeight = this.boardElement.nativeElement.offsetHeight + this.unitHeight * 4;
    this.boardElement.nativeElement.style.minHeight = newHeight + 'px';
    this.updateGrids(48);
  }
}
