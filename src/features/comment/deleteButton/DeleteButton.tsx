import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from 'app/hooks';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteComment } from '../commentSlice';

type DeleteButtonParams = {
    id: number,
    repliedFrom?:number,
};

export function DeleteButton({id, repliedFrom}:DeleteButtonParams) {
    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);
    const closeDialog = () => setShow(false);
    const openDialog = () => setShow(true);

    const handleDeleteComment = ()=>{
        dispatch(deleteComment({id, repliedFrom}))
            .then(closeDialog);
    }
    
    return (
        <>
            <button className='borderless danger' onClick={openDialog}>
                <FontAwesomeIcon icon={faTrash} />
                Delete
            </button>
            <Modal show={show} onHide={closeDialog} centered>
                <Modal.Header>
                <Modal.Title>Delete Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this comment? This will remove the comment and can't be undone</Modal.Body>
                <Modal.Footer className='justify-center'>
                    <Button variant='secondary' onClick={closeDialog} autoFocus>
                        NO, CANCEL
                    </Button>
                    <Button variant="danger white" onClick={handleDeleteComment}>
                        YES, DELETE
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
