import { useAppDispatch, useAppSelector } from "app/hooks";
import { downvote, selectScore, upvote } from "./scoreSlice";

export function Score() {
    const {score} = useAppSelector(selectScore);
    const dispatch = useAppDispatch();
    const upvoteScore = ()=>dispatch(upvote());
    const downvoteScore = ()=>{ dispatch(downvote()) };

    
    
    return (
        <div className='score'>
            <button onClick={upvoteScore}>+</button>
                {score}
            <button onClick={downvoteScore}>-</button>
        </div>
    )
}