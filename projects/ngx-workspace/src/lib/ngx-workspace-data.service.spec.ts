import { TestBed, inject } from '@angular/core/testing';

import { NgxWorkspaceDataService } from './ngx-workspace-data.service';

describe('NgxWorkspaceDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxWorkspaceDataService]
    });
  });

  it('should be created', inject([NgxWorkspaceDataService], (service: NgxWorkspaceDataService<any>) => {
    expect(service).toBeTruthy();
  }));
});
