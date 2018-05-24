import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDragElementComponent } from './ngx-drag-element/ngx-drag-element.component';
import { NgxWorkboardComponent } from './ngx-workboard/ngx-workboard.component';
import { NgxWorkspaceService } from './ngx-workspace.service';
import { NgxWidgetDraggableDirective } from './ngx-workspace-draggable.directive';
import { NgxWorkspaceDataService } from './ngx-workspace-data.service';
import { NgxWidgetLoaderDirective } from './ngx-widget-loader.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxDragElementComponent,
    NgxWorkboardComponent,
    NgxWidgetDraggableDirective,
    NgxWidgetLoaderDirective
  ],
  providers: [
    NgxWorkspaceService,
    NgxWorkspaceDataService
  ],
  exports: [
    NgxWorkboardComponent,
    NgxDragElementComponent
  ]
})
export class NgxWorkspaceModule { }
