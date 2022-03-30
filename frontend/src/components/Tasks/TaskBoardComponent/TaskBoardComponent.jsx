import React from 'react'
import {EllipsisOutlined, SolutionOutlined} from "@ant-design/icons"
import './TaskBoard.scss'

const TaskBoardComponent = ({taskInfoHandler}) => {


    return (
        <>
            <button onClick={taskInfoHandler} className="task-component-container">
                <div className="task-component-settings"><EllipsisOutlined/></div>
                <div className="task-title">Task title</div>
                <div className="task-component-labels">Ready</div>
                <div className="task-component-key">
                    <SolutionOutlined/>
                    <div style={{}}>TST-7</div>
                </div>
            </button>
        </>
    )
}

export default TaskBoardComponent
