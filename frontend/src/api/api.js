import axios from "axios"

const instance = axios.create({
    withCredentials: false,
    baseURL: `http://localhost:8080/jira-clone`,
})

export const projectsAPI = {
    createProject(data, headers) {
        return instance.post(`scrum/projects`, data, {headers: headers})
    },
    getProjects(headers) {
        return instance.get(`scrum/projects`, {headers: headers})
    },
}

export const userScrumProjectAPI = {
    createUserScrumProject(data, headers) {
        return instance.post(`scrum/userScrumProject`, data, {headers: headers})
    },
    getUserScrumProject(userId, headers) {
        return instance.get(`/scrum/userScrumProject/forUsers/${userId}`, {headers: headers})
    },
    putUserScrumProject(userScrumProjectId, userId, projectId, userRoleId, headers) {
        return instance.put(`scrum/userScrumProject/${userScrumProjectId}/${userId}/${projectId}/${userRoleId}/`,
            null, {headers: headers})
    },
}

export const tasksAPI = {
    createTask(data, headers) {
        return instance.post(`scrum/tasks`, data, {headers: headers})
    },
    getTasks(headers) {
        return instance.get(`scrum/tasks`, {headers: headers})
    },
}

export const sprintsAPI = {
    createSprint(data, headers) {
        return instance.post(`scrum/sprints`, data, {headers: headers})
    },
    getSprints(headers) {
        return instance.get(`scrum/sprints`, {headers: headers})
    },
}

export const columnsAPI = {
    createColumn(data, headers) {
        return instance.post(`scrum/columns`, data, {headers: headers})
    },
    getColumns(headers) {
        return instance.get(`scrum/columns`, {headers: headers})
    },
    deleteColumnScrum(id, headers) {
        return instance.delete(`scrum/columns/${id}`, {headers: headers})
    },
}

export const commentsScrumAPI = {
    createCommentScrum(data, headers) {
        return instance.post(`scrum/commentsScrum`, data, {headers: headers})
    },
    getCommentsScrum(taskId, headers) {
        return instance.get(`commentsScrum/task/${taskId}`, {headers: headers})
    },
    deleteCommentsScrum(id, headers) {
        return instance.delete(`scrum/commentsScrum/${id}`, {headers: headers})
    },
}

export const backlogAPI = {
    createBacklogElement(data, headers) {
        return instance.post(`scrum/backlog`, data, {headers: headers})
    },
    getBacklogElements(headers) {
        return instance.get(`scrum/backlog`, {headers: headers})
    },
    deleteBacklogElement(id, headers) {
        return instance.delete(`scrum/backlog/${id}`, {headers: headers})
    },
    uniteBacklogProjectTask(backlogId, taskId, projectId, headers) {
        return instance.put(`scrum/backlog/${backlogId}/${taskId}/${projectId}`, null, {headers: headers})
    },
    getBacklogForProject(projectId, headers) {
        return instance.get(`scrum/backlog/tasks/${projectId}`, {headers: headers})
    },
}
