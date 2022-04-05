import React from 'react'
import './CommentElement.scss'
import {Button} from "antd"


const CommentElementComponent = ({
                                     comment, isConfirmWindow, deleteHandler, cancelHandler, confirmHandler
                                 }) => {

    return (
        <>
            <div className="comment-container">
                <div className="comments-user-logo"></div>
                <div>
                    <div className="author-name">
                        <h3>{comment.user_id.users.username}</h3>
                        <h5>{comment.create_date}</h5>
                    </div>
                    <p className="comment">{comment.content}</p>
                    <div className="comments-buttons">
                        <button>Change</button>
                        <button onClick={deleteHandler}>Delete</button>
                    </div>
                    {isConfirmWindow && <div className="confirm-window">
                        <h5>Delete this comment?</h5>
                        <Button className="primary-button" type="primary"
                                onClick={() => confirmHandler(comment.id)}>Confirm</Button>
                        <Button onClick={cancelHandler}>Cancel</Button>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default CommentElementComponent
