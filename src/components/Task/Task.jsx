import { useState } from "react";
import Button from "@/components/UI/Button";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import StartIcon from "../icons/StartIcon";
import { useTrim, useDebounce } from "@/hooks";

const Task = ({ className, task, selected, onChange, onClick }) => {
  const classes = ["task"];
  if (selected) classes.push("selected");

  const [currentTask, setCurrentTask] = useState(task);
  const debouncedOnСhange = useDebounce(onChange, 500);
  const trimTaskDescription= useTrim(30);

  const changeTitle = (e) => {
    const changedTask = { ...currentTask };
    changedTask.title = e.target.value;
    setCurrentTask(changedTask);
    debouncedOnСhange(changedTask)
  };

  return (
    <div className={classes.join(" ")} onClick={onClick}>
      <div className="task__body">
        <div className="task__title">
          {/* {task && task.title} */}
          <TextField
            fullWidth
            variant="standard"
            value={currentTask.title}
            onChange={changeTitle}
          />
        </div>

        <span className="task__description">
          {currentTask.description && trimTaskDescription(currentTask.description)}
        </span>
      </div>

      <div className="task__actions">
        <div>00:00:00</div>

        <IconButton>
          <StartIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Task;
