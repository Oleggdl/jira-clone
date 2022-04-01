import {backlogAPI} from "../../api/api"

const GET_BACKLOG_ELEMENTS = 'GET_BACKLOG_ELEMENTS'

let initialState = {
    backlogElements: []
}

const backlogReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_BACKLOG_ELEMENTS: {
            return {
                ...state,
                backlogElements: action.backlogElements
            }
        }

        default:
            return state
    }
}


export const getBacklogElementsActionCreator = backlogElements => ({type: GET_BACKLOG_ELEMENTS, backlogElements})

export const getBacklogElement = (authorization) => {

    return async dispatch => {
        const response = await backlogAPI.getBacklogElements(authorization)
        dispatch(getBacklogElementsActionCreator(response.data))
    }
}

export const createBacklogElement = (taskId, projectId, authorization) => {

    return async dispatch => {
        const responsePost = await backlogAPI.createBacklogElement({}, authorization)
        const responsePut =
            await backlogAPI.uniteBacklogProjectTask(responsePost.data.id, taskId, projectId, authorization)
    }
}



export default backlogReducer
