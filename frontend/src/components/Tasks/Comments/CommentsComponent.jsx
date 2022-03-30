import React, {useRef} from 'react'
import './Comments.scss'
import TextArea from "antd/es/input/TextArea"
import {Button, Form} from "antd"
import CommentElementContainer from "./CommentElement/CommentElementContainer";


const CommentsComponent = ({
                               form, handleSubmit, onReset, textAreaAddComment, isTextAreaAddCommentFocus,
                               commentsScrum
                           }) => {

    return (
        <>
            <div className="comments-container">
                <div className="form-add-comments">
                    <div className="comments-user-logo"></div>
                    <Form name="create_comment"
                          form={form}
                          initialValues={
                              {
                                  create_date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
                              }}
                          onFinish={values => handleSubmit(values)}
                          autoComplete="off">
                        <Form.Item
                            name="content"
                            rules={[{required: false}]}
                        >
                            <TextArea ref={textAreaAddComment} row={4} placeholder="Add a comment"/>
                        </Form.Item>
                        <Form.Item name="create_date" style={{height: 0, margin: 0}}> </Form.Item>
                        {isTextAreaAddCommentFocus && <Form.Item>
                            <Button type="primary" htmlType="submit" style={{width: "100px"}}>
                                Submit
                            </Button>
                            <Button style={{marginLeft: "15px", width: "100px"}} onClick={onReset}>Cancel</Button>
                        </Form.Item>}
                    </Form>
                </div>
                {commentsScrum.map(comment => <CommentElementContainer key={comment.id} comment={comment}/>).reverse()}
            </div>
        </>
    )
}

export default CommentsComponent
