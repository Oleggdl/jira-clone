import {backlogAPI, tasksAPI} from "../../api/api"

const GET_BACKLOG_ELEMENTS = 'GET_BACKLOG_ELEMENTS'
const GET_BACKLOG_FOR_PROJECT = 'GET_BACKLOG_FOR_PROJECT'

let initialState = {
    backlogElements: [],
    backlogForProject: []
}

const backlogReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_BACKLOG_ELEMENTS: {
            return {
                ...state,
                backlogElements: action.backlogElements
            }
        }

        case GET_BACKLOG_FOR_PROJECT: {
            return {
                ...state,
                backlogForProject: action.backlogForProject
            }
        }

        default:
            return state
    }
}


export const getBacklogElementsActionCreator = backlogElements => ({type: GET_BACKLOG_ELEMENTS, backlogElements})
export const getBacklogForProjectActionCreator = backlogForProject => ({
    type: GET_BACKLOG_FOR_PROJECT,
    backlogForProject
})

export const getBacklogElement = (authorization) => {

    return async dispatch => {
        const response = await backlogAPI.getBacklogElements(authorization)
        dispatch(getBacklogElementsActionCreator(response.data))
    }
}

export const createBacklogElement = (data, projectId, authorization) => {

    return async dispatch => {
        const responseCreateTask = await tasksAPI.createTask(data, authorization)
        const responsePost = await backlogAPI.createBacklogElement({}, authorization)
        const responsePut =
            await backlogAPI.uniteBacklogProjectTask(responsePost.data.id, responseCreateTask.data.id, projectId, authorization)
        const response = await backlogAPI.getBacklogForProject(projectId, authorization)
        dispatch(getBacklogForProjectActionCreator(response.data))
    }
}

export const createBacklogElementFromSprint = (taskSprintId, taskId, projectId, authorization) => {

    return async dispatch => {
        const responseDel = await backlogAPI.deleteBacklogElement(taskSprintId, authorization)
        const responsePost = await backlogAPI.createBacklogElement({}, authorization)
        const responsePut =
            await backlogAPI.uniteBacklogProjectTask(responsePost.data.id, taskId, projectId, authorization)
        const response = await backlogAPI.getBacklogElements(authorization)
        dispatch(getBacklogElementsActionCreator(response.data))
    }
}

export const getBacklogForProject = (projectId, authorization) => {

    return async dispatch => {
        const response = await backlogAPI.getBacklogForProject(projectId, authorization)
        dispatch(getBacklogForProjectActionCreator(response.data))
    }
}


export default backlogReducer
