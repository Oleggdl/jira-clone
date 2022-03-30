import React from 'react'
import './CreateProject.scss'
import {Button, Form, Input, Select} from "antd"
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
                        rules={[{required: true, message: 'Please input project name!'}]}>
                        <Input placeholder="Enter project name"/>
                    </Form.Item>
                    <Form.Item label="Project key" name="project_key"
                               rules={[{required: true, message: 'Please input project key!'}]}>
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
                        rules={[{required: false}]}>
                        <TextArea row={4} placeholder="Enter project description"/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 7}}>
                        <Button type="primary" htmlType="submit" style={{width: "100px"}}>
                            Submit
                        </Button>
                        <Button style={{marginLeft: "15px", width: "100px"}} onClick={onReset}>
                            <NavLink to="/all_projects">Cancel</NavLink>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default CreateProjectComponent
