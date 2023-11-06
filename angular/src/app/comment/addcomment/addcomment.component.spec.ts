import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcommentComponent } from './addcomment.component';

describe('AddcommentComponent', () => {
  let component: AddcommentComponent;
  let fixture: ComponentFixture<AddcommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcommentComponent]
    });
    fixture = TestBed.createComponent(AddcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
