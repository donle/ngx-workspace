import { Injectable } from '@angular/core';
import { WidgetProfile, WidgetArea } from './interfaces/widget';
@Injectable()
export class NgxWorkspaceService {
  private widgets: Array<WidgetProfile>;
  constructor() {
    this.widgets = [];
  }

  private initWidgetOptions (widget: WidgetProfile) {
    if (widget.overlapped === undefined) widget.overlapped = false;
    if (widget.highlighted === undefined) widget.highlighted = false;
  }

  public get Widgets() {
    return this.widgets;
  }

  public add (widgets: WidgetProfile | Array<WidgetProfile>) {
    if (!(widgets instanceof Array)) widgets = [widgets];
    for (let widget of widgets) {
      this.initWidgetOptions(widget);
      this.widgets.push(widget);
    }
  }

  public sync(widgets: Array<WidgetProfile>) {
    for (let widget of widgets) {
      const matchedIndex = this.widgets.findIndex(w => w.name === widget.name);
      if (matchedIndex >= 0) {
        this.widgets[matchedIndex] = widget;
      }
    }
  }

  public remove(widget: WidgetProfile) {
    let index = this.widgets.findIndex(_widget => widget.name === _widget.name);
    if (index >= 0) this.widgets.splice(index, 1);
  }

  public clear() {
    this.widgets = [];
  }

  public widgetsOverlappedWithOthers(widgets?: Array<WidgetProfile>) {
    widgets = widgets || this.widgets;
    let occupiedWidgets: Array<boolean> = [];
    for (let i = 0; i < widgets.length; i++) {
      occupiedWidgets.push(false);
    }

    for (let i = 0; i < widgets.length; i++) {
      const src_widget = widgets[i];
      for (let j = i + 1; j < widgets.length; j++) {
        const dest_widget = widgets[j];
        const srcWidgetArea: WidgetArea = {
          begin: {
            X: src_widget.offsetLeftUnit,
            Y: src_widget.offsetTopUnit
          },
          end: {
            X: src_widget.offsetLeftUnit + src_widget.unitWidth,
            Y: src_widget.offsetTopUnit + src_widget.unitHeight
          }
        };
        let destWidgetArea: WidgetArea = {
          begin: {
            X: dest_widget.offsetLeftUnit,
            Y: dest_widget.offsetTopUnit
          },
          end: {
            X: dest_widget.offsetLeftUnit + dest_widget.unitWidth,
            Y: dest_widget.offsetTopUnit + dest_widget.unitHeight
          }
        };

        if (this.isInsideAreaOf(destWidgetArea, srcWidgetArea)) {
          occupiedWidgets[i] = true;
          occupiedWidgets[j] = true;
        }
      }
    }
    return occupiedWidgets;
  }

  private isInsideAreaOf(origin: WidgetArea, target: WidgetArea): boolean {
    return target.end.X > origin.begin.X && target.begin.X < origin.end.X && target.end.Y > origin.begin.Y && target.begin.Y < origin.end.Y;
  }

  public isShadowCoveredOnWidgets(widgetname: string, area: WidgetArea): boolean {
    for (let widget of this.widgets) {
      if (widget.name === widgetname) continue;
      const srcWidgetArea: WidgetArea = {
        begin: {
          X: widget.offsetLeftUnit,
          Y: widget.offsetTopUnit
        },
        end: {
          X: widget.offsetLeftUnit + widget.unitWidth,
          Y: widget.offsetTopUnit + widget.unitHeight
        }
      };

      if (this.isInsideAreaOf(srcWidgetArea, area)) return true;
    }
    return false;
  }
}
