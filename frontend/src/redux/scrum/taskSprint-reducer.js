import {backlogAPI, tasksAPI, taskSprintAPI} from "../../api/api"


const GET_TASK_SPRINTS = 'GET_TASK_SPRINTS'
const UNSET_TASK_SPRINT = 'UNSET_TASK_SPRINT'
const GET_TASK_SPRINT_FOR_COLUMN = 'GET_TASK_SPRINT_FOR_COLUMN'

let initialState = {
    taskSprints: [],
    taskSprintsForColumn: []
}


const taskSprintReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_TASK_SPRINTS: {
            return {
                ...state,
                taskSprints: [...state.taskSprints, {id: action.sprintId, taskSprint: action.taskSprints}]
            }
        }

        case UNSET_TASK_SPRINT: {
            return {
                ...state,
                taskSprints: []
            }
        }

        case GET_TASK_SPRINT_FOR_COLUMN: {
            return {
                ...state,
                taskSprintsForColumn: [...state.taskSprintsForColumn, {
                    id: action.columnId,
                    taskSprintForColumn: action.taskSprintsForColumn
                }]
            }
        }

        default:
            return state
    }
}


export const getTaskSprintsActionCreator = (taskSprints, sprintId) => ({
    type: GET_TASK_SPRINTS,
    taskSprints,
    sprintId
})

export const unsetTaskSprintsActionCreator = () => ({type: UNSET_TASK_SPRINT})
export const getTaskSprintForColumnActionCreator = (taskSprintsForColumn, columnId) => ({
    type: GET_TASK_SPRINT_FOR_COLUMN,
    taskSprintsForColumn,
    columnId
})

export const getTaskSprints = (sprintId, authorization) => {

    return async dispatch => {
        const response = await taskSprintAPI.getTaskSprints(sprintId, authorization)
        dispatch(getTaskSprintsActionCreator(response.data, sprintId))
    }
}

export const unsetTaskSprints = () => {

    return async dispatch => {
        dispatch(unsetTaskSprintsActionCreator())
    }
}

export const createTaskSprint = (sprintId, taskId, backlogIdEl, authorization) => {

    return async dispatch => {
        const responseDel = await backlogAPI.deleteBacklogElement(backlogIdEl, authorization)
        const response = await taskSprintAPI.createTaskSprint({}, authorization)
        const responsePut = await taskSprintAPI.createTaskSprintPut(response.data.id, sprintId, taskId, authorization)
        const responseGet = await taskSprintAPI.getTaskSprints(sprintId, authorization)
        dispatch(getTaskSprintsActionCreator(responseGet.data))
    }
}

export const createNewTaskSprint = (data, sprintId, creatorId, authorization) => {

    return async dispatch => {
        const responseCreateTask = await tasksAPI.createTask(data, authorization)
        const responseTaskPut =
            await tasksAPI.putTask(responseCreateTask.data.id, creatorId, creatorId, authorization)
        const response = await taskSprintAPI.createTaskSprint({}, authorization)
        const responsePut = await taskSprintAPI.createTaskSprintPut(response.data.id,
            sprintId, responseCreateTask.data.id, authorization)
        const responseGet = await taskSprintAPI.getTaskSprints(sprintId, authorization)
        dispatch(getTaskSprintsActionCreator(responseGet.data, sprintId))
    }
}

export const setTaskSprintColumn = (taskSprintId, columnId, authorization) => {

    return async dispatch => {
        const responseTaskSprint = await taskSprintAPI.startSprintColumn(taskSprintId, columnId, authorization)

    }

}

export const setTasksInSprints = (query, sprintId, authorization) => {

    return async dispatch => {
        const response = await taskSprintAPI.searchTask(query, sprintId, authorization)
        dispatch(getTaskSprintsActionCreator(response.data))
    }
}

export const searchTasksInSprints = (query, sprintId, authorization) => {

    // return async dispatch => {
    //     const response = await taskSprintAPI.searchTask(query, sprintId, authorization)
    //     dispatch(getTaskSprintsActionCreator(response.data))
    // }
}

export const getTaskSprintForColumn = (sprintId, columnId, authorization) => {

    return async dispatch => {
        const response = await taskSprintAPI.getTaskSprintForColumn(sprintId, columnId, authorization)
        dispatch(getTaskSprintForColumnActionCreator(response.data, columnId))
    }
}

export default taskSprintReducer
