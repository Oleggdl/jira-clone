import React from 'react'
import './CommentElement.scss'
import {Button, Form} from "antd"
import TextArea from "antd/es/input/TextArea"


const CommentElementComponent = ({
                                     comment, isConfirmWindow, deleteHandler, cancelHandler, confirmHandler,
                                     changeCommentHandler, isChangeComment, form, onReset, onChangeComment,
                                     currentUser
                                 }) => {

    return (
        <>
            <div className="comment-container">
                <div className="comments-user-logo">{currentUser.username[0]}</div>
                <div style={{width: "100%"}}>
                    <div className="author-name">
                        <h3>{comment.user_id.users.username}</h3>
                        <h5>{comment.create_date}</h5>
                        <p>{!!comment.is_changed ? 'Changed' : null}</p>
                    </div>
                    {!isChangeComment
                        ? <p className="comment">{comment.content}</p>
                        : <Form form={form} onFinish={values => onChangeComment(comment.id, values)} initialValues={
                            {content: comment.content}}>
                            <Form.Item>
                                <Form.Item
                                    name="content"
                                    rules={[{required: false}]}>
                                    <TextArea row={4} placeholder="Add a comment"/>
                                </Form.Item>
                                <Button type="primary" htmlType="submit" style={{width: "100px"}}>
                                    Submit
                                </Button>
                                <Button style={{marginLeft: "15px", width: "100px"}} onClick={onReset}>Cancel</Button>
                            </Form.Item>
                        </Form>}
                    <div className="comments-buttons">
                        <button onClick={changeCommentHandler}>Change</button>
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
