import React, {useCallback, useEffect, useState} from 'react'
import './CreateTask.scss'
import {Button, Form, Input, Select, Typography} from "antd"
import TextArea from "antd/es/input/TextArea"
import {NavLink} from "react-router-dom"

const {Option} = Select
const {Title} = Typography


const CreateTaskComponent = ({form, handleSubmit, onReset, projects, sprints, currentUser}) => {

    const executors = ['executor_1', 'executor_2', 'executor_3']

    return (
        <>
            <div className="create-task-container">
                <h2>Create task</h2>
                <Form name="create_task"
                      initialValues={
                          {
                              executor: executors[0],
                              create_date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
                          }}
                      form={form}
                      onFinish={values => handleSubmit(values)}
                      autoComplete="off">

                    <Form.Item label="Project" name="project"
                               rules={[{required: true, message: 'Please select project!'}]}>
                        <Select placeholder="Select project" className="project-select">
                            {projects.map(project =>
                                <Option key={project.id} value={project.project_name}>{project.project_name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Task name"
                        name="task_name"
                        rules={[{required: true, message: 'Please input task name!'}]}>
                        <Input placeholder="Enter task name"/>
                    </Form.Item>
                    <Form.Item
                        label="Task description"
                        name="task_description"
                        rules={[{required: false}]}>
                        <TextArea row={4} placeholder="Enter task description"/>
                    </Form.Item>
                    <Form.Item label="Executor" name="executor_id"
                               rules={[{required: false}]}>
                        <Select placeholder="Select executor" className="project-select">
                            {executors.map((executor, index) =>
                                <Option key={index} value={executor}>{executor}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Sprint" name="sprint_id"
                               rules={[{required: false}]}>
                        <Select placeholder="Select sprint" className="project-select">
                            {!!sprints ? sprints.map(sprint =>
                                <Option key={sprint.id}
                                        value={sprint.sprint_name}>{sprint.sprint_name}</Option>) : null}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Author" name="creator_id"
                               rules={[{required: false}]}
                               value={currentUser}>
                        <Title level={4}>{currentUser}</Title>
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
