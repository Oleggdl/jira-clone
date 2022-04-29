import React from 'react'
import './Column.scss'
import ColumnList from "./ColumnListComponents";

const ColumnComponent = ({
                             column, settingsColumnHandler, isSettings, isSettingsActive, settingsRef,
                             deleteColumnHandler, taskSprintsForColumn, title, tasks
                         }) => {
    return (
        <>
            <div className="column-container">
                <div className="column-title">
                    <h4>{column.column_name}</h4>
                </div>
                <div className="column-task-container">
                    <ColumnList listId={title}
                                listType="SPRINT"
                                tasks={tasks}
                                column={column}
                    />
                    {/*{!!taskSprintsForColumn ? taskSprintsForColumn.map(taskSprintForColumn => {*/}
                    {/*        return taskSprintForColumn.id === column.id*/}
                    {/*            ? (taskSprintForColumn.taskSprintForColumn.map(ts =>*/}
                    {/*                <TaskBoardContainer key={ts.id} taskSprint={ts}/>))*/}
                    {/*            : false*/}
                    {/*    })*/}
                    {/*    : null}*/}
                </div>
            </div>
        </>
    )
}

export default ColumnComponent

