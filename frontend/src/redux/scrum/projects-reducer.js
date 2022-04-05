import {projectsAPI, userScrumProjectAPI} from "../../api/api"

const GET_PROJECTS = 'GET_PROJECTS'
const GET_CURRENT_PROJECT = 'GET_CURRENT_PROJECT'
const GET_PROJECT_DATA = 'GET_PROJECT_DATA'

let initialState = {
    projects: [],
    currentProject: {},
    projectData: {}
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

        case GET_PROJECT_DATA: {
            return {
                ...state,
                projectData: action.projectData
            }
        }

        default:
            return state
    }
}


export const getProjectsActionCreator = projects => ({type: GET_PROJECTS, projects})
export const getCurrentProjectActionCreator = project => ({type: GET_CURRENT_PROJECT, project})
export const getProjectDataActionCreator = projectData => ({type: GET_PROJECT_DATA, projectData})

export const getProjects = (userId, authorization) => {

    return async dispatch => {
        const response = await userScrumProjectAPI.getUserScrumProject(userId, authorization)
        dispatch(getProjectsActionCreator(response.data))
    }
}

export const searchProject = (query, userId, authorization) => {

    return async dispatch => {
        const response = await projectsAPI.searchProjects(query, userId, authorization)
        dispatch(getProjectsActionCreator(response.data))
    }
}

export const createProject = (data, userId, userRoleId, authorization) => {

    return async dispatch => {
        const response = await projectsAPI.createProject(data, authorization)
        const responsePost = await userScrumProjectAPI.createUserScrumProject({}, authorization)
        const responsePut = await userScrumProjectAPI.putUserScrumProject(
            responsePost.data.id, userId, response.data.id, userRoleId, authorization)
    }
}

export const getCurrentProject = project => {

    return async dispatch => {
        dispatch(getCurrentProjectActionCreator(project))
    }
}

export const getProjectById = (id, authorization) => {

    return async dispatch => {
        const response = await projectsAPI.getProjectById(id, authorization)
        dispatch(getProjectDataActionCreator(response.data))
    }
}

export const updateProject = (id, userScrumId, data, authorization) => {

    return async dispatch => {
        const responsePut = await projectsAPI.updateProject(id, data, authorization)
        const response = await projectsAPI.getProjectById(userScrumId, authorization)
        dispatch(getProjectDataActionCreator(response.data))
    }
}


export default projectsReducer
