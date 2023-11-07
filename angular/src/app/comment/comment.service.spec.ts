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

    service.delete({commentId: targetId});
    const actual = await getServiceComments();
    const foundComment = actual.find(comment => comment.id === targetId);

    expect(actual.length).toEqual(expected);
    expect(foundComment).toBeUndefined();
  })

  it('should delete replies', async()=>{
    const expected = 1;
    const commentId = 4;
    const repliedFrom = 2;

    service.delete({commentId, repliedFrom});
    const comments = await getServiceComments();
    const foundComment = comments.find(comment => comment.id === repliedFrom);
    const actual = foundComment?.replies.find(comment => comment.id === commentId);

    expect(foundComment?.replies.length).toEqual(expected);
    expect(actual).toBeUndefined();
  })

  describe('score', ()=>{
    it('should upvote', async ()=>{
      const commentId = 1;
      const comment = await findComment(commentId);
      const expected = comment.score +1;

      service.upvote(commentId)

      const actual = await findComment(commentId);
      expect(actual.score).toEqual(expected);
    });

    it('should downvote', async ()=>{
      const commentId = 1;
      const comment = await findComment(commentId);
      const expected = comment.score -1;

      service.downvote(commentId)

      const actual = await findComment(commentId);
      expect(actual.score).toEqual(expected);
    });
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

