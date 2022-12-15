import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangebgDialogComponent } from './changebg-dialog.component';

describe('ChangebgDialogComponent', () => {
  let component: ChangebgDialogComponent;
  let fixture: ComponentFixture<ChangebgDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangebgDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangebgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
