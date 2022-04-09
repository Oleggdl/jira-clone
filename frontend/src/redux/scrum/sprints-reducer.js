import {sprintsAPI} from "../../api/api"


const GET_SPRINTS = 'GET_SPRINTS'
const SET_CURRENT_SPRINT = 'SET_CURRENT_SPRINT'

let initialState = {
    sprints: [],
    currentSprint: null
}


const sprintsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SPRINTS: {
            return {
                ...state,
                sprints: action.sprints
            }
        }

        case SET_CURRENT_SPRINT: {
            return {
                ...state,
                currentSprint: action.currentSprint
            }
        }

        default:
            return state
    }
}


export const getSprintsActionCreator = sprints => ({type: GET_SPRINTS, sprints})
export const setCurrentSprintActionCreator = currentSprint => ({type: SET_CURRENT_SPRINT, currentSprint})

export const getSprints = (projectId, authorization) => {

    return async dispatch => {
        const response = await sprintsAPI.getSprints(projectId, authorization)
        dispatch(getSprintsActionCreator(response.data))
    }
}

export const createSprint = (projectId, authorization) => {

    return async dispatch => {
        const response = await sprintsAPI.createSprint({is_started: false}, authorization)
        const responsePut = await sprintsAPI.createSprintWithProject(response.data.id, projectId, authorization)
        const responseGet = await sprintsAPI.getSprints(projectId, authorization)
        dispatch(getSprintsActionCreator(responseGet.data))
    }
}

export const startSprint = (data, id, projectId, authorization) => {

    return async dispatch => {
        const response = await sprintsAPI.startSprint(data, id, authorization)
        const responseGet = await sprintsAPI.getSprints(projectId, authorization)
        dispatch(getSprintsActionCreator(responseGet.data))
    }
}

export const setCurrentSprint = (currentSprint) => {

    return async dispatch => {
        dispatch(setCurrentSprintActionCreator(currentSprint))
    }
}

export const getStartedSprint = (projectId, authorization) => {

    return async dispatch => {
        const response = await sprintsAPI.getStartedSprint(projectId, authorization)
        dispatch(setCurrentSprintActionCreator(response.data[0]))
    }
}

export const deleteSprint = (id, authorization) => {

    return async dispatch => {
        const response = await sprintsAPI.deleteSprint(id, authorization)

    }
}

export default sprintsReducer
