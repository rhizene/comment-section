import { faPencil, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, formatDistanceToNow } from 'date-fns';
import { UserComment } from 'models/userComment';
import styles from './Comment.module.scss';
import { Score } from './score/Score';

type CommentParams = {
    userComment:UserComment
}

export function Comment({userComment}:CommentParams) {
    const commenter = userComment.user;
    const userImage = commenter.image.png
    const isOwnComment = false;
    const commentSince = formatDistanceToNow(userComment.createdAt, {addSuffix: true}) 
    const commentDate = format(userComment.createdAt, 'MMMM d, yyyy hh:mm aa');

    const actionButton = isOwnComment?
    <button> <FontAwesomeIcon icon={faPencil} flip='horizontal'/> Edit </button>
    : <button> <FontAwesomeIcon icon={faShare} flip='horizontal'/> Reply </button>
    
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
                    
                    {actionButton}
                </div>
                
                <div className={styles.content}>
                    {userComment.content}
                </div>

            </div>
            
        </div>
    )
}