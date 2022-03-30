import {sprintsAPI} from "../api/api"


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

export const getSprints = (authorization) => {

    return async dispatch => {
        const response = await sprintsAPI.getSprints(authorization)
        dispatch(getSprintsActionCreator(response.data))
    }
}

export const createSprint = (data, authorization) => {

    return async dispatch => {
        const response = await sprintsAPI.createSprint(data, authorization)
    }
}

export default sprintsReducer
