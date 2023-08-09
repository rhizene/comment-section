import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Score } from './score/Score';
import { faPencil, faShare } from '@fortawesome/free-solid-svg-icons';

export function Comment() {
    const isOwnComment = false;
    const actionButton = isOwnComment?
    <button> <FontAwesomeIcon icon={faPencil}/> Edit </button>
    : <button> <FontAwesomeIcon icon={faShare}/> Share </button>
    
    return (
        <div className='comment-box'>
            <Score  />

            {actionButton}
            
        </div>
    )
}