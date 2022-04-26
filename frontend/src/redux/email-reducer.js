import {emailAPI} from "../api/api"

let initialState = {}

const emailReducer = (state = initialState, action) => {

    switch (action.type) {

        default:
            return state
    }
}


export const addColleague = (data, authorization) => {

    return async dispatch => {
        const response = await emailAPI.addColleague(data, authorization)
    }
}


export default emailReducer
