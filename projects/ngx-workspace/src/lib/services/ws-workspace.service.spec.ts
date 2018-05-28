import { TestBed, inject } from '@angular/core/testing';

import { WsWorkspaceService } from './ws-workspace.service';

describe('WsWorkspaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsWorkspaceService]
    });
  });

  it('should be created', inject([WsWorkspaceService], (service: WsWorkspaceService) => {
    expect(service).toBeTruthy();
  }));
});
