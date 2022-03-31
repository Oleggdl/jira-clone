import {columnsAPI, commentsScrumAPI} from "../api/api";
import {getCommentsScrumActionCreator} from "./commentsScrum-reducer";


const GET_COLUMNS = 'GET_COLUMNS'

let initialState = {
    columns: []
}

const columnsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_COLUMNS: {
            return {
                ...state,
                columns: action.columns
            }
        }

        default:
            return state
    }
}


export const getColumnsActionCreator = (columns) => ({type: GET_COLUMNS, columns})

export const getColumns = (authorization) => {

    return async dispatch => {
        const response = await columnsAPI.getColumns(authorization)
        dispatch(getColumnsActionCreator(response.data))
    }
}

export const createColumn = (data, authorization) => {

    return async dispatch => {
        const response = await columnsAPI.createColumn(data, authorization)
        const responseGetColumns = await columnsAPI.getColumns(authorization)
        dispatch(getColumnsActionCreator(responseGetColumns.data))
    }
}

export const deleteColumnScrum = (id, authorization) => {

    return async dispatch => {
        const response = await columnsAPI.deleteColumnScrum(id, authorization)
        const responseGetColumns = await columnsAPI.getColumns(authorization)
        dispatch(getColumnsActionCreator(responseGetColumns.data))

    }
}

export default columnsReducer
