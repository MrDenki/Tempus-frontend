import instance from "./instance";

export default class tasksService {
  static getTasks = (userId) =>
    instance.get(`tasks/getUserTasks`, { params: { userId } });
  static createTask = (task) => instance.post("tasks", task);
  static deleteTask = (taskId) => instance.delete(`tasks/${taskId}`);
  static updateTask = (task) => instance.put(`tasks/${task.id}`, task);
  static searchTask = (searchText) =>
    instance.get(`tasks`, { params: { searchText } });
  static getUserTasks = (userId) =>
    instance.get("/tasks/getUserTasks", { params: { userId } });

  static assignWorker = (taskId, userId) =>
    instance.post(`/tasks/${taskId}/assignWorker`, { userId });
  static unassignWorker = (taskId, userId) =>
    instance.post(`/tasks/${taskId}/unassignWorker`, { userId });
}
