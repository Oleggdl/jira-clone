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
}

export const commentsScrumAPI = {
    createCommentScrum(data, headers) {
        return instance.post(`scrum/commentsScrum`, data, {headers: headers})
    },
    getCommentsScrum(headers) {
        return instance.get(`scrum/commentsScrum`, {headers: headers})
    },
    deleteCommentsScrum(id, headers) {
        return instance.delete(`scrum/commentsScrum/${id}`, {headers: headers})
    },
}
