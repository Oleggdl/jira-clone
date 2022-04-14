import React from 'react'
import './CreateProject.scss'
import {Button, Checkbox, Form, Input, Select} from "antd"
import TextArea from "antd/es/input/TextArea"
import {NavLink} from "react-router-dom";

const {Option} = Select


const CreateProjectComponent = ({form, handleSubmit, onReset}) => {

    return (
        <>
            <div className="create-project-container">
                <h2>Create project</h2>

                <Form name="create_project"
                      initialValues={{remember: true}}
                      form={form}
                      onFinish={values => handleSubmit(values)}
                      autoComplete="off">

                    <Form.Item
                        label="Project name"
                        name="project_name"
                        rules={[{required: true, message: 'Please input project name!'},
                            {max: 50, message: `Project name cannot be longer than 50 characters`},
                            {min: 3, message: 'Project name must be at least 3 characters'},
                            {pattern: new RegExp(/[a-z]/gi), message: 'Project name must contain letters'}
                        ]}>
                        <Input placeholder="Enter project name"/>
                    </Form.Item>
                    <Form.Item label="Project key" name="project_key" className="project-key"
                               rules={[{required: true, message: 'Please input project key!'},
                                   {max: 7, message: `Project key cannot be longer than 7 characters`},
                                   {pattern: new RegExp(/[a-z]/gi), message: 'Project key must contain letters'}]}>
                        <Input placeholder="Enter project key"/>
                    </Form.Item>
                    <Form.Item label="Project type" name="project_type"
                               rules={[{required: true, message: 'Please select project type!'}]}>
                        <Select placeholder="Select project type" className="project-select">
                            <Option value="kanban">Kanban</Option>
                            <Option value="scrum">Scrum</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Project description"
                        name="project_description"
                        rules={[{required: false},
                            {max: 600, message: `Project description cannot be longer than 600 characters`}]}>
                        <TextArea row={4} placeholder="Enter project description"/>
                    </Form.Item>
                    <Form.Item
                        label="Add to favorite projects"
                        name="is_favorite"
                        valuePropName="checked"
                        rules={[{required: false}]}>
                        <Checkbox/>
                    </Form.Item>
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

export default CreateProjectComponent
