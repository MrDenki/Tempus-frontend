import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../store/slices/tasksSlice";
import TaskList from "../components/TaskList";

const Tasks = () => {
  const dispatch = useDispatch();
  const { currentUser, isAuth } = useSelector((state) => state.auth);
  const { tasks, isLoading, error } = useSelector((state) => state.task);

  useEffect(() => {
    if (isAuth) dispatch(getTasks(currentUser.id));
  }, []);

  const handleCreateTask = () => {
    dispatch(createTask());
  };

  const handleUpdateTask = (task) => {
    dispatch(updateTask(task));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <div style={{ width: 800, margin: "0 auto" }}>
      <TaskList
        tasks={tasks}
        onCreate={handleCreateTask}
        onDelete={handleDeleteTask}
        onUpdate={handleUpdateTask}
      />
    </div>
  );
};

export default Tasks;
