import { TestBed, inject } from '@angular/core/testing';

import { WsWorkspaceDataService } from './ws-workspace-data.service';

describe('WsWorkspaceDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsWorkspaceDataService]
    });
  });

  it('should be created', inject([WsWorkspaceDataService], (service: WsWorkspaceDataService<any>) => {
    expect(service).toBeTruthy();
  }));
});
