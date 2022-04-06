import React from 'react'
import './SideBar.scss'
import {NavLink} from "react-router-dom"
import {DatabaseOutlined, ProjectOutlined} from "@ant-design/icons"

const SideBarComponent = ({currentProject, getSprints, getBacklogElements}) => {

    return (
        <>
            <aside>
                <div className="project-container">
                    <div className="project-logo">
                    </div>
                    <div className="project-container-name">{currentProject.project_name}</div>
                </div>
                <h4>Planning</h4>
                <ul>
                    <li className="board-link-container">
                        <div><DatabaseOutlined/></div>
                        <NavLink to="backlog" className="board-link"
                                 onMouseDown={() => {
                                     getBacklogElements()
                                     getSprints()
                                 }}>Backlog</NavLink>
                    </li>
                    <li className="board-link-container">
                        <div><ProjectOutlined/></div>
                        <NavLink to="board" className="board-link">Board</NavLink>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default SideBarComponent
