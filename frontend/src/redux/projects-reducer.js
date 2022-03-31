import {projectsAPI} from "../api/api"

const GET_PROJECTS = 'GET_PROJECTS'
const GET_CURRENT_PROJECT = 'GET_CURRENT_PROJECT'

let initialState = {
    projects: [],
    currentProject: {}
}

const projectsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_PROJECTS: {
            return {
                ...state,
                projects: action.projects
            }
        }

        case GET_CURRENT_PROJECT: {
            return {
                ...state,
                currentProject: action.project
            }
        }

        default:
            return state
    }
}


export const getProjectsActionCreator = projects => ({type: GET_PROJECTS, projects})
export const getCurrentProjectActionCreator = project => ({type: GET_CURRENT_PROJECT, project})

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

export const getCurrentProject = project => {

    return async dispatch => {
        dispatch(getCurrentProjectActionCreator(project))
    }
}

export default projectsReducer
