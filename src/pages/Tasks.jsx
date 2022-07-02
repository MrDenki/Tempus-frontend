import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../store/slices/tasksSlice";
import TaskList from "../components/Task/TaskList";
import CreateTaskModal from "../components/Modals/CreateTaskModal";
import UpdateTaskModal from "../components/Modals/UpdateTaskModal";
import { getCurrentUser } from "@/store/slices/authSlice";
import { getSearchedTask } from "@/store/slices/tasksSlice";

const Tasks = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { tasks, isLoading, error, isSearch } = useSelector(
    (state) => state.task
  );

  const [isShowCreateTaskModal, setIsShowCreateTaskModal] = useState(false);
  const [isShowUpdateTaskModal, setIsShowUpdateTaskModal] = useState(false);
  const [editedTask, setEditedTask] = useState();

  useEffect(() => {
    if (currentUser) dispatch(getTasks(currentUser.id));
  }, [currentUser]);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  const hanldeSearch = (searchText) => {
    dispatch(getSearchedTask(searchText));
  };

  const showCreateTaskModal = () => {
    setIsShowCreateTaskModal(true);
  };
  const handleOpenUpdateTaskModal = (task) => {
    setEditedTask(task);
    setIsShowUpdateTaskModal(true);
  };

  const handleCloseCreateTaskModak = () => {
    setIsShowCreateTaskModal(false);
  };

  const handleCloseUpdateTaskModal = () => {
    setIsShowUpdateTaskModal(false);
  };

  const handleCreateTask = (task) => {
    dispatch(createTask(task));
  };

  const handleUpdateTask = (task) => {
    dispatch(updateTask(task));
  };

  const handleDeleteTask = (taskId) => {
    console.log(taskId, "taskId");
    dispatch(deleteTask(taskId));
    handleCloseUpdateTaskModal();
  };

  return (
    <div className="task-page">
      <h3 className="task-page__title">My Task</h3>

      <TaskList
        className="task-page__task-list"
        tasks={tasks}
        isSearch={isSearch}
        isLoading={isLoading}
        onSearch={hanldeSearch}
        onCreate={showCreateTaskModal}
        onEdit={handleOpenUpdateTaskModal}
      />

      {isShowCreateTaskModal && (
        <CreateTaskModal
          show={isShowCreateTaskModal}
          onClose={handleCloseCreateTaskModak}
          onSubmit={handleCreateTask}
        />
      )}

      {isShowUpdateTaskModal && (
        <UpdateTaskModal
          task={editedTask}
          show={isShowUpdateTaskModal}
          onClose={handleCloseUpdateTaskModal}
          onDelete={handleDeleteTask}
          onSubmit={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default Tasks;
