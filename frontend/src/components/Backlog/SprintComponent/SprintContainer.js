import React from 'react'
import SprintComponent from "./SprintComponent"
import {compose} from "redux"
import {connect} from "react-redux"

const SprintContainer = props => {


    return (
        <>
            <SprintComponent sprint={props.sprint} index={props.index}/>
        </>
    )
}

export default compose(
    connect(null, {})
)(SprintContainer)
