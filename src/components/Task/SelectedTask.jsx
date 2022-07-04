import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "../UI/Button";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTrim, useDebounce } from "@/hooks";
// import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

const SelectedTask = ({ selectedTask, onChange, onClose }) => {
  console.log(selectedTask, 'selectedTask');
  const [currentTask, setCurrentTask] = useState(selectedTask || []);

  const debouncedOnСhange = useDebounce(onChange, 500);
  const trimTaskTitle = useTrim(25);

  const changeTitle = (e) => {
    const changedTask = { ...currentTask };
    changedTask.title = e.target.value;
    setCurrentTask(changedTask);
    debouncedOnСhange(changedTask)
  };

  const changeDescription = (e) => {
    const changedTask = { ...currentTask };
    console.log(changedTask);
    changedTask.description = e.target.value;
    setCurrentTask(changedTask);
    debouncedOnСhange(changedTask)
  };

  return (
    <>
      <div className="selected-task">
        <div className="selected-task__header">
          <div className="selected-task__item selected-task__actions">
            <Button small rounded startIcon={<CheckIcon />}>
              Complete
            </Button>

            <Button small rounded startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </div>

          <div className="selected-task__item">
            <IconButton size="small" onClick={onClose}>
              <ArrowForwardIcon />
            </IconButton>
          </div>
        </div>

        <h3>{selectedTask && trimTaskTitle(selectedTask.title)}</h3>

        <div className="selected-task__field field">
          <div className="field__item1">Project:</div>
          <div className="field__item2">
            {(selectedTask && selectedTask.project) || "No project"}
          </div>
        </div>

        <div className="selected-task__field field">
          <div className="field__item1">Assignee:</div>
          <div className="field__item2">
            {(selectedTask &&
              selectedTask.User_Task_creatorIdToUser &&
              selectedTask.User_Task_workerIdToUser.firstName +
                " " +
                selectedTask.User_Task_workerIdToUser.lastName) ||
              "None"}
          </div>
        </div>

        <div className="selected-task__field field">
          <div className="field__item1">Due Date:</div>
          <div className="field__item2">
            {/* <input type="text" value={selectedTask && selectedTask.description} style={{border: 'none', outline: 'none'}} /> */}
            {(selectedTask && selectedTask.date) || "None"}
          </div>
        </div>

        <div className="selected-task__field field">
          <div className="field__item1">Description:</div>
          <div className="field__item2">
            <TextField
              variant="standard"
              value={currentTask.description}
              onChange={changeDescription}
            />

            {/* {(selectedTask && selectedTask.description) || "None"} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedTask;
