import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskList from "../components/Task/TaskList";
import {
  getTasks,
  deleteTask,
  getSearchedTask,
  createTask,
  updateTask,
} from "../store/slices/tasksSlice";
import TaskList from "../components/Task/TaskList";
import CreateTaskModal from "../components/Modals/CreateTaskModal";
import UpdateTaskModal from "../components/Modals/UpdateTaskModal";
import Sidebar from "@/components/Sidebar";
// import { getCurrentUser } from "@/store/slices/authSlice";

const Tasks = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { tasks, isLoading, error, isSearch } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    if (currentUser) dispatch(getTasks(currentUser.id));
  }, [currentUser]);

  const handleSearch = (searchText) => {
    dispatch(getSearchedTask(searchText));
  };

  const handleChangeTask = async (task, isCreated) => {
    if (isCreated) {
      task.creatorId = currentUser.id;
      const data = await dispatch(createTask(task));
      task.id = data.payload.id
    } else dispatch(updateTask(task));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <>
      <Sidebar />
      <div className="task-page">
        <h3 className="task-page__title">My Task</h3>

      <TaskList
        className="task-page__task-list"
        tasks={tasks}
        isSearch={isSearch}
        isLoading={isLoading}
        onSearch={handleSearch}
        onChange={handleChangeTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default Tasks;
