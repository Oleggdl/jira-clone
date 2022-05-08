import React, {useContext} from 'react'
import InviteColleagueComponent from "./InviteColleagueComponent"
import {useForm} from "antd/es/form/Form"
import {compose} from "redux"
import {connect} from "react-redux"
import {addColleague} from "../../../redux/email-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {getUsersOnProject} from "../../../redux/tasks-reducer"

const InviteColleagueContainer = props => {

    const [form] = useForm()

    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const handleSubmit = values => {
        props.addColleague({
            emailTo: values.email,
            projectId: JSON.parse(values.project).id,
            projectName: JSON.parse(values.project).project_name,
            userName: props.currentUser.username
        }, props.currentUser.email, headers)
        form.resetFields()
        props.setIsInviteColleague(false)
    }

    const setProjectHandler = (id) => {
        props.getUsersOnProject(id, headers)
    }

    const onReset = () => {
        form.resetFields()
        props.setIsInviteColleague(false)
    }

    return (
        <>
            <InviteColleagueComponent form={form} handleSubmit={handleSubmit} onReset={onReset}
                                      setProjectHandler={setProjectHandler} projects={props.projects}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentProject: state.projectsReducer.currentProject,
    currentUser: state.userReducer.currentUser,
    projects: state.projectsReducer.projects,
})

export default compose(
    connect(mapStateToProps, {addColleague, getUsersOnProject})
)(InviteColleagueContainer)
