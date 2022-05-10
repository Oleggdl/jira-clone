import React from 'react'
import './SprintStartWindow.scss'
import {Button, DatePicker, Form, Input} from "antd"
import moment from "moment";

const SprintStartWindowComponent = ({
                                        form, handleSubmit, onCancel, startSprintWrapper, index, sprint,
                                        taskCount, setColumnHandler, text
                                    }) => {

    const currentDate = new Date().toLocaleDateString()
    const currentDateArray = currentDate.split('.')

    const longMonth = [1, 3, 5, 7, 8, 10, 12]
    const shortMonth = [4, 6, 9, 11]

    if (longMonth.includes(parseInt(currentDateArray[1]))) {
        if (parseInt(currentDateArray[0]) + 14 > 31) {
            currentDateArray[0] = parseInt(currentDateArray[0]) + 14 - 31
            currentDateArray[1]++
        } else {
            currentDateArray[0] = parseInt(currentDateArray[0]) + 14
        }
    } else if (shortMonth.includes(parseInt(currentDateArray[1]))) {
        if (parseInt(currentDateArray[0]) + 14 > 30) {
            currentDateArray[0] = parseInt(currentDateArray[0]) + 14 - 30
            currentDateArray[1]++
        } else {
            currentDateArray[0] = parseInt(currentDateArray[0]) + 14
        }
    } else {
        if (parseInt(currentDateArray[0]) + 14 > 28) {
            currentDateArray[0] = parseInt(currentDateArray[0]) + 14 - 28
            currentDateArray[1]++
        } else {
            currentDateArray[0] = parseInt(currentDateArray[0]) + 14
        }
    }

    return (
        <>
            <div className="sprint-wrapper" ref={startSprintWrapper}>
                <div className="sprint-launch-container">
                    <button onMouseUp={setColumnHandler}>Test</button>
                    <h2>{text("startSprintWindow.title")}</h2>
                    <p><span style={{fontWeight: "bold"}}>{taskCount}</span>{text("startSprintWindow.text")}</p>
                    <Form form={form}
                          onFinish={values => {
                              handleSubmit(values)
                              // setColumnHandler()
                          }}
                          autoComplete="off"
                          initialValues={
                              {
                                  sprint_name: sprint.sprint_name || `BoardSprint ${index + 1}`,
                                  start_date: moment(currentDate, 'DD/MM/YYYY'),
                                  end_date: moment(currentDateArray.join('.'), 'DD/MM/YYYY')

                              }}>
                        <h4>{text("startSprintWindow.name")}</h4>
                        <Form.Item
                            name="sprint_name"
                            rules={[{required: true, message: `${text("startSprintWindow.errors.required")}`},
                                {max: 50, message: `${text("startSprintWindow.errors.max")}`},
                                {min: 3, message: `${text("startSprintWindow.errors.min")}`},
                                {
                                    pattern: new RegExp(/[a-z]/gi),
                                    message: `${text("startSprintWindow.errors.pattern")}`
                                }]}>
                            <Input placeholder={`${text("startSprintWindow.namePlaceholder")}`}/>
                        </Form.Item>
                        <h4>{text("startSprintWindow.startDate")}</h4>
                        <Form.Item name="start_date"
                                   rules={[{required: true, message: `${text("startSprintWindow.errors.start")}`}]}>
                            <DatePicker/>
                        </Form.Item>
                        <h4>{text("startSprintWindow.endDate")}</h4>
                        <Form.Item name="end_date"
                                   rules={[{required: true, message: `${text("startSprintWindow.errors.end")}`}]}>
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item className="start-sprint-buttons">
                            <Button type="primary" htmlType="submit" style={{width: "100px"}}
                                    className="primary-button-submit"
                                // onMouseUp={setColumnHandler}
                            >
                                {text("startSprintWindow.submitBtn")}
                                {/*<NavLink to="/scrum/board">Submit</NavLink>*/}
                            </Button>
                            <Button style={{marginLeft: "15px", width: "100px"}} onClick={onCancel}>
                                {text("startSprintWindow.cancelBtn")}</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default SprintStartWindowComponent
