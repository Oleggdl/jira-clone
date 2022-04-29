import React from 'react'
import ColumnContainer from "../BoardColumn/ColumnContainer"
import './Board.scss'
import TaskInfoContainer from "../../Tasks/TaskInfo/TaskInfoContainer"
import {NavLink} from "react-router-dom"
import {DragDropContext} from "react-beautiful-dnd"

const BoardComponent = ({isTaskInfo, columns, currentSprint, currentProject, onDragEnd, columnsMap}) => {

    const board = (
        <div>
            {currentSprint
                ? <div className="columns-container">
                    {columns.sort((a, b) => a.id - b.id).map((column, index) =>
                        <ColumnContainer key={column.id}
                                         column={column}
                                         index={index}
                                         title={column.column_name}
                                         tasks={columnsMap[`${column.column_name},${column.id}`]}
                            // updateTaskSprints={updateTaskSprints}
                            // backlogForProjectSprint={backlogForProjectSprint}
                            // setBacklogForProjectSprint={setBacklogForProjectSprint}
                        />)}
                </div>
                : <div>
                    <h2 className="empty-board">No sprint started</h2>
                </div>}
        </div>
    )

    return (
        <>
            <div className="board-container">
                <div className="project-path">
                    <span className="project-text"><NavLink to="/all_projects">Projects</NavLink></span>
                    <span> / </span>
                    <span>{currentProject?.scrum_project.project_name}</span>
                </div>
                <h2>{currentSprint ? currentSprint.sprint_name : 'Board Name'}</h2>
                <div className="search-tasks-container" style={{width: "320px"}}>
                </div>
                <React.Fragment>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div>{board}</div>
                    </DragDropContext>
                </React.Fragment>
            </div>
            {isTaskInfo && <TaskInfoContainer/>}
        </>
    )
}

export default BoardComponent
