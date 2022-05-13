import React from 'react'
import ColumnContainer from "../BoardColumn/ColumnContainer"
import './Board.scss'
import TaskInfoContainer from "../../Tasks/TaskInfo/TaskInfoContainer"
import {NavLink} from "react-router-dom"
import {DragDropContext} from "react-beautiful-dnd"
import {Button} from "antd";
import CompleteSprintContainer from "../../Backlog/SprintComponent/CompelteSprintWindow/CompleteSprintContainer";

const BoardComponent = ({
                            isTaskInfo, columns, currentSprint, currentProject, onDragEnd, columnsMap, text,
                            setCompleteWindow, isCompleteWindow
                        }) => {

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
                        />)}
                </div>
                : <div>
                    <h2 className="empty-board">{text("boardComponent.noSprint")}</h2>
                </div>}
        </div>
    )

    return (
        <>
            {isCompleteWindow &&
                <CompleteSprintContainer text={text} setCompleteWindow={setCompleteWindow} columnsMap={columnsMap}/>}
            <div className="board-container">
                <div className="project-path">
                    <span className="project-text"><NavLink
                        to="/all_projects">{text("boardComponent.projects")}</NavLink></span>
                    <span> / </span>
                    <span>{currentProject?.scrum_project.project_name}</span>
                </div>
                {currentProject.user_role.id === 1 && !!currentSprint? <div className="complete-board-btn-container">
                    <Button className="complete-sprint-board-btn" type="primary"
                            onClick={() => setCompleteWindow(true)}>{text("sprintComponent.complete")}</Button>
                </div> : false}
                <h2>{currentSprint ? currentSprint.sprint_name : `${text("boardComponent.boardName")}`}</h2>
                {/*<div className="search-tasks-container" style={{width: "320px"}}></div>*/}
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
