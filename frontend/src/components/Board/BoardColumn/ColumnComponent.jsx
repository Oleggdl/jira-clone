import React from 'react'
import './Column.scss'
import ColumnList from "./ColumnListComponents"

const ColumnComponent = ({column, title, tasks}) => {
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
                </div>
            </div>
        </>
    )
}

export default ColumnComponent

