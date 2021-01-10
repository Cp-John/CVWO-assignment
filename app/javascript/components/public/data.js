export const colors = ["#f2777a", "#99cd98", "#ffcd65", "#65cccc", "#659acc", "#d27b53"]

export const drawerWidth = 240;

export const defaultCategoryId = 1

export const getColor = (id) => {
    return colors[id % colors.length]
}

export const getRandomColor = () => {
    return colors[0]
}

export const handleEditTask = (id) => () => {
    window.location.href = `/task/edit/${id}`
}

export const handleAddTask = () => {
    window.location.href = "/task/new"
}

export const goHome = () => {
    window.location.href = "/"
}

export const handleViewTask = (id) => () => {
    window.location.href = `/taskinfo/${id}`
}

export const goTaskInfo = (id) => {
    handleViewTask(id)()
}