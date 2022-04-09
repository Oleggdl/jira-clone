import {Button, Checkbox, Form, Input, Typography} from "antd"
import TextArea from "antd/es/input/TextArea"
import React from "react"
import DeleteProjectContainer from "../../../common/DeleteProject/DeleteProjectContainer";

const ProjectInfoComponent = ({
                                  projectData, handleSubmit, form, onCancel, onDeleteHandler, isDeleteModal,
                                  onConfirmDelete, setIsDeleteModal, projectWrapper, projectDataAll, setIsActions
                              }) => {

    return (
        <>
            <div className="settings-project">
                <Form name="create_task"
                      initialValues={
                          {
                              project_name: projectData.project_name,
                              project_key: projectData.project_key,
                              project_description: projectData.project_description,
                              is_favorite: projectData.is_favorite,

                          }}
                      form={form}
                      onFinish={values => handleSubmit(values)}
                      autoComplete="off">
                    <Typography.Title level={2} style={{marginBottom: "20px"}}>Project settings</Typography.Title>
                    <Form.Item
                        label="Project name"
                        name="project_name"
                        rules={[{required: true, message: 'Please input project name!'},
                            {max: 50, message: `Project description cannot be longer than 50 characters`},
                            {min: 3, message: 'Project name must be at least 3 characters'},
                            {pattern: new RegExp(/[a-z]/gim), message: 'Project name must contain letters'}]}>
                        <Input placeholder="Enter project name"/>
                    </Form.Item>
                    <Form.Item label="Project key" name="project_key" className="project-key"
                               rules={[{required: true, message: 'Please input project key!'}]}>
                        <Input placeholder="Enter project key"/>
                    </Form.Item>
                    <Typography.Paragraph style={{marginLeft: "75px"}} level={5}>Project type:
                        <span style={{marginLeft: "10px", fontWeight: "bold"}}>
                            {projectData?.project_type?.toUpperCase()}</span>
                    </Typography.Paragraph>
                    <Form.Item
                        label="Project description"
                        name="project_description"
                        rules={[{required: false},
                            {max: 12, message: `Project description cannot be longer than 600 characters`}]}>
                        <TextArea row={4} placeholder="Enter project description"/>
                    </Form.Item>
                    <Typography.Paragraph style={{marginLeft: "84px"}} level={5}>Supervisor:
                        <span style={{marginLeft: "10px", fontWeight: "bold"}}>
                            {projectDataAll.users.username}</span>
                    </Typography.Paragraph>
                    <Form.Item
                        label="Add to favorite projects"
                        name="is_favorite"
                        valuePropName="checked"
                        rules={[{required: false}]}>
                        <Checkbox/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 7}} style={{marginBottom: "40px"}}>
                        <Button type="primary" htmlType="submit" style={{width: "100px"}}>
                            Submit
                        </Button>
                        <Button style={{marginLeft: "15px", width: "100px"}} onClick={onCancel}>Cancel</Button>
                    </Form.Item>
                    <div className="delete-project" onClick={onDeleteHandler}>Delete project</div>
                    {isDeleteModal && <DeleteProjectContainer setIsDeleteModal={setIsDeleteModal}
                                                              projectData={projectData} setIsActions={setIsActions}/>}
                </Form>
                <div className="project-settings-wrapper" ref={projectWrapper}></div>
            </div>
        </>
    )
}

export default ProjectInfoComponent
