import React, {useContext, useEffect, useRef, useState} from 'react'
import {NavbarComponent} from "./NavbarComponent"
import {useNavigate} from "react-router-dom"
import {AuthContext} from "../../../context/AuthContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {getCurrentProject, getFavoriteProjects, getProjects} from "../../../redux/scrum/projects-reducer"
import {getUser} from "../../../redux/scrum/users-reducer"
import {getStartedSprint} from "../../../redux/scrum/sprints-reducer";

const userName = 'userName'

const NavbarContainer = props => {

    const [isProjectsMenu, setIsProjectsMenu] = useState(false)
    const [isStaffMenu, setIsStaffMenu] = useState(false)

    const modalStaff = useRef()
    const modalStaffTitle = useRef()
    const buttonStaff = useRef()

    const modalProjects = useRef()
    const modalProjectsTitle = useRef()
    const buttonProjects = useRef()

    const history = useNavigate()
    const auth = useContext(AuthContext)

    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(userName))
        if (data && data.userName) {
            props.getUser(data.userName)
        }
    }, [])

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history('/')
    }

    const showProjectsMenu = () => {
        if (!!isProjectsMenu) {
            setIsProjectsMenu(false)
        } else {
            if (!!props.currentUser.id) {
                props.getProjects(props.currentUser.id, headers)
            }
            setIsProjectsMenu(true)
        }
    }

    const getFavoriteProjectHandler = () => {
        props.getFavoriteProjects(props.currentUser.id, headers)
    }

    useEffect(() => {
        window.addEventListener("click", function (event) {
            if (event.target !== buttonStaff.current && event.target !== modalStaff.current
                && event.target !== modalStaffTitle.current) {
                setIsStaffMenu(false)
            }
        })

        return window.removeEventListener("click", function (event) {
            if (event.target !== buttonStaff.current && event.target !== modalStaff.current
                && event.target !== modalStaffTitle.current) {
                setIsStaffMenu(false)
            }
        })
    })

    useEffect(() => {
        window.addEventListener("click", function (event) {
            if (event.target !== buttonProjects.current && event.target !== modalProjects.current
                && event.target !== modalProjectsTitle.current) {
                setIsProjectsMenu(false)
            }
        })

        return window.removeEventListener("click", function (event) {
            if (event.target !== buttonProjects.current && event.target !== modalProjects.current
                && event.target !== modalProjectsTitle.current) {
                setIsProjectsMenu(false)
            }
        })
    })

    const currentProjectHandler = project => {
        props.getCurrentProject(project)
    }

    const startedSprintHandler = () => {
        props.getStartedSprint(props.currentProject.scrum_project.id, headers)
    }

    return (
        <>
            <NavbarComponent isProjectsMenu={isProjectsMenu} isStaffMenu={isStaffMenu} setIsStaffMenu={setIsStaffMenu}
                             modalStaff={modalStaff} modalStaffTitle={modalStaffTitle} buttonStaff={buttonStaff}
                             modalProjects={modalProjects} modalProjectsTitle={modalProjectsTitle}
                             buttonProjects={buttonProjects} logoutHandler={logoutHandler} projects={props.projects}
                             currentUser={props.currentUser} currentProjectHandler={currentProjectHandler}
                             showProjectsMenu={showProjectsMenu} favoriteProjects={props.favoriteProjects}
                             getFavoriteProjectHandler={getFavoriteProjectHandler}
                             startedSprintHandler={startedSprintHandler}
            />
        </>
    )
}


const mapStateToProps = (state) => ({
    projects: state.projectsReducer.projects,
    currentUser: state.userReducer.currentUser,
    favoriteProjects: state.projectsReducer.favoriteProjects,
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {getProjects, getUser, getCurrentProject, getFavoriteProjects, getStartedSprint})
)(NavbarContainer)

