import {tasksAPI} from "../../api/api"

const GET_TASKS = 'GET_TASKS'
const SET_CREATED_TASK_ID = 'SET_CREATED_TASK_ID'

let initialState = {
    tasks: [],
    createdTaskId: null
}

const tasksReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_TASKS: {
            return {
                ...state,
                tasks: action.tasks
            }
        }

        case SET_CREATED_TASK_ID: {
            return {
                ...state,
                createdTaskId: action.createdTaskId
            }
        }

        default:
            return state
    }
}


export const getTasksActionCreator = tasks => ({type: GET_TASKS, tasks})
export const setCreatedTaskIdActionCreator = createdTaskId => ({type: SET_CREATED_TASK_ID, createdTaskId})

export const getTasks = (authorization) => {

    return async dispatch => {
        const response = await tasksAPI.getTasks(authorization)
        dispatch(getTasksActionCreator(response.data))
    }
}

export const createTask = (data, authorization) => {

    return async dispatch => {
        const response = await tasksAPI.createTask(data, authorization)
        dispatch(setCreatedTaskIdActionCreator(response.data.id))
    }
}

export default tasksReducer
