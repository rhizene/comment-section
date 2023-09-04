import { useState } from "react";
import styles from './Score.module.scss';

type ScoreParams = {
    score:number
}

export function Score(params:ScoreParams) {
    const [score, setScore] = useState(params.score);
    const upvoteScore = ()=>setScore(score +1);
    const downvoteScore = ()=>setScore(score - 1);

    
    
    return (
        <div className={styles.score}>
            <button className='borderless' onClick={upvoteScore}>+</button>
                {score}
            <button className='borderless' onClick={downvoteScore}>-</button>
        </div>
    )
}