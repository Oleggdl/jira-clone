import {sprintsAPI} from "../../api/api"


const GET_SPRINTS = 'GET_SPRINTS'

let initialState = {
    sprints: []
}


const sprintsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SPRINTS: {
            return {
                ...state,
                sprints: action.sprints
            }
        }

        default:
            return state
    }
}


export const getSprintsActionCreator = sprints => ({type: GET_SPRINTS, sprints})

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

export default sprintsReducer
