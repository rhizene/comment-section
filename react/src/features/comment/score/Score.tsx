import { useState } from "react";
import styles from './Score.module.scss';
import { useAppDispatch } from "app/hooks";
import { downvoteComment, sortComments, upvoteComment } from "../commentSlice";

type ScoreParams = {
    commentId:number
    score:number
}

export function Score(params:ScoreParams) {
    const dispatch = useAppDispatch()
    const handleSort = ()=>dispatch(sortComments())
    const upvoteScore = ()=>dispatch(upvoteComment(params.commentId))
        .then(handleSort);
    const downvoteScore = ()=>dispatch(downvoteComment(params.commentId))
        .then(handleSort);

    
    
    return (
        <div className={styles.score}>
            <button className='borderless' onClick={upvoteScore}>+</button>
                {params.score}
            <button className='borderless' onClick={downvoteScore}>-</button>
        </div>
    )
}