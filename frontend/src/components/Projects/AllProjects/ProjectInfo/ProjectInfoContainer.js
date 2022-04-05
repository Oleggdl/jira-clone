import React, {useContext} from 'react'
import {compose} from "redux"
import {connect} from "react-redux"
import {useForm} from "antd/es/form/Form"
import ProjectInfoComponent from "./ProjectInfoComponent"
import {AuthContext} from "../../../../context/AuthContext"
import {getProjectById, getProjects, updateProject} from "../../../../redux/scrum/projects-reducer";

const ProjectInfoContainer = props => {

    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const [form] = useForm()

    const onReset = () => {
        form.resetFields()
    }

    const handleSubmit = values => {
        props.updateProject(props.projectData.scrum_project.id, props.projectData.id, values, headers)
        props.getProjects(props.currentUser.id, headers)
        props.setIsActions(false)
        onReset()
    }

    const onCancel = () => {
        onReset()
        props.setIsActions(false)
        props.setIsDeleteModal(false)
        props.getProjects(props.currentUser.id, headers)
    }

    const onDeleteHandler = () => {
        !!props.isDeleteModal ? props.setIsDeleteModal(false) : props.setIsDeleteModal(true)
    }

    const onConfirmDelete = () => {

    }

    return (
        <>
            <ProjectInfoComponent projects={props.projects}
                                  onCancel={onCancel}
                                  handleSubmit={handleSubmit} projectWrapper={props.projectWrapper}
                                  onDeleteHandler={onDeleteHandler} isDeleteModal={props.isDeleteModal}
                                  setIsDeleteModal={props.setIsDeleteModal} onConfirmDelete={onConfirmDelete}
                                  projectData={props.projectData.scrum_project} projectDataAll={props.projectData}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    projects: state.projectsReducer.projects,
    projectData: state.projectsReducer.projectData,
    currentUser: state.userReducer.currentUser
})

export default compose(
    connect(mapStateToProps, {updateProject, getProjectById, getProjects})
)(ProjectInfoContainer)
