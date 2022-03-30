import React, {useCallback, useEffect, useState} from 'react'
import './CreateTask.scss'
import {Button, Form, Input, Select, Typography} from "antd"
import TextArea from "antd/es/input/TextArea"
import {NavLink} from "react-router-dom"

const {Option} = Select
const {Title} = Typography


const CreateTaskComponent = ({form, handleSubmit, onReset}) => {

    const projects = ['project_1', 'project_2', 'project_3']
    const executors = ['executor_1', 'executor_2', 'executor_3']
    const sprints = ['sprint_1', 'sprint_2', 'sprint_3']
    const creator = 'OIE zhA'

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
                            {projects.map((project, index) => <Option key={index} value={project}>{project}</Option>)}
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
                            {sprints.map((sprint, index) => <Option key={index} value={sprint}>{sprint}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Author" name="creator_id"
                               rules={[{required: false}]}
                               value={'OIE zhA'}>
                        <Title level={4}>{creator}</Title>
                    </Form.Item>
                    <Form.Item name="create_date" style={{height: 0, margin: 0} }> </Form.Item>
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
