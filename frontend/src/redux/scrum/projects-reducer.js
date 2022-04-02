import {projectsAPI, userScrumProjectAPI} from "../../api/api"

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

export const getProjects = (userId, authorization) => {

    return async dispatch => {
        const response = await userScrumProjectAPI.getUserScrumProject(userId, authorization)
        const arrayProjects = response.data.map(el => el.scrum_project)
        dispatch(getProjectsActionCreator(arrayProjects))
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

export default projectsReducer
