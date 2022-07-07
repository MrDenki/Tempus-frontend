import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Task from "./Task";
import SelectedTask from "./SelectedTask";
import TextField from "../UI/TextField";
import Button from "@/components/UI/Button";
import Spiner from "@/components/UI/Spiner";
import { useDebounce } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  deleteTask,
  setSelecedTaskId,
  getSearchedTask,
  createTask,
  updateTask,
} from "@/store/slices/tasksSlice";

const TaskList = ({ className }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [openSelectedTask, setOpenSelectedTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useSelector((state) => state.auth);
  const { selectedTaskId } = useSelector((state) => state.task);
  const {
    tasks: tasksFromStore,
    isLoading,
    error,
    isSearch,
  } = useSelector((state) => state.task);

  useEffect(() => {
    if (currentUser) dispatch(getTasks(currentUser.id));
  }, [currentUser]);

  useEffect(() => {
    setTasks(tasksFromStore);
  }, [tasksFromStore]);
  
  const currentSelectedTask = () =>
    tasks.find((task) => task.id === selectedTaskId);

  const searchTaskByTitle = (title) => {
    if (title) dispatch(getSearchedTask([currentUser.id, title]));
    else dispatch(getTasks(currentUser.id));
  };
  const debouncedOnSearch = useDebounce(searchTaskByTitle, 500);
  const searchTask = (e) => {
    setSearchText(e.target.value);
    debouncedOnSearch(e.target.value);
    dispatch(setSelecedTaskId(undefined));
  };

  const handleOpenSelectedTask = (taskId) => {
    dispatch(setSelecedTaskId(taskId))
    setOpenSelectedTask(true);
  };
  const handleCloseSelectedTask = () => {
    setOpenSelectedTask(false);
  };

  const handleChangeTask = (task) => {
    if (task.id === "new") {
      delete task.id;
      task.creatorId = currentUser.id;
      dispatch(createTask(task));
    } else dispatch(updateTask(task));
  };

  const createLocalTask = () => {
    setSearchText("");
    if (tasks.find((task) => task.id === "new")) {
    } else {
      const _ = [...tasks];
      const newTask = { id: "new", title: "", description: "" };
      _.push(newTask);
      setTasks(_);
      dispatch(setSelecedTaskId("new"));
      handleOpenSelectedTask(newTask.id);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (taskId === "new") {
      setTasks(tasks.filter((task) => task.id !== "new"));
      dispatch(setSelecedTaskId(tasks[tasks.length - 1].id));
    } else {
      if (tasks.length === 1) dispatch(setSelecedTaskId(undefined));
      else {
        await dispatch(setSelecedTaskId(tasks[tasks.length - 2].id));
      }
      dispatch(deleteTask(taskId));
    }
  };

  return (
    <div className={["task-list", className].join(" ")}>
      <div className="task-list__header">
        <Button
          contained
          rounded
          className="task-list__button"
          startIcon={<AddIcon />}
          onClick={createLocalTask}
        >
          New task
        </Button>

        <div className="task-list__search">
          <TextField
            small
            icon={<SearchIcon />}
            value={searchText}
            onChange={searchTask}
          />
        </div>
      </div>

      <div className="task-list__body">
        <div className="task-list__list-holder">
          {!isLoading && !isSearch && tasks && !tasks.length && (
            <div className="task-list__no-task">
              <h3 className="task-list__no-task-title">No tasks</h3>
            </div>
          )}

          {!isLoading && !isSearch && tasks && !!tasks.length && (
            <>
              {tasks.map((task) => (
                <Task
                  selected={task.id === selectedTaskId}
                  onClick={() => handleOpenSelectedTask(task.id)}
                  task={task}
                  onChange={handleChangeTask}
                  key={task.id}
                />
              ))}
            </>
          )}

          {(isLoading || isSearch) && (
            <div className="task-list__is-search">
              <Spiner />
            </div>
          )}
        </div>

        <div
          className={`task-list__selected-task ${
            openSelectedTask ? "open" : "close"
          }`}
        >
          <SelectedTask
            selectedTask={currentSelectedTask()}
            onChangeTask={handleChangeTask}
            onDeleteTask={handleDeleteTask}
            onClose={handleCloseSelectedTask}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskList;
