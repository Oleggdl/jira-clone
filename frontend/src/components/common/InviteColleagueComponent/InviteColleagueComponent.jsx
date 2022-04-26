import React from 'react'
import './InviteColleague.scss'
import {Button, Form, Input, Select} from "antd"

const {Option} = Select

const InviteColleagueComponent = ({form, handleSubmit, onReset, setProjectHandler, projects}) => {

    return (
        <>
            <div className="invite-colleague-container">
                <h2>Invite users to Jira-clone</h2>
                <Form name="invite_colleague"
                      form={form}
                      onFinish={values => handleSubmit(values)}
                      autoComplete="off">
                    <Form.Item label="Project" name="project"
                               rules={[{required: true, message: 'Please select project!'}]}>
                        <Select placeholder="Select project" className="project-select">
                            {projects.map(project =>
                                <Option key={project.scrum_project.id}
                                        value={JSON.stringify(project.scrum_project)}>{project.scrum_project.project_name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Email" name="email"
                        style={{margin: '20px 0'}}
                        rules={[{required: true, message: 'Please input email!'},
                            {pattern: new RegExp(/@/gi), message: 'Email must contain @'}]}>
                        <Input placeholder="Enter email"/>
                    </Form.Item>
                    <Form.Item className="invite-buttons">
                        <Button className="invite-btn" type="primary" htmlType="submit">
                            Add colleague
                        </Button>
                        <Button style={{marginLeft: "15px", width: "100px"}} onClick={onReset}>Cancel</Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default InviteColleagueComponent
