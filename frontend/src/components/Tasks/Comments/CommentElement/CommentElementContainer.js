import React, {useContext, useState} from 'react'
import CommentElementComponent from "./CommentElementComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {deleteCommentScrum, updateCommentScrum} from "../../../../redux/commentsScrum-reducer"
import {AuthContext} from "../../../../context/AuthContext"
import {useForm} from "antd/es/form/Form";


const CommentElementContainer = (props) => {

    const [form] = useForm()

    const [isConfirmWindow, setIsConfirmWindow] = useState(false)
    const [isChangeComment, setIsChangeComment] = useState(false)

    const deleteHandler = () => {
        setIsConfirmWindow(true)
    }

    const onReset = () => {
        form.resetFields()
        setIsChangeComment(false)
    }

    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const confirmHandler = (id) => {
        props.deleteCommentScrum(id, props.currentTask?.task_scrum ? props.currentTask?.task_scrum?.id
            : props.currentTask?.scrum_task_id?.id, headers)
        setIsConfirmWindow(false)
    }

    const cancelHandler = () => {
        setIsConfirmWindow(false)
    }

    const changeCommentHandler = () => {
        !!isChangeComment ? setIsChangeComment(false) : setIsChangeComment(true)
    }

    const onChangeComment = (id, values) => {
        props.updateCommentScrum(id, {
            content: values.content,
            is_changed: true
        }, props.currentTask?.task_scrum ? props.currentTask?.task_scrum?.id
            : props.currentTask?.scrum_task_id?.id, headers)
        onReset()
    }

    return (
        <>
            <CommentElementComponent comment={props.comment} isConfirmWindow={isConfirmWindow}
                                     deleteHandler={deleteHandler} cancelHandler={cancelHandler}
                                     confirmHandler={confirmHandler} changeCommentHandler={changeCommentHandler}
                                     isChangeComment={isChangeComment} setIsChangeComment={setIsChangeComment}
                                     form={form} onReset={onReset} onChangeComment={onChangeComment}/>
        </>
    )
}


const mapStateToProps = (state) => ({
    commentsScrum: state.commentsScrumReducer.commentsScrum,
    currentTask: state.tasksReducer.currentTask,
})

export default compose(
    connect(mapStateToProps, {deleteCommentScrum, updateCommentScrum})
)(CommentElementContainer)
