import React from 'react'
import SideBarComponent from "./SideBarComponent"
import {compose} from "redux"
import {connect} from "react-redux"

const SideBarContainer = props => {

    return (
        <>
            <SideBarComponent currentProject={props.currentProject}/>
        </>
    )
}

const mapStateToProps = state => ({
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {})
)(SideBarContainer)
