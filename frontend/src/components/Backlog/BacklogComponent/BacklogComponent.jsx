import React from 'react'
import './Backlog.scss'
import TaskInfoContainer from "../../Tasks/TaskInfo/TaskInfoContainer"
import {DragDropContext} from "react-beautiful-dnd"
import {NavLink} from "react-router-dom"
import SprintContainer from "../SprintComponent/SprintContainer"
import BacklogElementContainer from "../BacklogElement/BacklogElementContainer"

const BacklogComponent = ({
                              isTaskInfo, setBacklogForProject, onDragEnd,
                              setBacklogForProjectSprint, backlogForProjectSprint, currentProject,
                              columns, sprints, updateTaskSprints, backlogForProject
                          }) => {

    const board = (
        <div>
            {sprints && sprints.sort((a, b) => a.id - b.id).map((sprint, index) => (
                <SprintContainer
                    key={sprint.sprint_name}
                    index={index}
                    title={sprint.sprint_name}
                    tasks={columns[sprint.sprint_name]}
                    sprint={sprint}
                    updateTaskSprints={updateTaskSprints}
                    backlogForProjectSprint={backlogForProjectSprint}
                    setBacklogForProjectSprint={setBacklogForProjectSprint}
                />
            ))}
            <BacklogElementContainer
                backlogForProject={backlogForProject}
                setBacklogForProject={setBacklogForProject}
                title={'Backlog'}
                tasks={columns['Backlog']}
                updateTaskSprints={updateTaskSprints}
                backlogForProjectSprint={backlogForProjectSprint}
                setBacklogForProjectSprint={setBacklogForProjectSprint}
            />
        </div>
    )

    return (
        <>
            <div className="backlog-container">
                <div className="project-path">
                    <span className="project-text"><NavLink to="/all_projects">Projects</NavLink></span>
                    <span> / </span>
                    <span>{currentProject?.scrum_project.project_name}</span>
                </div>
                <h2>Backlog</h2>
                <div className="search-tasks-container" style={{width: "320px"}}>
                </div>
                <React.Fragment>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div>{board}</div>
                    </DragDropContext>
                </React.Fragment>
            </div>
            {isTaskInfo && <TaskInfoContainer setBacklogForProject={setBacklogForProject}
                                              updateTaskSprints={updateTaskSprints}/>}
        </>
    )
}

export default BacklogComponent
