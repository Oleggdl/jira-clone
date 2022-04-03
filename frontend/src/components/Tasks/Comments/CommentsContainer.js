import React, {useContext, useEffect, useRef, useState} from 'react'
import CommentsComponent from "./CommentsComponent"
import {useForm} from "antd/es/form/Form"
import {AuthContext} from "../../../context/AuthContext"
import {compose} from "redux";
import {connect} from "react-redux";
import {createColumn, getColumns} from "../../../redux/scrum/columns-reducer";
import {createCommentScrum, getCommentsScrum} from "../../../redux/scrum/commentsScrum-reducer";

const CommentsContainer = (props) => {

    const [form] = useForm()

    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const onReset = () => {
        form.resetFields()
        setIsTextAreaAddCommentFocus(false)
    }

    const handleSubmit = values => {
        props.createCommentScrum(values, headers)
        onReset()
    }

    const textAreaAddComment = useRef(null)
    const [isTextAreaAddCommentFocus, setIsTextAreaAddCommentFocus] = useState(false)

    useEffect(() => {
        textAreaAddComment.current.resizableTextArea.textArea.onfocus = function () {
            setIsTextAreaAddCommentFocus(true)
        }
    }, [textAreaAddComment, onReset])

    useEffect(() => {
        props.getCommentsScrum('taskId', headers)
    }, [])

    return (
        <>
            <CommentsComponent form={form} handleSubmit={handleSubmit} onReset={onReset}
                               textAreaAddComment={textAreaAddComment}
                               isTextAreaAddCommentFocus={isTextAreaAddCommentFocus}
                               commentsScrum={props.commentsScrum}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    commentsScrum: state.commentsScrumReducer.commentsScrum
})

export default compose(
    connect(mapStateToProps, {getCommentsScrum, createCommentScrum})
)(CommentsContainer)

