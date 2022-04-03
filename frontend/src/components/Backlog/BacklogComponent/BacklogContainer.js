import React, {useState} from 'react'
import BacklogComponent from "./BacklogComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {TaskContext} from "../../../context/TaskContext"

const BacklogContainer = props => {

    const [isTaskInfo, setIsTaskInfo] = useState(false)

    return (
        <>
            <TaskContext.Provider value={{isTaskInfo, setIsTaskInfo}}>
                <BacklogComponent sprints={props.sprints} isTaskInfo={isTaskInfo}/>
            </TaskContext.Provider>
        </>
    )
}

const mapStateToProps = (state) => ({
    sprints: state.sprintsReducer.sprints
})

export default compose(
    connect(mapStateToProps, {})
)(BacklogContainer)
