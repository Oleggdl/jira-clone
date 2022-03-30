import {tasksAPI} from "../api/api"

const GET_TASKS = 'GET_TASKS'

let initialState = {
    tasks: []
}

const tasksReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_TASKS: {
            return {
                ...state,
                tasks: action.tasks
            }
        }

        default:
            return state
    }
}


export const getTasksActionCreator = (tasks) => ({type: GET_TASKS, tasks})

export const getTasks = (authorization) => {

    return async dispatch => {
        const response = await tasksAPI.getTasks(authorization)
        dispatch(getTasksActionCreator(response.data))
    }
}

export const createTask = (data, authorization) => {

    return async dispatch => {
        const response = await tasksAPI.createTask(data, authorization)
    }
}

export default tasksReducer
