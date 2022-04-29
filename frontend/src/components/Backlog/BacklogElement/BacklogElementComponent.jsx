import React from 'react'
import './BacklogElement.scss'
import SprintList from "../SprintComponent/SprintListComponents"

const BacklogElementComponent = ({
                                     backlogForProject, createSprintHandler, isInputVisible, taskInputRef,
                                     onKeyDown, onSetIsCreateTask, isCreateTask, tasks, title
                                 }) => {
    return (
        <>
            <div className="sprint-container">
                <div className="sprint-container-header">
                    <h4>Backlog</h4>
                    <div>(Tasks count: <span>{tasks?.length}</span>)</div>
                    <button className="create-sprint-button" onClick={createSprintHandler}>Create a sprint</button>
                </div>
                <SprintList
                    listId={title}
                    listType="SPRINT"
                    tasks={tasks}
                />
                <input className={`task-creations-input ${isInputVisible}`} ref={taskInputRef} onKeyDown={e => {
                    onKeyDown(e)
                }}/>
                {!isCreateTask &&
                    <button style={{display: "block"}} className="create-task-button" onMouseUp={() => {
                        onSetIsCreateTask()
                    }}>Create task</button>}
            </div>
        </>
    )
}

export default BacklogElementComponent
