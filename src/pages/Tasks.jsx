import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  deleteTask,
  getSearchedTask,
  createTask,
  updateTask,
} from "../store/slices/tasksSlice";
import TaskList from "../components/Task/TaskList";

const Tasks = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);


  const handleChangeTask = async (task, isCreated) => {
    if (isCreated) {
      task.creatorId = currentUser.id;
      const data = await dispatch(createTask(task));
      task.id = data.payload.id;
    } else dispatch(updateTask(task));
  };

  return (
    <div className="task-page">
      <h3 className="task-page__title">My Task</h3>

      <TaskList
        className="task-page__task-list"
        onChange={handleChangeTask}
      />
    </div>
  );
};

export default Tasks;
