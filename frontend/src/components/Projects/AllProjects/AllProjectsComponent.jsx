import React from 'react'
import Search from "antd/es/input/Search"
import {Button, Table} from "antd"
import './AllProjects.scss'
import {NavLink} from "react-router-dom"
import {EllipsisOutlined} from "@ant-design/icons"
import ProjectInfoContainer from "./ProjectInfo/ProjectInfoContainer"


const AllProjectsComponent = ({
                                  projects, onSearch, showActionsHandler, isActions, setIsActions, projectWrapper,
                                  isDeleteModal, setIsDeleteModal, getProjectById, currentProjectHandler, text
                              }) => {


    const dataSource = projects.map((project) => ({
        key: project.id,
        projectName: (<NavLink onMouseDown={() => currentProjectHandler(project)}
                               to={`/scrum/${project.scrum_project.project_key}`}>
            {project.scrum_project.project_name}</NavLink>),
        projectKey: project.scrum_project.project_key,
        projectType: project.scrum_project.project_type,
        supervisor: project.scrum_project.supervisor.username
    }))

    const columns = [
        {
            title: `${text("allProjects.table.name")}`,
            dataIndex: 'projectName',
            key: 'projectName'
        },
        {
            title: `${text("allProjects.table.key")}`,
            dataIndex: 'projectKey',
            key: 'projectKey',
        },
        {
            title: `${text("allProjects.table.supervisor")}`,
            dataIndex: 'supervisor',
            key: 'supervisor',
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, record) => {
                return (
                    <>
                        <div className="projects-actions" onClick={showActionsHandler}
                             onMouseDown={() => getProjectById(record)}>
                            <EllipsisOutlined/>
                        </div>
                    </>
                )
            }
        }
    ]

    return (
        <>
            <div className="all-projects-container">
                <Button type="primary" className="create-project-button">
                    <NavLink to="/create_project">{text("allProjects.button")}</NavLink>
                </Button>
                <h2>{text("allProjects.title")}</h2>
                <Search style={{width: "300px", margin: "10px 0"}} onSearch={(value) => onSearch(value)} enterButton/>
                <Table dataSource={dataSource} columns={columns}/>
                {isActions && <ProjectInfoContainer setIsActions={setIsActions} setIsDeleteModal={setIsDeleteModal}
                                                    isDeleteModal={isDeleteModal} projectWrapper={projectWrapper}
                                                    getProjectById={getProjectById}/>}
            </div>
        </>
    )
}

export default AllProjectsComponent
