import React from 'react'
import './Column.scss'
import TaskBoardContainer from "../../Tasks/TaskBoardComponent/TaskBoardContainer"


const ColumnComponent = ({
                             column, settingsColumnHandler, isSettings, isSettingsActive, settingsRef,
                             deleteColumnHandler
                         }) => {


    return (
        <>
            <div className="column-container">
                <div className="column-title">
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
                    <TaskBoardContainer/>
                    <TaskBoardContainer/>
                    <TaskBoardContainer/>
                </div>
            </div>
        </>
    )
}

export default ColumnComponent
