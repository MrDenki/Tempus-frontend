import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../store/slices/tasksSlice";
import TaskList from "../components/TaskList";
import CreateTaskModal from "../modals/modal";
import UpdateTaskModal from "../components/Modals/UpdateTaskModal";

const Tasks = () => {
  const dispatch = useDispatch();
  const { currentUser, isAuth } = useSelector((state) => state.auth);
  const { tasks, isLoading, error } = useSelector((state) => state.task);

  const [isShowCreateTaskModal, setIsShowCreateTaskModal] = useState(false);
  const [isShowUpdateTaskModal, setIsShowUpdateTaskModal] = useState(false);
  const [editedTask, setEditedTask] = useState();

  useEffect(() => {
    if (isAuth) dispatch(getTasks(currentUser.id));
  }, []);

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
    <>
      <div style={{ width: 800, margin: "0 auto" }}>
        <TaskList
          tasks={tasks}
          onCreate={showCreateTaskModal}
          onEdit={handleOpenUpdateTaskModal}
        />
      </div>

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
    </>
  );
};

export default Tasks;
