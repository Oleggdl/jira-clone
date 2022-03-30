import {projectsAPI} from "../api/api"

const GET_PROJECTS = 'GET_PROJECTS'

let initialState = {
    projects: []
}

const projectsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_PROJECTS: {
            return {
                ...state,
                projects: action.projects
            }
        }

        default:
            return state
    }
}


export const getProjectsActionCreator = (projects) => ({type: GET_PROJECTS, projects})

export const getProjects = (authorization) => {

    return async dispatch => {
        const response = await projectsAPI.getProjects(authorization)
        dispatch(getProjectsActionCreator(response.data))
    }
}

export const createProject = (data, authorization) => {

    return async dispatch => {
        const response = await projectsAPI.createProject(data, authorization)
    }
}

export default projectsReducer
