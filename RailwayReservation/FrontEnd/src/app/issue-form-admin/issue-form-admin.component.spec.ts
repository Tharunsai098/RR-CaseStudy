import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueFormAdminComponent } from './issue-form-admin.component';

describe('IssueFormAdminComponent', () => {
  let component: IssueFormAdminComponent;
  let fixture: ComponentFixture<IssueFormAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueFormAdminComponent]
    });
    fixture = TestBed.createComponent(IssueFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
