import React, {useContext, useState} from 'react'
import CommentElementComponent from "./CommentElementComponent"
import {compose} from "redux";
import {connect} from "react-redux";
import {deleteCommentScrum} from "../../../../redux/scrum/commentsScrum-reducer"
import {AuthContext} from "../../../../context/AuthContext"


const CommentElementContainer = (props) => {

    const [isConfirmWindow, setIsConfirmWindow] = useState(false)

    const deleteHandler = () => {
        setIsConfirmWindow(true)
    }

    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const confirmHandler = (id) => {
        props.deleteCommentScrum(id, headers)
        setIsConfirmWindow(false)
    }

    const cancelHandler = () => {
        setIsConfirmWindow(false)
    }

    return (
        <>
            <CommentElementComponent comment={props.comment} isConfirmWindow={isConfirmWindow}
                                     deleteHandler={deleteHandler} cancelHandler={cancelHandler}
                                     confirmHandler={confirmHandler}/>
        </>
    )
}


const mapStateToProps = (state) => ({
    commentsScrum: state.commentsScrumReducer.commentsScrum
})

export default compose(
    connect(mapStateToProps, {deleteCommentScrum})
)(CommentElementContainer)
