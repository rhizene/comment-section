import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import data from 'src/assets/data.json';
import { CommentService } from '../comment.service';
import { AddcommentComponent } from './addcomment.component';
const { comments } = data;

describe('AddcommentComponent', () => {
  let component: AddcommentComponent;
  let fixture: ComponentFixture<AddcommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcommentComponent],
      imports: [ReactiveFormsModule],
      providers: [CommentService],
    });
    fixture = TestBed.createComponent(AddcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add comments', async () => {
    const expected = comments.length + 1;
    const service = TestBed.inject(CommentService);
    spyOn(service, 'addComment');

    component.submitComment()

    expect(service.addComment).toHaveBeenCalled();
  });
});
