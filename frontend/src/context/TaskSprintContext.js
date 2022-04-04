import {createContext} from "react"

function nullFunc() {}

export const TaskSprintContext = createContext({
    setCurrentSprint: nullFunc(),
    setCurrentBacklog: nullFunc(),
    setCurrentTask: nullFunc()
})
