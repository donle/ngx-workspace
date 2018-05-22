import { TestBed, inject } from '@angular/core/testing';

import { NgxWorkspaceService } from './ngx-workspace.service';

describe('NgxWorkspaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxWorkspaceService]
    });
  });

  it('should be created', inject([NgxWorkspaceService], (service: NgxWorkspaceService) => {
    expect(service).toBeTruthy();
  }));
});
