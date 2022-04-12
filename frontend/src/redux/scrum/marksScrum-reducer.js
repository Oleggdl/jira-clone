import {marksAPI} from "../../api/api";

const GET_MARKS_SCRUM = 'GET_MARKS_SCRUM'


let initialState = {
    marksScrum: []
}

const marksScrumReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_MARKS_SCRUM: {
            return {
                ...state,
                marksScrum: action.marksScrum
            }
        }

        default:
            return state
    }
}


export const getMarksScrumActionCreator = marksScrum => ({type: GET_MARKS_SCRUM, marksScrum})

export const createMarksScrum = (data, taskId, authorization) => {

    return async dispatch => {
        const responsePost = await marksAPI.createMark(data, authorization)
        const responsePut = await marksAPI.uniteMarkTask(responsePost.data.id, taskId, authorization)

        const response = await marksAPI.getMarkScrumForTask(taskId, authorization)
        dispatch(getMarksScrumActionCreator(response.data))
    }
}

export const getMarksScrum = (taskId, authorization) => {

    return async dispatch => {
        const response = await marksAPI.getMarkScrumForTask(taskId, authorization)
        dispatch(getMarksScrumActionCreator(response.data))
    }
}

export const deleteMarksScrum = (id, taskId, authorization) => {

    return async dispatch => {
        const responseDel = await marksAPI.deleteMarkScrum(id, authorization)
        const response = await marksAPI.getMarkScrumForTask(taskId, authorization)
        dispatch(getMarksScrumActionCreator(response.data))
        dispatch(getMarksScrumActionCreator(response.data))
    }
}

export default marksScrumReducer
