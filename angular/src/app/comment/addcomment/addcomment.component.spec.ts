import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '../comment.service';
import { AddcommentComponent } from './addcomment.component';


describe('AddcommentComponent', () => {
  let component: AddcommentComponent;
  let fixture: ComponentFixture<AddcommentComponent>;

  beforeEach(() => {
    const commentServiceSpy = jasmine.createSpyObj('CommentService', ['addComment', 'editComment']);
    TestBed.configureTestingModule({
      declarations: [AddcommentComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: CommentService, useValue: commentServiceSpy}
      ],
    });
    fixture = TestBed.createComponent(AddcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add comments', async () => {
    let service = TestBed.inject(CommentService) as jasmine.SpyObj<CommentService>;
    service.addComment.and.returnValue(Promise.resolve([]));

    component.submitComment()

    expect(service.addComment).toHaveBeenCalled();
  });
});
