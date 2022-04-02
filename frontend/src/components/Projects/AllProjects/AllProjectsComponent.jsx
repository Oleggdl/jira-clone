import React from 'react'
import Search from "antd/es/input/Search"
import {Button, Table} from "antd";
import './AllProjects.scss'
import {NavLink} from "react-router-dom";

const AllProjectsComponent = ({projects}) => {

    const dataSource = projects.map((project) => ({
        key: project.id,
        projectName: project.scrum_project.project_name,
        projectKey: project.scrum_project.project_key,
        projectType: project.scrum_project.project_type,
        supervisor: project.users.username,
        actions: 'actions',

    }))

    const columns = [
        {
            title: 'Project name',
            dataIndex: 'projectName',
            key: 'projectName',
        },
        {
            title: 'Project key',
            dataIndex: 'projectKey',
            key: 'projectKey',
        },
        {
            title: 'Project type',
            dataIndex: 'projectType',
            key: 'projectType',
        },
        {
            title: 'Supervisor',
            dataIndex: 'supervisor',
            key: 'supervisor',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
        }

    ]

    return (
        <>
            <div className="all-projects-container">
                <Button type="primary" className="create-project-button">
                    <NavLink to="/create_project">Create project</NavLink>
                </Button>
                <h2>Projects</h2>
                <Search style={{width: "300px", margin: "10px 0"}}/>
                <Table dataSource={dataSource} columns={columns}/>
            </div>
        </>
    )
}

export default AllProjectsComponent
