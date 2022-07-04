import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  deleteTask,
  getSearchedTask,
  createTask,
} from "../store/slices/tasksSlice";
import TaskList from "../components/Task/TaskList";
import CreateTaskModal from "../components/Modals/CreateTaskModal";
import UpdateTaskModal from "../components/Modals/UpdateTaskModal";
// import { getCurrentUser } from "@/store/slices/authSlice";


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

  const hanldeSearch = (searchText) => {
    dispatch(getSearchedTask(searchText));
  };

  const showCreateTaskModal = () => {
    setIsShowCreateTaskModal(true);
  };

  const handleChangeTask = (task, isCreated) => {
    // setEditedTask(task);
    // setIsShowUpdateTaskModal(true);
    console.log(task, isCreated);
    // if (isCreated) dispatch(createTask(task));
    // else dispatch(updateTask(task));
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
        // onCreate={showCreateTaskModal}
        onChange={handleChangeTask}
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
