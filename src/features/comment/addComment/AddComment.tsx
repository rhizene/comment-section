import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectUser } from 'features/user/userSlice';
import styles from './AddComment.module.scss';
import { ReplyInfo, addComment } from '../commentSlice';
import { UserComment } from 'models/userComment';
import { useState } from 'react';

type AddCommentParams = {replyTo?:ReplyInfo, onSend?:()=>void}
const DEFAULT_COMMENT = '';
export function AddComment({replyTo, onSend}:AddCommentParams) {
    const [comment, setComment] = useState(DEFAULT_COMMENT);

    const dispatch = useAppDispatch();
    const {currentUser} = useAppSelector(selectUser);
    const userImage = currentUser.image.png

    function submitComment(){
        const newComment = new UserComment({
            id: new Date().getTime(),
            content: comment,
            user: currentUser
        });
        dispatch(addComment({
            comment: newComment,
            replyTo
        }))
        .then(()=>{
            if(onSend !== undefined) onSend();
        });
        return setComment(DEFAULT_COMMENT);
    }

    
    const componentClass = [styles.addCommentWrapper]
    if(replyTo!== undefined){
        componentClass.push(styles.replying);
    }


    return (
        <div className={componentClass.join(' ')}>
            <div className={styles.addComment}>
                <img src={userImage} alt={"avatar of "+currentUser.username}/>
                <fieldset >
                    <legend>Add a comment</legend>
                    <textarea rows={3} onChange={e=>setComment(e.target.value)} placeholder='Add a comment' value={comment}/>
                </fieldset>
                

                <button onClick={()=>submitComment()}>SEND</button>
            </div>
        </div>
    )
}