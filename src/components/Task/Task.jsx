import { useState, useEffect } from "react";
import Button from "@/components/UI/Button";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import StartIcon from "../icons/StartIcon";
import { useTrim, useDebounce } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";

const Task = ({ className, task, selected, onChange, onClick }) => {
  const classes = ["task"];
  if (selected) classes.push("selected");

  const [currentTask, setCurrentTask] = useState(task);
  const debouncedOnСhange = useDebounce(onChange, 500);
  const trimTaskDescription = useTrim(30);
  const { isLoading, currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    setCurrentTask(task);
  }, [task]);

  const changeTitle = (e) => {
    if (e.target.value.length === 0) return;

    const changedTask = { ...currentTask };
    changedTask.title = e.target.value;

    setCurrentTask(changedTask);
    debouncedOnСhange(changedTask);
  };

  const taskIsAssignedToCurrentUser = () => {
    if (!task || !task.workers) return;

    let selected = false;
    task.workers.forEach((worker) => {
      if (worker.workerId === currentUser.id) selected = true;
    });

    return selected;
  };

  return (
    <div className={classes.join(" ")} onClick={onClick}>
      <div className="task__body">
        <div className="task__title">
          <TextField
            fullWidth
            variant="standard"
            value={currentTask.title}
            onChange={changeTitle}
          />
        </div>

        <span className="task__description">
          {currentTask.description &&
            trimTaskDescription(currentTask.description)}
        </span>
      </div>

      {taskIsAssignedToCurrentUser() && (
        <div className="task__actions">
          <div>00:00:00</div>

          <Button
            className="task__button"
            startIcon={<StartIcon className="task__button-icon" />}
            small
            rounded
            contained
          >
            Start
          </Button>
        </div>
      )}
    </div>
  );
};

export default Task;
