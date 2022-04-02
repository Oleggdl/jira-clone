import React, {useContext, useEffect} from 'react'
import AllProjectsComponent from "./AllProjectsComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {getProjects} from "../../../redux/scrum/projects-reducer"
import {AuthContext} from "../../../context/AuthContext"

const AllProjectsContainer = props => {

    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {
        props.getProjects(props.currentUser.id, headers)
    }, [])


    return (
        <>
            <AllProjectsComponent projects={props.projects}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    projects: state.projectsReducer.projects,
    currentUser: state.userReducer.currentUser,
})

export default compose(
    connect(mapStateToProps, {getProjects})
)(AllProjectsContainer)

