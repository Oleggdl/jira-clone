import React from 'react'
import './SprintStartWindow.scss'
import {Button, DatePicker, Form, Input} from "antd"
import moment from "moment";
import {NavLink} from "react-router-dom";

const SprintStartWindowComponent = ({
                                        form, handleSubmit, onCancel, startSprintWrapper, index, sprint,
                                        taskCount, setTaskSprintColumn
                                    }) => {

    const currentDate = new Date().toLocaleDateString()
    const currentDateArray = currentDate.split('.')
    currentDateArray[0] = parseInt(currentDateArray[0]) + 14

    return (
        <>
            <div className="sprint-wrapper" ref={startSprintWrapper}>
                <div className="sprint-launch-container">
                    <h2>Sprint launch</h2>
                    <p><span style={{fontWeight: "bold"}}>{taskCount}</span> tasks were included in this sprint</p>
                    <Form form={form}
                          onFinish={values => handleSubmit(values)}
                          autoComplete="off"
                          initialValues={
                              {
                                  sprint_name: sprint.sprint_name || `BoardSprint ${index + 1}`,
                                  start_date: moment(currentDate, 'DD/MM/YYYY'),
                                  end_date: moment(currentDateArray.join('.'), 'DD/MM/YYYY')

                              }}>
                        <h4>Sprint name</h4>
                        <Form.Item
                            name="sprint_name"
                            rules={[{required: true, message: 'Please input sprint name!'},
                                {max: 50, message: `Sprint name cannot be longer than 50 characters`},
                                {min: 3, message: 'Sprint name must be at least 3 characters'},
                                {
                                    pattern: new RegExp(/[a-z]/gi),
                                    message: 'Sprint name must contain letters'
                                }]}>
                            <Input placeholder="Enter sprint name"/>
                        </Form.Item>
                        <h4>The date of the beginning</h4>
                        <Form.Item name="start_date" rules={[{required: true, message: 'Please select a start date!'}]}>
                            <DatePicker/>
                        </Form.Item>
                        <h4>The date of the ending</h4>
                        <Form.Item name="end_date" rules={[{required: true, message: 'Please select an end date!'}]}>
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item className="start-sprint-buttons">
                            <Button type="primary" htmlType="submit" style={{width: "100px"}}
                                    className="primary-button-submit"
                                    onMouseUp={setTaskSprintColumn}>
                                Submit
                                {/*<NavLink to="/scrum/board">Submit</NavLink>*/}
                            </Button>
                            <Button style={{marginLeft: "15px", width: "100px"}} onClick={onCancel}>Cancel</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default SprintStartWindowComponent
