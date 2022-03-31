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
        props.getColumns(headers)
    }, [])


    const createColumnHandler = () => {
        props.createColumn({column_name: `${columnName}`}, headers)
    }

    return (
        <>
            <TaskContext.Provider value={{isTaskInfo, setIsTaskInfo}}>
                <BoardComponent isTaskInfo={isTaskInfo} columns={props.columns}
                                createColumnHandler={createColumnHandler}/>
            </TaskContext.Provider>
        </>
    )
}

const mapStateToProps = (state) => ({
    columns: state.columnsReducer.columns
})

export default compose(
    connect(mapStateToProps, {getColumns, createColumn})
)(BoardContainer)
