import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoardMemberComponent } from './add-board-member.component';

describe('AddBoardMemberComponent', () => {
  let component: AddBoardMemberComponent;
  let fixture: ComponentFixture<AddBoardMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoardMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoardMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
