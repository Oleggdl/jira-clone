import React, {useContext, useEffect, useState} from 'react'
import BoardComponent from "./BoardComponent"
import {TaskContext} from "../../../context/TaskContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {getColumns, createColumn} from "../../../redux/scrum/columns-reducer"
import {AuthContext} from "../../../context/AuthContext"

const BoardContainer = (props) => {

    const columnName = 'Column name'

    const [isTaskInfo, setIsTaskInfo] = useState(false)

    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {
        if (!!props.currentSprint) {
            props.getColumns(props.currentSprint?.id, headers)
        }
    }, [])


    const createColumnHandler = () => {
        props.createColumn({column_name: `${columnName}`}, props.currentSprint?.id, headers)
    }

    return (
        <>
            <TaskContext.Provider value={{isTaskInfo, setIsTaskInfo}}>
                <BoardComponent isTaskInfo={isTaskInfo} columns={props.columns}
                                createColumnHandler={createColumnHandler} currentSprint={props.currentSprint}/>
            </TaskContext.Provider>
        </>
    )
}

const mapStateToProps = (state) => ({
    columns: state.columnsReducer.columns,
    currentSprint: state.sprintsReducer.currentSprint
})

export default compose(
    connect(mapStateToProps, {getColumns, createColumn})
)(BoardContainer)
