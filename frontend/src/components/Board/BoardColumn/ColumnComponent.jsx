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
                    <h4>{column.column_name}</h4>
                </div>
                <div className="column-task-container">
                    {!!taskSprintsForColumn ? taskSprintsForColumn.map(taskSprintForColumn => {
                            return taskSprintForColumn.id === column.id
                                ? (taskSprintForColumn.taskSprintForColumn.map(ts =>
                                    <TaskBoardContainer key={ts.id} taskSprint={ts}/>))
                                : false
                        })
                        : null}
                </div>
            </div>
        </>
    )
}

export default ColumnComponent

