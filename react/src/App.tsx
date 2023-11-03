import 'App.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Comment } from 'features/comment/Comment';
import { AddComment } from 'features/comment/addComment/AddComment';
import { fetchComments, selectCommentInitialized, selectComments } from 'features/comment/commentSlice';
import { fetchCurrentUser, selectUser } from 'features/user/userSlice';
import { useEffect } from 'react';



function App() {
  const dispatch = useAppDispatch();

  const {currentUser} = useAppSelector(selectUser);
  const isCommentsInitialized = useAppSelector(selectCommentInitialized);
  const comments = useAppSelector(selectComments);

  useEffect(()=>{
    if(!currentUser.username) {
      dispatch(fetchCurrentUser());
    }

    if(!isCommentsInitialized) {
      dispatch(fetchComments());
    }
  });

  const commentComponents = comments.map((commentData, index) => (<Comment key={index} userComment={commentData} ></Comment>))
  

  return (
    <div>
        {commentComponents}
        <AddComment></AddComment>
    </div>
  );
}

export default App;
