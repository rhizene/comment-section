import { TestBed } from '@angular/core/testing';

import data from 'src/assets/data.json';
import { User } from '../user/user.model';
import { CommentService } from './comment.service';
import { UserComment } from './user-comment.model';
const { comments, currentUser } = data;


describe('CommentsService', () => {
  let service: CommentService;    

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentService);
    
    await service.getComments();
  });

  describe('addComment', ()=>{
    const newComment = new UserComment({content: 'test', id: 9, user: new User(currentUser)})
    
    it('should add comments', async () => {
      const expected = comments.length +1;
      service.addComment(newComment);
      
      const actual = (await service.getComments()).length;
      
      expect(actual).toEqual(expected)
    });
  
    it('should contain correct comment details', async () => {
      const expected = newComment;
      service.addComment(newComment);
      
      const actual = (await service.getComments()).pop();
      
      expect(actual?.content).toEqual(expected.content);
      expect(actual?.user.username).toEqual(expected.user.username);
    });

  })

  
});
