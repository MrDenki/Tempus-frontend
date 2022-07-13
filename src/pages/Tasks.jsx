import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  deleteTask,
  getSearchedTask,
  createTask,
  updateTask,
  clearError,
} from "../store/slices/tasksSlice";
import TaskList from "../components/Task/TaskList";
import Alert from "@/components/UI/Alert";

const Tasks = () => {
  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.task);

  const handleChangeTask = async (task, isCreated) => {
    if (isCreated) {
      task.creatorId = currentUser.id;
      const data = await dispatch(createTask(task));
      task.id = data.payload.id;
    } else dispatch(updateTask(task));
  };

  const closeAlert = () => {
    dispatch(clearError());
  };

  useEffect(() => {
    if (error) setOpenAlert(true);
    else setOpenAlert(false);
  }, [error]);

  return (
    <div className="task-page">
      <h3 className="task-page__title">My Task</h3>

      <TaskList className="task-page__task-list" onChange={handleChangeTask} />

      <Alert
        title="Error"
        message={error}
        open={openAlert}
        onClose={closeAlert}
      />
    </div>
  );
};

export default Tasks;
