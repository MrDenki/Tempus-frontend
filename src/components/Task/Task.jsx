import { useState, useEffect, useRef } from "react";
import Button from "@/components/UI/Button";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PauseIcon from "@mui/icons-material/Pause";
import StartIcon from "../icons/StartIcon";
import { useTrim, useDebounce } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";
import { startTask, startPause, endPause } from "../../store/slices/tasksSlice";

const Task = ({ task, selected, onChange, onClick }) => {
  const classes = ["task"];
  if (selected) classes.push("selected");

  const dispatch = useDispatch();
  const [currentTask, setCurrentTask] = useState(task);
  const debouncedOnСhange = useDebounce(onChange, 500);
  const trimTaskDescription = useTrim(30);
  const { currentUser } = useSelector((state) => state.auth);
  const [workTime, setWorkTime] = useState();

  const timer = useRef(null);

  useEffect(() => {
    setCurrentTask(task);

    if (!task.workers) return;

    task.workers.forEach((worker) => {
      if (worker.workerId === currentUser.id) {
        if (worker.isComplete) {
          clearInterval(timer.current);
        }

        if (worker.isStarted) {
          const startTime = new Date(worker.startTime);

          let delta = 0;

          if (worker.isPaused) {
            delta = Math.floor(
              (new Date(worker.startPauseTime) - startTime - worker.pauseTime) /
                1000
            );
          } else if (worker.isComplete) {
            delta = Math.floor(
              (new Date(worker.endTime) - startTime - worker.pauseTime) / 1000
            );
          } else {
            delta = Math.floor(
              (Date.now() - startTime - worker.pauseTime) / 1000
            );
          }

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

          if (!worker.isPaused && !worker.isComplete) {
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
          } else {
            clearInterval(timer.current);
          }

          return () => {
            clearInterval(timer.current);
          };
        }
      }
    });
  }, [task]);

  const startTimer = () => {
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
    console.log(timer.current);
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
    if (!task || !task.workers) return;

    let selected = false;
    task.workers.forEach((worker) => {
      if (worker.workerId === currentUser.id) selected = true;
    });

    return selected;
  };

  const start = () => {
    dispatch(startTask({ taskId: task.id, userId: currentUser.id }));
    startTimer();
  };

  const pauseTask = () => {
    dispatch(startPause({ taskId: task.id, userId: currentUser.id }));
    stopTimer();
  };

  const continueTask = () => {
    dispatch(endPause({ taskId: task.id, userId: currentUser.id }));
    startTimer();
  };

  return (
    <div className={classes.join(" ")} onClick={onClick}>
      <div className="task__body">
        <div className="task__title">
          <TextField
            fullWidth
            variant="standard"
            disabled={
              currentTask &&
              currentTask.workers &&
              currentTask.workers[0].isComplete
            }
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

          {task.workers && task.workers[0].isComplete && (
            <div className="task__comleted">Completed</div>
          )}

          {task.workers &&
            !task.workers[0].isStarted &&
            !task.workers[0].isComplete && (
              <Button
                className="task__button"
                startIcon={<StartIcon className="task__button-icon" />}
                small
                rounded
                contained
                onClick={start}
              >
                Start
              </Button>
            )}

          {task.workers &&
            task.workers[0].isStarted &&
            task.workers[0].isPaused &&
            !task.workers[0].isComplete && (
              <Button
                className="task__button"
                startIcon={<StartIcon className="task__button-icon" />}
                small
                rounded
                contained
                onClick={continueTask}
              >
                Continue
              </Button>
            )}

          {task.workers &&
            task.workers[0].isStarted &&
            !task.workers[0].isPaused &&
            !task.workers[0].isComplete && (
              <Button
                className="task__button"
                startIcon={<PauseIcon className="task__button-icon" />}
                small
                rounded
                contained
                onClick={pauseTask}
              >
                Pause
              </Button>
            )}
        </div>
      )}
    </div>
  );
};

export default Task;
