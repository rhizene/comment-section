
import { User } from "models/user";
import { UserComment } from "models/userComment";
import data from "resources/data.json";
import commentReducer, { addComment, deleteComment, downvoteComment, editComment, fetchComments, upvoteComment } from "./commentSlice";
const {comments, currentUser} = data;

describe('comment reducer', () => {
    const generateInitialState = ()=>commentReducer(undefined, {type: fetchComments.fulfilled, payload: comments});
    const UNKOWN_ACTION = {type: null};
    
    it('should fetch from data.json', async () => {
        const expected = comments.length;
        const actual = commentReducer(generateInitialState(), UNKOWN_ACTION)
        expect(actual.items.length).toBe(expected);
    });


    it('should add comments', async () => {
        const expected = comments.length + 1;
        const newComment = new UserComment({content: 'test', id: 9, user: new User(currentUser)})
        const actual = commentReducer(generateInitialState(), {type: addComment.fulfilled, payload: newComment});

        expect(actual.items.length).toBe(expected);
    });

    it('should edit comments', async () => {
        const EDITED_ID = 1;
        const expected = "changed comment content";
        const result = commentReducer(generateInitialState(), {type: editComment.fulfilled, payload: {id: EDITED_ID, content: expected}});
        const actual = result.items.find(comment => comment.id === EDITED_ID);

        expect(actual?.content).toBe(expected);
        expect(actual?.id).toBe(EDITED_ID);
    });

    it('should delete comments', async () => {
        const expected = 1;
        const result = commentReducer(generateInitialState(), {type: deleteComment.fulfilled, payload: {id: expected}});
        const actual = result.items;
        
        expect(actual).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({id: expected})
            ])
        );
    });

    it('should upvote comments', async () => {
        const COMMENT_ID = 1;
        const expected = 13;
        const result = commentReducer(generateInitialState(), {type: upvoteComment.fulfilled, payload: {id: COMMENT_ID}});
        const actual = result.items.find(comment =>comment.id === COMMENT_ID);
        
        expect(actual?.score).toEqual(expected);
    });

    it('should downvote comments', async () => {
        const COMMENT_ID = 1;
        const expected = 11;
        const result = commentReducer(generateInitialState(), {type: downvoteComment.fulfilled, payload: {id: COMMENT_ID}});
        const actual = result.items.find(comment =>comment.id === COMMENT_ID);
        
        expect(actual?.score).toEqual(expected);
    });

    it('should delete replies', async () => {
        const expected = 3;
        const repliedFrom = 2;
        const result = commentReducer(generateInitialState(), {type: deleteComment.fulfilled, payload: {id: expected, repliedFrom}});
        const actual = result.items.find(comment => comment.id === repliedFrom);
        
        expect(actual?.replies).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({id: expected})
            ])
        );
    });
  
  });
  