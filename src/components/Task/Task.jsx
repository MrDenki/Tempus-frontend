import { useState, useEffect, useRef } from "react";
import Button from "@/components/UI/Button";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PauseIcon from "@mui/icons-material/Pause";
import StartIcon from "../icons/StartIcon";
import { useTrim, useDebounce } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  startTask,
  startPause,
  endPause,
  completeTask,
} from "../../store/slices/tasksSlice";

const Task = ({ task, selected, onChange, onClick }) => {
  const classes = ["task"];
  if (selected) classes.push("selected");

  const dispatch = useDispatch();
  const [currentTask, setCurrentTask] = useState(task);
  const debouncedOnСhange = useDebounce(onChange, 500);
  const trimTaskDescription = useTrim(30);
  const { currentUser } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.task);
  const [workTime, setWorkTime] = useState();

  const timer = useRef(null);

  useEffect(() => {
    setCurrentTask(task);
  }, [task]);

  useEffect(() => {
    if (task.workerId === currentUser.id) {
      if (task.isComplete) {
        clearInterval(timer.current);
      }

      let delta = Math.floor(task.workTime / 1000);
      let days = Math.floor(delta / 86400);
      delta -= days * 86400;
      let hours = Math.floor(delta / 3600) % 24;
      hours += days * 24;
      delta -= hours * 3600;
      let minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;
      let seconds = delta % 60;

      let hourStr = hours;
      let minStr = minutes;
      let secStr = seconds;
      if (hours < 10) hourStr = `0${hours}`;
      if (minutes < 10) minStr = `0${minutes}`;
      if (seconds < 10) secStr = `0${seconds}`;
      let dateStr = `${hourStr}:${minStr}:${secStr}`;
      setWorkTime(dateStr);

      if (!task.isActive) {
        clearInterval(timer.current);
      }
      if (task.isActive) {
        timer.current = setInterval(() => {
          if (seconds < 59) seconds += 1;
          else {
            seconds = 0;
            minutes += 1;
          }

          if (minutes >= 59) {
            minutes = 0;
            hours += 1;
          }

          let hourStr = hours;
          let minStr = minutes;
          let secStr = seconds;

          if (hours < 10) hourStr = `0${hours}`;
          if (minutes < 10) minStr = `0${minutes}`;
          if (seconds < 10) secStr = `0${seconds}`;
          let dateStr = `${hourStr}:${minStr}:${secStr}`;

          setWorkTime(dateStr);
        }, 1000);
      }
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [task]);

  const startTimer = () => {
    if (!workTime) return;
    const time = workTime.split(":");
    let hours = Number(time[0]);
    let minutes = Number(time[1]);
    let seconds = Number(time[2]);

    timer.current = setInterval(() => {
      if (seconds < 59) seconds += 1;
      else {
        seconds = 0;
        minutes += 1;
      }

      if (minutes >= 59) {
        minutes = 0;
        hours += 1;
      }

      let hourStr = hours;
      let minStr = minutes;
      let secStr = seconds;

      if (hours < 10) hourStr = `0${hours}`;
      if (minutes < 10) minStr = `0${minutes}`;
      if (seconds < 10) secStr = `0${seconds}`;
      let dateStr = `${hourStr}:${minStr}:${secStr}`;

      setWorkTime(dateStr);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timer.current);
  };

  const changeTitle = (e) => {
    if (e.target.value.length === 0) return;

    const changedTask = { ...currentTask };
    changedTask.title = e.target.value;

    setCurrentTask(changedTask);
    debouncedOnСhange(changedTask);
  };

  const taskIsAssignedToCurrentUser = () => {
    if (!task) return;
    if (task.workerId === currentUser.id) return true;
    return false;
  };

  const start = async () => {
    const activeTask = tasks.find((task) => task.isActive);
    if (activeTask)
      await dispatch(
        completeTask({ taskId: activeTask.id, userId: currentUser.id })
      );
    dispatch(startTask({ taskId: task.id, userId: currentUser.id }));
    startTimer();
  };

  const pauseTask = () => {
    dispatch(completeTask({ taskId: task.id, userId: currentUser.id }));
    stopTimer();
  };

  // const continueTask = () => {
  //   dispatch(endPause({ taskId: task.id, userId: currentUser.id }));
  //   startTimer();
  // };

  return (
    <div className={classes.join(" ")} onClick={onClick}>
      <div className="task__body">
        <div className="task__title">
          <TextField
            fullWidth
            variant="standard"
            disabled={currentTask && currentTask.isComplete}
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
          <div className="task__timer">{workTime}</div>

          {task && task.isComplete && (
            <div className="task__comleted">Completed</div>
          )}

          {task && !task.isActive && (
            <IconButton className="task__button" onClick={start}>
              <StartIcon className="task__button-icon" />
            </IconButton>
          )}

          {/* {task.workers &&
            task.workers[0].isStarted &&
            task.workers[0].isPaused &&
            !task.workers[0].isComplete && (
              <IconButton className="task__button" onClick={continueTask}>
                <StartIcon className="task__button-icon" />
              </IconButton>
            )} */}

          {task && task.isActive && (
            <IconButton className="task__button" onClick={pauseTask}>
              <PauseIcon className="task__button-icon" />
            </IconButton>
          )}
        </div>
      )}
    </div>
  );
};

export default Task;
