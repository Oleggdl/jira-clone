import React from 'react'
import SideBarComponent from "./SideBarComponent"
import {compose} from "redux"
import {connect} from "react-redux"

const SideBarContainer = props => {

    console.log(props.currentProject)

    return (
        <>
            <SideBarComponent currentProject={props.currentProject.scrum_project}/>
        </>
    )
}

const mapStateToProps = state => ({
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {})
)(SideBarContainer)
