import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum DATA_TYPE {
  ASK_FOR_UNIT_HEIGHT,
  ASK_FOR_DRAG_SCALE,
  ASK_FOR_EDIT_MODE,
  ASK_FOR_EXTENDING_WORKBOARD
}

interface DataModel<T> {
  type: DATA_TYPE,
  payload: T
}

@Injectable()
export class NgxWorkspaceDataService<T> {
  private messageSource = new BehaviorSubject<DataModel<T>>({ type: null, payload: null });
  public readonly currentMessage = this.messageSource.asObservable();

  constructor() { }

  sendMessage(message: DataModel<T>) {
    this.messageSource.next(message);
  }
}
