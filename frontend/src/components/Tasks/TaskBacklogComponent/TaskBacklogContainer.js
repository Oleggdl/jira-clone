import React, {useContext, useEffect} from 'react'
import TaskBacklogComponent from "./TaskBacklogComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {getSprints} from "../../../redux/sprints-reducer"
import {AuthContext} from "../../../context/AuthContext"

const TaskBacklogContainer = props => {

    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }


    useEffect(() => {
        props.getSprints(headers)
    }, [])

    return (
        <>
            <TaskBacklogComponent task={props.task} currentProject={props.currentProject}/>
        </>
    )
}

const mapStateToProps = state => ({
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {getSprints})
)(TaskBacklogContainer)
