import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "@/store/slices/tasksSlice";
import TaskList from "@/components/Task/TaskList";
import Alert from "@/components/UI/Alert";

const Tasks = () => {
  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = useState(false);
  const { error } = useSelector((state) => state.task);

  const closeAlert = () => {
    dispatch(clearError());
  };

  useEffect(() => {
    if (error) setOpenAlert(true);
    else setOpenAlert(false);
  }, [error]);

  return (
    <div className="page">
      <h3 className="page__title">My Task</h3>

      <TaskList className="task-page__task-list" />

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
