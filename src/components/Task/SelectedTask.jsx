import React from "react";
import IconButton from "@mui/material/IconButton";
// import Button from "../UI/Button";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import StartIcon from "../icons/StartIcon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTrim } from "@/hooks";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
const SelectedTask = ({ selectedTask, onClose }) => {
  const trimTaskTitle = useTrim(25);

  return (
    <>
      <div className="selected-task">
        <div className="selected-task__header">
          {/* <div className="selected-task__item">
            <IconButton>
              <StartIcon />
            </IconButton>

            <div>00:00:00</div>
          </div>

          <div className="selected-task__divider"></div> */}

          <div className="selected-task__item selected-task__actions">
            <Button size="small" startIcon={<CheckIcon />}>
              Complete
            </Button>

            <Button size="small" startIcon={<DeleteIcon />}>
              Delete
            </Button>

            <IconButton onClick={onClose}>
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
          <TextField variant="standard" value={(selectedTask && selectedTask.description)} />

            {/* {(selectedTask && selectedTask.description) || "None"} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedTask;
