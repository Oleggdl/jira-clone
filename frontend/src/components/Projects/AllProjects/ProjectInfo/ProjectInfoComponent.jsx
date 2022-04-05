import {Button, Form, Input, Typography} from "antd"
import TextArea from "antd/es/input/TextArea"
import React from "react"

const ProjectInfoComponent = ({
                                  projectData, handleSubmit, form, onCancel, onDeleteHandler, isDeleteModal,
                                  onConfirmDelete, setIsDeleteModal, projectWrapper, projectDataAll
                              }) => {

    return (
        <>
            <div className="settings-project">
                <Form name="create_task"
                      initialValues={
                          {
                              project_name: projectData.project_name,
                              project_key: projectData.project_key,
                              project_description: projectData.project_description
                          }}
                      form={form}
                      onFinish={values => handleSubmit(values)}
                      autoComplete="off">
                    <Typography.Title level={2} style={{marginBottom: "20px"}}>Project settings</Typography.Title>
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
                    <Typography.Paragraph style={{marginLeft: "45px"}} level={5}>Project type:
                        <span style={{marginLeft: "10px", fontWeight: "bold"}}>
                            {projectData?.project_type?.toUpperCase()}</span>
                    </Typography.Paragraph>
                    <Form.Item
                        label="Project description"
                        name="project_description"
                        rules={[{required: false}]}>
                        <TextArea row={4} placeholder="Enter project description"/>
                    </Form.Item>
                    <Typography.Paragraph style={{marginLeft: "45px"}} level={5}>Project type:
                        <span style={{marginLeft: "10px", fontWeight: "bold"}}>
                            {projectDataAll.users.username}</span>
                    </Typography.Paragraph>
                    <Form.Item wrapperCol={{offset: 7}} style={{marginBottom: "40px"}}>
                        <Button type="primary" htmlType="submit" style={{width: "100px"}}>
                            Submit
                        </Button>
                        <Button style={{marginLeft: "15px", width: "100px"}} onClick={onCancel}>Cancel</Button>
                    </Form.Item>
                    <div className="delete-project" onClick={onDeleteHandler}>Delete project</div>
                    {isDeleteModal && <div className="delete-window">
                        <h5>Delete project permanently?</h5>
                        <Button className="primary-button" type="primary" onClick={onConfirmDelete}>Confirm</Button>
                        <Button onClick={() => setIsDeleteModal(false)}>Cancel</Button>
                    </div>}
                </Form>
                <div className="project-settings-wrapper" ref={projectWrapper}></div>
            </div>
        </>
    )
}

export default ProjectInfoComponent
