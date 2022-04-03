import React from 'react'
import './Backlog.scss'
import SprintContainer from "../SprintComponent/SprintContainer"
import BacklogElementContainer from "../BacklogElement/BacklogElementContainer"
import Search from "antd/es/input/Search"
import TaskInfoContainer from "../../Tasks/TaskInfo/TaskInfoContainer";

const BacklogComponent = ({sprints, isTaskInfo}) => {


    return (
        <>
            <div className="backlog-container">
                <div className="project-path">
                    <span className="project-text">Projects</span>
                    <span> / </span>
                    <span className="project-text">Project name</span>
                </div>
                <h2>Backlog</h2>
                <div className="search-tasks-container" style={{width: "320px"}}>
                    <Search/>
                </div>
                {sprints && sprints.map((sprint, index) =>
                    <SprintContainer key={sprint.id} sprint={sprint} index={index}/>)}
                <BacklogElementContainer/>
            </div>
            {isTaskInfo && <TaskInfoContainer/>}
        </>
    )
}

export default BacklogComponent
