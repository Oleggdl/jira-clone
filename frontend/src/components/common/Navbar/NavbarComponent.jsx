import React from 'react'
import './Navbar.scss'
import {NavLink} from "react-router-dom";

export const NavbarComponent = ({
                                    isProjectsMenu, isStaffMenu, modalProjectsTitle, setIsStaffMenu,
                                    buttonProjects, buttonStaff, modalProjects, modalStaff, modalStaffTitle,
                                    logoutHandler, projects, currentUser, currentProjectHandler, showProjectsMenu
                                }) => {

    function showStaffMenu() {
        !!isStaffMenu ? setIsStaffMenu(false) : setIsStaffMenu(true)
    }


    return (
        <nav>
            <div className="projects-wrapper">
                <div className="brand-logo"><h1>Jira-clone</h1></div>
                <ul className="nav-container">
                    <li>
                        <button onClick={() => {
                        }} className="nav-button" style={{padding: "unset"}}>
                            <NavLink to="create_task">Create</NavLink>
                        </button>
                    </li>
                    <li className="projects-container">
                        <button onClick={showProjectsMenu} className="nav-button"
                                ref={buttonProjects}>Projects
                        </button>
                        {isProjectsMenu && <div className="dropdown-content" ref={modalProjects}>
                            <h3 ref={modalProjectsTitle}>Recent</h3>
                            <ul>
                                <li>
                                    <ul className="recent-projects">
                                        {projects.map(project =>
                                            <li key={project.scrum_project.id} className="recent-projects-links"
                                                onClick={() => currentProjectHandler(project.scrum_project)}>
                                                <NavLink to={`scrum/${project.scrum_project.project_key}`}>
                                                    {project.scrum_project.project_name}
                                                </NavLink>
                                            </li>)}
                                    </ul>
                                </li>

                                <li className="dropdown-content-links"><NavLink to="/all_projects">Show all
                                    projects</NavLink></li>

                                <li className="dropdown-content-links"><NavLink to="/create_project">Create
                                    project</NavLink></li>
                            </ul>
                        </div>}
                    </li>
                    <li className="staff-container">
                        <button onClick={showStaffMenu} className="nav-button" ref={buttonStaff}>Staff</button>
                        {isStaffMenu && <div className="dropdown-content" ref={modalStaff}>
                            <h3 ref={modalStaffTitle}>Your colleague</h3>
                            <ul>
                                <li>
                                    <ul className="your-colleague">
                                        <li className="user-links"><NavLink to="/">User_1</NavLink></li>
                                        <li className="user-links"><NavLink to="/">User_2</NavLink></li>
                                        <li className="user-links"><NavLink to="/">User_3</NavLink></li>
                                    </ul>
                                </li>
                            </ul>
                            <li className="dropdown-content-links"><NavLink to="/">Invite a colleague</NavLink></li>
                        </div>}
                    </li>
                    <li className="user-link"><h2>{currentUser.username}</h2></li>
                    <li className="logoutLink">
                        <button onClick={logoutHandler} className="nav-button">Log out</button>
                    </li>
                </ul>
            </div>
        </nav>

    )
}
