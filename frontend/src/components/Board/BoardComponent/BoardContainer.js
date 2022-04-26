import React, {useContext, useEffect, useState} from 'react'
import BoardComponent from "./BoardComponent"
import {TaskContext} from "../../../context/TaskContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {getColumns} from "../../../redux/columns-reducer"
import {AuthContext} from "../../../context/AuthContext"

const BoardContainer = (props) => {

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

    return (
        <>
            <TaskContext.Provider value={{isTaskInfo, setIsTaskInfo}}>
                <BoardComponent isTaskInfo={isTaskInfo} columns={props.columns} currentSprint={props.currentSprint}
                                currentProject={props.currentProject}/>
            </TaskContext.Provider>
        </>
    )
}

const mapStateToProps = (state) => ({
    columns: state.columnsReducer.columns,
    currentSprint: state.sprintsReducer.currentSprint,
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {getColumns})
)(BoardContainer)
