import React, {useContext} from 'react'
import SideBarComponent from "./SideBarComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {AuthContext} from "../../../context/AuthContext"
import {getSprints} from "../../../redux/scrum/sprints-reducer"

const SideBarContainer = props => {

    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const getSprints = () => {
        props.getSprints(props.currentProject.scrum_project.id, headers)
    }

    return (
        <>
            <SideBarComponent currentProject={props.currentProject.scrum_project} getSprints={getSprints}/>
        </>
    )
}

const mapStateToProps = state => ({
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {getSprints})
)(SideBarContainer)
