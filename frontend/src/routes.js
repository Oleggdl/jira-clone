import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom"
import KanbanContainer from "./components/Projects/KanbanProject/KanbanContainer"
import ScrumContainer from "./components/Projects/ScrumProject/ScrumContainer"
import AuthContainer from "./components/common/AuthComponent/AuthContainer"
import CreateProjectContainer from "./components/Projects/CreateProject/CreateProjectContainer"
import AllProjectsContainer from "./components/Projects/AllProjects/AllProjectsContainer"
import CreateTaskContainer from "./components/Tasks/CreateTask/CreateTaskContainer"


export const useRoutes = isAuthenticated => {

    if (isAuthenticated) {
        return (
            <Routes>
                {/*<Route path={'/'} exact element={<ScrumContainer/>}/>*/}
                <Route path='kanban/*' element={<KanbanContainer/>}/>
                <Route path='scrum/*' element={<ScrumContainer/>}/>
                <Route path='create_project' element={<CreateProjectContainer/>}/>
                <Route path='all_projects' element={<AllProjectsContainer/>}/>
                <Route path='create_task' element={<CreateTaskContainer/>}/>
            </Routes>

        )
    }
    return (
        <Routes>
            <Route path='/' element={<AuthContainer/>}/>
            <Route path="/*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}
