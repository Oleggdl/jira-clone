import {createContext} from "react"

function nullFunc() {}

export const TaskSprintContext = createContext({
    setCurrentSprintDnd: nullFunc(),
    setCurrentBacklogDnd: nullFunc(),
    setCurrentTaskDnd: nullFunc()
})
