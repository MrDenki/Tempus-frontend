import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDebounce } from "@/hooks";
import { TextField } from "@mui/material";
import Button from "../UI/Button";
import DescriptionIcon from "../icons/Description";
import { finishTask } from "@/store/slices/tasksSlice";
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
}) => {
  const disabledFields =
    selectedTask === undefined || (selectedTask && selectedTask.isComplete);
  const [currentTask, setCurrentTask] = useState(selectedTask);
  const debouncedOnСhange = useDebounce(onChangeTask, 500);
  const { selectedTaskId } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

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
    const changedTask = { ...currentTask };
    changedTask.description = e.target.value;
    setCurrentTask(changedTask);

    if (changedTask.title) debouncedOnСhange(changedTask);
  };

  const endTask = () => {
    dispatch(finishTask({ taskId: selectedTask.taskId }));
  };

  return (
    <>
      <div className="selected-task">
        <div className="selected-task__header">
          <div className="selected-task__item selected-task__actions">
            <Button
              small
              rounded
              startIcon={<CheckIcon />}
              disabled={
                selectedTask === undefined ||
                selectedTask.taskId === "new" ||
                selectedTask.isComplete
              }
              onClick={endTask}
            >
              Complete
            </Button>

            <Button
              small
              rounded
              startIcon={<DeleteIcon />}
              disabled={selectedTask === undefined}
              onClick={() => onDeleteTask(selectedTask.taskId)}
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

        <div className="selected-task__description">
          {<DescriptionIcon className="selected-task__description-icon" />}
          <span>Description:</span>
        </div>

        <div className="selected-task__description-textfield">
          {currentTask && typeof currentTask.description === "string" && (
            <TextField
              fullWidth
              multiline
              minRows={14}
              maxRows={14}
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
    </>
  );
};

export default SelectedTask;
