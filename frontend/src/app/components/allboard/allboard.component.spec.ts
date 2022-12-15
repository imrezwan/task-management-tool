import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllboardComponent } from './allboard.component';

describe('AllboardComponent', () => {
  let component: AllboardComponent;
  let fixture: ComponentFixture<AllboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
