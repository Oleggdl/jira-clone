import React, {useContext, useEffect} from 'react'
import BacklogElementComponent from "./BacklogElementComponent"
import {compose} from "redux";
import {connect} from "react-redux";
import {getTasks} from "../../../redux/tasks-reducer"
import {AuthContext} from "../../../context/AuthContext";



const BacklogElementContainer = (props) => {

    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {
        props.getTasks(headers)
    }, [])
    return (
        <>
            <BacklogElementComponent tasks={props.tasks}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    tasks: state.tasksReducer.tasks
})

export default compose(
    connect(mapStateToProps, {getTasks})
)(BacklogElementContainer)
