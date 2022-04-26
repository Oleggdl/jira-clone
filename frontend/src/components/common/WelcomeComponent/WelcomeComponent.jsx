import React from 'react'
import './WelcomeComponent.scss'

const WelcomeComponent = () => {

    return (
        <>
            <h2 className="welcome-title">Welcome to jira-clone app</h2>
            <p className="welcome-text">This application is designed to create tasks, assign executors, set priorities and track the progress
                of these tasks.</p>
        </>
    )
}

export default WelcomeComponent
