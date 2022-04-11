import React, {useContext, useEffect, useRef, useState} from 'react'
import DeleteProjectComponent from "./DeleteProjectComponent"
import {AuthContext} from "../../../context/AuthContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {deleteProject} from "../../../redux/scrum/projects-reducer"

const DeleteProjectContainer = props => {

    const deleteProjectWrapper = useRef()
    const [isDisabled, setIsDisabled] = useState(true)
    const [value, setValue] = useState('')

    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {
        window.addEventListener("click", function (event) {
            if (event.target === deleteProjectWrapper.current) {
                props.setIsDeleteModal(false)
            }
        })
        return window.removeEventListener("click", function (event) {
            if (event.target === deleteProjectWrapper.current) {
                props.setIsDeleteModal(false)
            }
        })
    }, [])

    useEffect(() => {
        if (value === props.projectData.project_name) {
            setIsDisabled(false)
        } else setIsDisabled(true)
    }, [value])

    const deleteProjectHandler = (event) => {
        event.preventDefault()
        props.deleteProject(props.projectData.id, props.currentUser.id, headers)
        props.setIsDeleteModal(false)
        props.setIsActions(false)
    }

    return (
        <>
            <DeleteProjectComponent deleteProjectWrapper={deleteProjectWrapper} isDisabled={isDisabled}
                                    projectData={props.projectData} value={value} setValue={setValue}
                                    deleteProjectHandler={deleteProjectHandler}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.userReducer.currentUser
})

export default compose(
    connect(mapStateToProps, {deleteProject})
)(DeleteProjectContainer)