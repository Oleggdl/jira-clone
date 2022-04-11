import React from 'react'
import ColumnContainer from "../BoardColumn/ColumnContainer"
import './Board.scss'
import TaskInfoContainer from "../../Tasks/TaskInfo/TaskInfoContainer"
import Search from "antd/es/input/Search"
import {PlusSquareOutlined} from "@ant-design/icons"

const BoardComponent = ({isTaskInfo, columns, createColumnHandler, currentSprint}) => {

    return (
        <>
            <div className="board-container">
                <div className="project-path">
                    <span className="project-text">Projects</span>
                    <span> / </span>
                    <span className="project-text">Project name</span>
                </div>
                <h2>Board Name</h2>
                <div className="search-tasks-container" style={{width: "320px"}}>
                    <Search/>
                </div>
                {currentSprint ? <div className="columns-container">
                    {columns.map((column) => <ColumnContainer key={column.id} column={column}/>)}
                    <button onClick={createColumnHandler} className="button-add-column">
                        <PlusSquareOutlined/>
                    </button>
                </div> : <div>
                    <h2 className="empty-board">No sprint started</h2>
                </div>}
            </div>
            {isTaskInfo && <TaskInfoContainer/>}
        </>
    )
}

export default BoardComponent
