import React from 'react'
import './Column.scss'
import TaskBoardContainer from "../../Tasks/TaskBoardComponent/TaskBoardContainer"


const ColumnComponent = ({columnName, settingsColumnHandler, isSettings, isSettingsActive, settingsRef}) => {


    return (
        <>
            <div className="column-container">
                <div className="column-title">
                    <h4>{columnName}</h4>
                    <button ref={settingsRef} className={`column-component-settings ${isSettingsActive}`}
                            onClick={settingsColumnHandler}>...
                    </button>
                    {isSettings && <div className="settings-window">
                        <button>Set column limit</button>
                        <button>Delete</button>
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
