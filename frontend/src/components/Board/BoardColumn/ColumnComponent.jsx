import React from 'react'
import './Column.scss'
import TaskBoardContainer from "../../Tasks/TaskBoardComponent/TaskBoardContainer"


const ColumnComponent = ({
                             column, settingsColumnHandler, isSettings, isSettingsActive, settingsRef,
                             deleteColumnHandler, taskSprintsForColumn
                         }) => {


    return (
        <>
            <div className="column-container">
                <div className="column-title">
                    <button onClick={() => console.log(taskSprintsForColumn)}>Test</button>
                    <h4>{column.column_name}</h4>
                    <button ref={settingsRef} className={`column-component-settings ${isSettingsActive}`}
                            onClick={settingsColumnHandler}>...
                    </button>
                    {isSettings && <div className="settings-window">
                        <button>Set column limit</button>
                        <button onClick={() => deleteColumnHandler(column.id)}>Delete</button>
                    </div>}
                </div>

                <div className="column-task-container">
                    {!!taskSprintsForColumn ? taskSprintsForColumn.map(taskSprintForColumn => {
                            if (taskSprintForColumn.id === column.id) {

                                taskSprintForColumn.taskSprintForColumn.map(ts =>
                                    <TaskBoardContainer key={ts.id}
                                                        taskSprint={ts.task_scrum}/>)
                            }
                        })
                        : null}
                </div>
            </div>
        </>
    )
}

export default ColumnComponent
