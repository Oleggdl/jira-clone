import React from 'react'
import './CreateTask.scss'
import {Button, Form, Input, Select, Typography} from "antd"
import TextArea from "antd/es/input/TextArea"
import {NavLink} from "react-router-dom"

const {Option} = Select
const {Title} = Typography


const CreateTaskComponent = ({
                                 form, handleSubmit, onReset, projects, currentUser, usersOnProject,
                                 getExecutorsHandler
                             }) => {

    const executor = !!parseInt(currentUser.id) ? null : currentUser.id

    return (
        <>
            <div className="create-task-container">
                <h2>Create task</h2>
                <Form name="create_task"
                      initialValues={
                          {
                              create_date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
                              task_description: null,
                              executor_id: executor
                          }}
                      form={form}
                      onFinish={values => handleSubmit(values)}
                      autoComplete="off">

                    <Form.Item label="Project" name="project"
                               rules={[{required: true, message: 'Please select project!'}]}>
                        <Select placeholder="Select project" className="project-select"
                                onChange={(e) => getExecutorsHandler(e)}>
                            {projects.map(project =>
                                <Option key={project.scrum_project.id}
                                        value={project.scrum_project.id}>{project.scrum_project.project_name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Task name"
                        name="task_name"
                        rules={[{required: true, message: 'Please input task name!'},
                            {max: 50, message: `Task name cannot be longer than 50 characters`},
                            {min: 3, message: 'Task name must be at least 3 characters'},
                            {pattern: new RegExp(/[a-z]/gi), message: 'Task name must contain letters'}]}>
                        <Input placeholder="Enter task name"/>
                    </Form.Item>
                    <Form.Item
                        label="Task description"
                        name="task_description"
                        rules={[{required: false},
                            {max: 1000, message: `Task name cannot be longer than 1000 characters`}]}>
                        <TextArea row={4} placeholder="Enter task description"/>
                    </Form.Item>
                    <Form.Item label="Executor" name="executor_id"
                               rules={[{required: false}]}>
                        <Select placeholder="Select executor" className="project-select">
                            {usersOnProject.map((executor, index) =>
                                <Option key={index} value={executor.users.id}>{executor.users.username}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Author" name="creator_id"
                               rules={[{required: false}]}
                               value={currentUser.username}>
                        <Title level={4}>{currentUser.username}</Title>
                    </Form.Item>
                    <Form.Item name="create_date" style={{height: 0, margin: 0}}> </Form.Item>
                    <Form.Item wrapperCol={{offset: 7}}>
                        <Button type="primary" htmlType="submit" style={{width: "100px"}}>
                            Submit
                        </Button>
                        <Button style={{marginLeft: "15px", width: "100px"}} onClick={onReset}>
                            <NavLink to="/">Cancel</NavLink>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default CreateTaskComponent
