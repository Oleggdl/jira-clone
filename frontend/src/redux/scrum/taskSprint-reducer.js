import {taskSprintAPI} from "../../api/api"


const GET_TASK_SPRINTS = 'GET_TASK_SPRINTS'

let initialState = {
    taskSprints: []
}


const taskSprintReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_TASK_SPRINTS: {
            return {
                ...state,
                taskSprints: action.taskSprints
            }
        }

        default:
            return state
    }
}


export const getTaskSprintsActionCreator = taskSprints => ({type: GET_TASK_SPRINTS, taskSprints})

export const getTaskSprints = (sprintId, authorization) => {

    return async dispatch => {
        const response = await taskSprintAPI.getTaskSprints(sprintId, authorization)
        dispatch(getTaskSprintsActionCreator(response.data))
    }
}

export const createTaskSprint = (taskSprintId, sprintId, taskId, data, authorization) => {

    return async dispatch => {
        const response = await taskSprintAPI.createTaskSprint({}, authorization)
        const responsePut = await taskSprintAPI.createTaskSprintPut(response.data.id, sprintId, taskId, authorization)
        const responseGet = await taskSprintAPI.getTaskSprints(sprintId, authorization)
        dispatch(getTaskSprintsActionCreator(responseGet.data))
    }
}

export default taskSprintReducer
