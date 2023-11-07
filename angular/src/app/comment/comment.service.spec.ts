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
    
    await getServiceComments();
  });

  describe('addComment', ()=>{
    const newComment = generateComment();
    
    it('should add comments', async () => {
      const expected = comments.length +1;
      service.addComment(newComment);
      
      const actual = (await getServiceComments()).length;
      
      expect(actual).toEqual(expected)
    });
  
    it('should contain correct comment details', async () => {
      const expected = newComment;
      service.addComment(newComment);
      
      const actual = (await getServiceComments()).pop();
      
      expect(actual?.content).toEqual(expected.content);
      expect(actual?.user.username).toEqual(expected.user.username);
    });

  })

  describe('editComment', ()=>{
    it('should edit comment', async ()=>{
      const expected = {id: 1, content: 'new comment contents'};

      service.editComment(expected.id, expected.content);
      const actual = UserComment.findById(await service.getComments(), expected.id)
      

      expect(actual?.content).toEqual(expected.content);
    })

    it('should edit nested comment', async ()=>{
      const expected = {id: 3, content: 'new comment contents'};

      service.editComment(expected.id, expected.content);
      const actual = UserComment.findById(await service.getComments(), expected.id);
      

      expect(actual?.content).toEqual(expected.content);
    })
  })

  
  function getServiceComments(){
    return service.getComments();
  }

  
});


function generateComment(customCommentParams?:{
  content:string,
  }) {
  const defaultCommentParams = {content: 'test', id: 9, user: new User(currentUser)};
  return new UserComment({
    ...defaultCommentParams,
    ...customCommentParams
  })
}

