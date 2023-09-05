import { faPen, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { format, formatDistanceToNow } from 'date-fns';
import { selectUser } from 'features/user/userSlice';
import { UserComment } from 'models/userComment';
import { MutableRefObject, useRef, useState } from 'react';
import styles from './Comment.module.scss';
import { editComment } from './commentSlice';
import { DeleteButton } from './deleteButton/DeleteButton';
import { Score } from './score/Score';
import { Badge } from 'react-bootstrap';
import { AddComment } from './addComment/AddComment';

type CommentParams = {
    userComment:UserComment,
    repliedFrom?:number
}

export function Comment({userComment, repliedFrom}:CommentParams) {
    const dispatch = useAppDispatch()
    const commenter = userComment.user;
    const userImage = commenter.image.png
    const {currentUser} = useAppSelector(selectUser);

    const isOwnComment = commenter.username === currentUser.username;
    const commentSince = formatDistanceToNow(userComment.createdAt, {addSuffix: true}) 
    const commentDate = format(userComment.createdAt, 'MMMM d, yyyy hh:mm aa');
    const [editMode, setEditMode] = useState(false);
    const [replyMode, setReplyMode] = useState(false);
    const [displayedComment, setDisplayedComment] = useState(userComment.content);
    const isEditAllowed = isOwnComment && editMode;
    const contentClass = [styles.content];
    if(isEditAllowed) {
        contentClass.push(styles.editable);
    }
    const commentFieldRef = useRef(null);
    
    function toggleEdit (fieldRef:MutableRefObject<any>){
        if(!editMode) {
            setEditMode(true);
            fieldRef.current.focus();
        } else {
            setEditMode(false);
            setDisplayedComment(userComment.content);
        };
    }

    function toggleReply(){
        setReplyMode(!replyMode);
    }

    const saveEdit = ()=>{
        dispatch(editComment({content: displayedComment, id: userComment.id}))
            .then(()=>setEditMode(false));
    }    

    const actionButton = isOwnComment?
        <button className='borderless' onClick={()=>toggleEdit(commentFieldRef)}>
            <FontAwesomeIcon icon={faPen}/>
            Edit
        </button>
        : <button className='borderless' onClick={toggleReply}> <FontAwesomeIcon icon={faShare} flip='horizontal'/> Reply </button>

    const saveButton = isEditAllowed ? <button onClick={()=>saveEdit()}>
        UPDATE</button>:null;

    const deleteButton = isEditAllowed?
        <DeleteButton id={userComment.id} repliedFrom={repliedFrom}></DeleteButton>
        :null;

    const replies = userComment.replies.map((reply, index)=><Comment userComment={reply} repliedFrom={userComment.id} key={reply.id+'_'+index}></Comment>)
    const commentStyle = [styles.comments];
    if(replies.length > 0) {
        commentStyle.push(styles.withReplies);
    }
    
    return (
        <div className={styles.commentContainer}>
            <div className={commentStyle.join(' ')}>
                <Score commentId={userComment.id} score={userComment.score}  />
                <div className={styles.body}>
                    <div className={styles.commenthead}>
                        <img src={userImage} alt={"avatar of "+commenter.username}/>
                        <div>
                            <span>{commenter.username}</span>
                            {isOwnComment?<Badge className={styles.badge}>YOU</Badge>:null}
                            <span
                                className={styles.commentSince}
                                title={commentDate}>{commentSince}</span>
                        </div>
                        
                        <div className={styles.actionButtons}>
                            {deleteButton}
                            {actionButton}
                        </div>
                    </div>
                    
                    <div className={contentClass.join(' ')}>
                    
                        <textarea ref={commentFieldRef}
                            className={!isEditAllowed?'d-none':''}
                            value={displayedComment}
                            onChange={(e)=>setDisplayedComment(e.target.value)}>
                        </textarea>
                        { isEditAllowed?null :displayedComment }
                    </div>
                    <div className={styles.commentfoot}>
                        <div className={styles.actionButtons}>
                            {saveButton}
                        </div>
                    </div>

                </div>
                
            </div>
            {replies}

            {replyMode?<AddComment replyTo={{commentId:userComment.id, userName:commenter.username}} onSend={toggleReply}></AddComment>:null}
        </div>
    )
}
