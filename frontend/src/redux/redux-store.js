import {applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware from "redux-thunk"
import projectsReducer from "./scrum/projects-reducer"
import tasksReducer from "./scrum/tasks-reducer"
import sprintsReducer from "./scrum/sprints-reducer"
import columnsReducer from "./scrum/columns-reducer"
import commentsScrumReducer from "./scrum/commentsScrum-reducer"
import userReducer from "./scrum/users-reducer"
import backlogReducer from "./scrum/backlog-reducer"

let reducers = combineReducers({
    projectsReducer: projectsReducer,
    tasksReducer: tasksReducer,
    sprintsReducer: sprintsReducer,
    columnsReducer: columnsReducer,
    commentsScrumReducer: commentsScrumReducer,
    userReducer: userReducer,
    backlogReducer: backlogReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store
