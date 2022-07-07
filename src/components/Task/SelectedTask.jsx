import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTrim, useDebounce } from "@/hooks";
import { TextField } from "@mui/material";
import Button from "../UI/Button";
import FolderIcon from "../icons/Folder";
import PeopleIcon from "../icons/People";
import PlusIcon from "../icons/Plus";
import DescriptionIcon from "../icons/Description";
import UserList from "@/components/User/UserList";
import Modal from "@mui/material/Modal";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  getTasks,
  deleteTask,
  getSearchedTask,
  createTask,
  updateTask,
} from "@/store/slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
  p: 4,
};

const SelectedTask = ({
  selectedTask,
  onClose,
  onChangeTask,
  onDeleteTask,
  onDeleteUser,
  onSelectUser,
}) => {
  const disabledFields = selectedTask === undefined;
  const [currentTask, setCurrentTask] = useState(selectedTask);
  const debouncedOnСhange = useDebounce(onChangeTask, 500);
  const trimTaskTitle = useTrim(25);
  const { selectedTaskId } = useSelector((state) => state.task);

  useEffect(() => {
    setCurrentTask(selectedTask);
  }, [selectedTask]);

  const changeTitle = (e) => {
    if (e.target.value.length === 0) return;

    const changedTask = { ...currentTask };
    changedTask.title = e.target.value;
    setCurrentTask(changedTask);

    debouncedOnСhange(changedTask);
  };

  const changeDescription = (e) => {
    if (e.target.value.length === 0) return;

    const changedTask = { ...currentTask };
    changedTask.description = e.target.value;
    setCurrentTask(changedTask);

    if (changedTask.title) debouncedOnСhange(changedTask);
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="selected-task">
        <div className="selected-task__header">
          <div className="selected-task__item selected-task__actions">
            <Button
              small
              rounded
              startIcon={<CheckIcon />}
              disabled={selectedTask === undefined || selectedTask.id === "new"}
            >
              Complete
            </Button>

            <Button
              small
              rounded
              startIcon={<DeleteIcon />}
              disabled={disabledFields}
              onClick={() => onDeleteTask(selectedTask.id)}
            >
              Delete
            </Button>
          </div>

          <div className="selected-task__item">
            <IconButton size="small" onClick={onClose}>
              <ArrowForwardIcon />
            </IconButton>
          </div>
        </div>

        <div className="selected-task__field field">
          {currentTask && typeof currentTask.title === "string" && (
            <TextField
              fullWidth
              multiline
              minRows={1}
              maxRows={5}
              className="task__title"
              variant="standard"
              placeholder="Write a task name"
              disabled={disabledFields}
              value={currentTask.title}
              onChange={changeTitle}
            />
          )}

          {!currentTask && (
            <TextField
              fullWidth
              variant="standard"
              placeholder="Write a task name"
              disabled={disabledFields}
            />
          )}
        </div>

        {/* <div className="selected-task__field field">
          <div className="field__title">Project</div>
          {<FolderIcon className="field__icon" />}
          <div className="field__value">
            {(selectedTask && selectedTask.project) || "No project"}
          </div>
        </div> */}

        {/* <div className="selected-task__field field">
          <div className="field__title">Assignee</div>
          {<PeopleIcon className="field__icon" />}
          <div className="field__value">
            <IconButton
              disabled={selectedTask === undefined || selectedTask.id === "new"}
              onClick={() => setOpen(true)}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
        </div>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          className="selected-task__modal"
        >
          <div className="selected-task__user-list-container">
            <div className="selected-task__user-list-wrapper">
              <UserList
                className="selected-task__user-list"
                selectedTask={selectedTask}
                onSelect={onSelectUser}
                onDelete={onDeleteUser}
                onClose={() => setOpen(false)}
              />
            </div>
          </div>
        </Modal> */}

        {/* <div className="selected-task__field field">
          <div className="field__item1">Due Date:</div>
          <div className="field__item2">
            {(selectedTask && selectedTask.date) || "None"}
          </div>
        </div> */}

        <div className="selected-task__field field">
          <div className="field__title">Description:</div>
          {<DescriptionIcon className="field__icon" />}
          <div className="field__value">
            {currentTask && typeof currentTask.description === "string" && (
              <TextField
                multiline
                minRows={1}
                maxRows={5}
                variant="standard"
                placeholder="Write a task description"
                disabled={disabledFields}
                value={currentTask.description}
                onChange={changeDescription}
              />
            )}

            {!currentTask && (
              <TextField
                fullWidth
                disabled={disabledFields}
                placeholder="Write a task description"
                variant="standard"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedTask;
