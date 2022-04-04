import React from 'react'
import './Backlog.scss'
import SprintContainer from "../SprintComponent/SprintContainer"
import BacklogElementContainer from "../BacklogElement/BacklogElementContainer"
import Search from "antd/es/input/Search"
import TaskInfoContainer from "../../Tasks/TaskInfo/TaskInfoContainer"
import {DragDropContext} from "react-beautiful-dnd"

const BacklogComponent = ({
                              sprints, isTaskInfo, backlogForProject, setBacklogForProject, onDragEnd,
                              setBacklogForProjectSprint, backlogForProjectSprint
                          }) => {

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

                <DragDropContext onDragEnd={onDragEnd}>
                    {sprints && sprints.map((sprint, index) =>
                        <SprintContainer sprint={sprint} index={index} key={sprint.id}
                                         backlogForProjectSprint={backlogForProjectSprint}
                                         setBacklogForProjectSprint={setBacklogForProjectSprint}/>)}


                    <BacklogElementContainer backlogForProject={backlogForProject}
                                             setBacklogForProject={setBacklogForProject}
                    />

                </DragDropContext>
            </div>
            {isTaskInfo && <TaskInfoContainer/>}
        </>
    )
}

export default BacklogComponent
