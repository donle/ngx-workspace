import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxWorkboardComponent } from './ngx-workboard.component';

describe('NgxWorkboardComponent', () => {
  let component: NgxWorkboardComponent;
  let fixture: ComponentFixture<NgxWorkboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxWorkboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxWorkboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
