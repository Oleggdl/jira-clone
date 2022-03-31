import React from 'react'
import BacklogComponent from "./BacklogComponent"
import {compose} from "redux"
import {connect} from "react-redux"

const BacklogContainer = props => {



    return (
        <>
            <BacklogComponent sprints={props.sprints}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    sprints: state.sprintsReducer.sprints
})

export default compose(
    connect(mapStateToProps, {})
)(BacklogContainer)
