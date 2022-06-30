import instance from "./instance";

export default class tasksService {
  static getTasks = (userId) => instance.get(`/tasks`, { params: { userId } });
  static createTask = (task) => instance.post("/tasks", task);
  static deleteTask = (taskId) => instance.delete(`/tasks/${taskId}`);
  static updateTask = (task) => instance.put(`/tasks/${task.id}`, task);
}
