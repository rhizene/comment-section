
import data from "resources/data.json";
import commentReducer, { addComment, editComment, fetchComments } from "./commentSlice";
import { useAppDispatch } from "app/hooks";
import { UserComment } from "models/userComment";
import { User } from "models/user";
const {comments, currentUser} = data;

describe('comment reducer', () => {
    const INITIAL_STATE = commentReducer(undefined, {type: fetchComments.fulfilled, payload: comments});
    const UNKOWN_ACTION = {type: null};
    
    it('should fetch from data.json', async () => {
        const expected = comments.length;
        const actual = commentReducer(INITIAL_STATE, UNKOWN_ACTION)
        expect(actual.items.length).toBe(expected);
    });


    it('should add comments', async () => {
        const expected = comments.length + 1;
        const newComment = new UserComment({content: 'test', id: 9, user: new User(currentUser)})
        const actual = commentReducer(INITIAL_STATE, {type: addComment.fulfilled, payload: newComment});

        expect(actual.items.length).toBe(expected);
    });

    it('should edit comments', async () => {
        const EDITED_ID = 1;
        const expected = "changed comment content";
        const result = commentReducer(INITIAL_STATE, {type: editComment.fulfilled, payload: {id: EDITED_ID, content: expected}});
        const actual = result.items.find(comment => comment.id === EDITED_ID);

        expect(actual?.content).toBe(expected);
        expect(actual?.id).toBe(EDITED_ID);
    });
  
  });
  