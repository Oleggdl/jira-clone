import {commentsScrumAPI} from "../../api/api"


const GET_COMMENTS_SCRUM = 'GET_COMMENTS_SCRUM'
// const SET_COMMENT = 'SET_COMMENT'

let initialState = {
    commentsScrum: []
}

const commentsScrumReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_COMMENTS_SCRUM: {
            return {
                ...state,
                commentsScrum: action.commentsScrum
            }
        }

        default:
            return state
    }
}


export const getCommentsScrumActionCreator = commentsScrum => ({type: GET_COMMENTS_SCRUM, commentsScrum})

export const getCommentsScrum = (taskId, authorization) => {

    return async dispatch => {
        const response = await commentsScrumAPI.getCommentsScrum(taskId, authorization)
        dispatch(getCommentsScrumActionCreator(response.data))
    }
}

export const createCommentScrum = (data, authorization) => {

    return async dispatch => {
        const response = await commentsScrumAPI.createCommentScrum(data, authorization)
        const responseGetComments = await commentsScrumAPI.getCommentsScrum(authorization)
        dispatch(getCommentsScrumActionCreator(responseGetComments.data))
    }
}

export const deleteCommentScrum = (id, authorization) => {

    return async dispatch => {
        const response = await commentsScrumAPI.deleteCommentsScrum(id, authorization)
        const responseGetComments = await commentsScrumAPI.getCommentsScrum(authorization)
        dispatch(getCommentsScrumActionCreator(responseGetComments.data))

    }
}

export default commentsScrumReducer
