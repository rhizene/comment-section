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
      const actual = await findComment(expected.id);
      

      expect(actual?.content).toEqual(expected.content);
    })

    it('should edit nested comment', async ()=>{
      const expected = {id: 3, content: 'new comment contents'};

      service.editComment(expected.id, expected.content);
      const actual = await findComment(expected.id);
      

      expect(actual?.content).toEqual(expected.content);
    })
  })

  it('should add replies', async ()=>{
    const expected = 3;
    const repliedTo = 2;
    const comment = generateComment();
    
    service.reply(repliedTo, comment);
    const actual = await findComment(repliedTo);

    expect(actual.replies.length).toEqual(expected);
  })

  it('should delete comments', async()=>{
    const expected = comments.length - 1;
    const targetId = 1;

    service.delete(targetId);
    const actual = await getServiceComments();
    const foundComment = actual.find(comment => comment.id === targetId);

    expect(actual.length).toEqual(expected);
    expect(foundComment).toBeUndefined();
  })

  
  function getServiceComments(){
    return service.getComments();
  }

  async function findComment(commentId:number) {
    const comment = UserComment.findById(await getServiceComments(), commentId);
    if(comment === null) throw new Error('comment not found: ' + commentId);

    return comment;
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

