import {applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware from "redux-thunk"
import projectsReducer from "./projects-reducer"
import tasksReducer from "./tasks-reducer"
import sprintsReducer from "./tasks-reducer"
import columnsReducer from "./columns-reducer"
import commentsScrumReducer from "./commentsScrum-reducer"

let reducers = combineReducers({
    projectsReducer: projectsReducer,
    tasksReducer: tasksReducer,
    sprintsReducer: sprintsReducer,
    columnsReducer: columnsReducer,
    commentsScrumReducer: commentsScrumReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store
