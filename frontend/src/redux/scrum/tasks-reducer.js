import {tasksAPI} from "../../api/api"

const GET_TASKS = 'GET_TASKS'
const SET_CREATED_TASK_ID = 'SET_CREATED_TASK_ID'
const SET_CURRENT_TASK = 'SET_CURRENT_TASK'

let initialState = {
    tasks: [],
    createdTaskId: null,
    currentTask: {}
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

        case SET_CURRENT_TASK: {
            return {
                ...state,
                currentTask: action.currentTask
            }
        }

        default:
            return state
    }
}


export const getTasksActionCreator = tasks => ({type: GET_TASKS, tasks})
export const setCreatedTaskIdActionCreator = createdTaskId => ({type: SET_CREATED_TASK_ID, createdTaskId})
export const setCurrentTaskIdActionCreator = currentTask => ({type: SET_CURRENT_TASK, currentTask})

export const getTasks = (authorization) => {

    return async dispatch => {
        const response = await tasksAPI.getTasks(authorization)
        dispatch(getTasksActionCreator(response.data))
    }
}

export const createTask = (data, authorization) => {

    return async dispatch => {
        const response = await tasksAPI.createTask(data, authorization)
        dispatch(setCreatedTaskIdActionCreator(response.data))
    }
}

export const setCurrentTask = (task) => {

    return async dispatch => {
        dispatch(setCurrentTaskIdActionCreator(task))
    }
}

export default tasksReducer
