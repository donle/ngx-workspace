import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragElementComponent } from './ngx-drag-element/ngx-drag-element.component';
import { NgxWorkboardComponent } from './ngx-workboard/ngx-workboard.component';
import { NgxWorkspaceService } from './ngx-workspace.service';
import { DraggableDirective } from './ngx-workspace-draggable.directive';

@NgModule({
  imports: [
    CommonModule
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
})
export class NgxWorkspaceModule { }
