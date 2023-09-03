import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectUser } from 'features/user/userSlice';
import styles from './AddComment.module.scss';
import { addComment } from '../commentSlice';
import { UserComment } from 'models/userComment';
import { useState } from 'react';


const DEFAULT_COMMENT = '';
export function AddComment() {
    const [comment, setComment] = useState(DEFAULT_COMMENT);

    const dispatch = useAppDispatch();
    const {currentUser} = useAppSelector(selectUser);
    const userImage = currentUser.image.png

    function submitComment(){
        dispatch(addComment(new UserComment({
            id: new Date().getTime(),
            content: comment,
            user: currentUser
        })));
        return setComment(DEFAULT_COMMENT);
    }


    return (
        <div className={styles.addComment}>
            <img src={userImage} alt={"avatar of "+currentUser.username}/>
            <fieldset >
                <legend>Add a comment</legend>
                <textarea rows={3} onChange={e=>setComment(e.target.value)} placeholder='Add a comment' value={comment}/>
            </fieldset>
            

            <button onClick={()=>submitComment()}>SEND</button>
        </div>
    )
}