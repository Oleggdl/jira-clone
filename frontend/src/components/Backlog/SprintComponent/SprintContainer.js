import React from 'react'
import SprintComponent from "./SprintComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {createSprint} from "../../../redux/sprints-reducer"

const SprintContainer = () => {


    return (
        <>
            <SprintComponent/>
        </>
    )
}

const mapStateToProps = (state) => ({
    sprints: state.sprintsReducer.sprints
})

export default compose(
    connect(mapStateToProps, {createSprint})
)(SprintContainer)
