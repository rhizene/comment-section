import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserService } from '../user/user.service';
import { CommentComponent } from './comment.component';

import data from 'src/assets/data.json';
import { User } from '../user/user.model';
import { ScoreComponent } from './score/score.component';
import { CommentService } from './comment.service';
const {currentUser} = data;

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  
  beforeEach(async ()=>{
    TestBed.configureTestingModule({
      declarations: [
        CommentComponent,
        ScoreComponent
      ],
      providers: [
        UserService,
        CommentService,
      ]
    });
    
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;

  });

  
  describe("editComment", ()=>{
    

    it('should allow editing', () => {
      component.toggleEditMode();
      expect(component.editMode).toBeTrue();
    });

    it('should edit comment', ()=>{
      const service = TestBed.inject(CommentService);
      spyOn(service, 'editComment');
      component.saveEdit();

      expect(service.editComment).toHaveBeenCalled();
    });
  })
});
