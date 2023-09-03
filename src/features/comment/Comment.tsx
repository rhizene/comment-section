import { faPencil, faShare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { format, formatDistanceToNow } from 'date-fns';
import { selectUser } from 'features/user/userSlice';
import { UserComment } from 'models/userComment';
import { useState } from 'react';
import styles from './Comment.module.scss';
import { editComment } from './commentSlice';
import { Score } from './score/Score';

type CommentParams = {
    userComment:UserComment
}

export function Comment({userComment}:CommentParams) {
    const dispatch = useAppDispatch()
    const commenter = userComment.user;
    const userImage = commenter.image.png
    const {currentUser} = useAppSelector(selectUser);

    const isOwnComment = commenter.username === currentUser.username;
    const commentSince = formatDistanceToNow(userComment.createdAt, {addSuffix: true}) 
    const commentDate = format(userComment.createdAt, 'MMMM d, yyyy hh:mm aa');
    const [editMode, setEditMode] = useState(false);
    const [displayedComment, setDisplayedComment] = useState(userComment.content);
    const isEditAllowed = isOwnComment && editMode;
    const contentClass = [styles.content];
    if(isEditAllowed) {
        contentClass.push(styles.editable);
    }

    const toggleEdit = ()=>{
        if(!editMode) {
            setEditMode(true);
        } else {
            setEditMode(false);
            setDisplayedComment(userComment.content);
        };
    }

    const saveEdit = ()=>{
        dispatch(editComment({content: displayedComment, id: userComment.id}))
            .then(()=>setEditMode(false));
    }

    const actionButton = isOwnComment?
    <button onClick={()=>toggleEdit()}>
        <FontAwesomeIcon icon={editMode?faTimes:faPencil}
        flip='horizontal'/>
        {editMode?'Cancel':'Edit'}
        </button>
    : <button> <FontAwesomeIcon icon={faShare} flip='horizontal'/> Reply </button>

    const saveButton = isEditAllowed ? <button onClick={()=>saveEdit()}>
        <FontAwesomeIcon icon={faShare} flip='horizontal' />
        Save
        </button>:null;
    
    return (
        <div className={styles.comments}>
            <Score score={userComment.score}  />
            <div className={styles.body}>
                <div className={styles.commenthead}>
                    <img src={userImage} alt={"avatar of "+commenter.username}/>
                    <div>
                        <span>{commenter.username}</span>
                        <span
                            className={styles.commentSince}
                            title={commentDate}>{commentSince}</span>
                    </div>
                    
                    <div className={styles.actionButtons}>
                        {saveButton}
                        {actionButton}
                    </div>
                </div>
                
                <div className={contentClass.join(' ')}>
                    {
                        isEditAllowed?
                            <textarea
                                value={displayedComment}
                                onChange={(e)=>setDisplayedComment(e.target.value)}>

                                </textarea>
                            :displayedComment
                    }
                </div>

            </div>
            
        </div>
    )
}
