import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Task from "./Task";
import SelectedTask from "./SelectedTask";
import TextField from "../UI/TextField";
import Button from "@/components/UI/Button";
import Spiner from "@/components/UI/Spiner";
import { useDebounce } from "@/hooks";
import { setSelecedTask } from "../../store/slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";

const TaskList = ({
  className,
  tasks,
  onChange,
  onDelete,
  onSearch,
  isSearch,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const debouncedOnSearch = useDebounce(onSearch, 500);
  const [searchText, setSearchText] = useState("");
  const [openSelectedTask, setOpenSelectedTask] = useState(false);
  const [taskss, setTaskss] = useState(tasks);
  const { selectedTaskId } = useSelector((state) => state.task);

  useEffect(() => {
    setTaskss(tasks);
  }, [tasks]);

  const searchTask = (e) => {
    setSearchText(e.target.value);
    dispatch(setSelecedTask(undefined));
    debouncedOnSearch(e.target.value);
  };

  const handleOpenSelectedTask = (taskId) => {
    dispatch(setSelecedTask(taskId));
    setOpenSelectedTask(true);
  };

  const handleCloseSelectedTask = () => {
    setOpenSelectedTask(false);
  };

  const handleChangeTask = (task) => {
    dispatch(setSelecedTask(task.id));

    let isCreated = false;
    if (task.id === "new") {
      delete task.id;
      isCreated = true;
    }

    onChange(task, isCreated);
  };

  const createTask = () => {
    setSearchText("");
    if (taskss.find((task) => task.id === "new")) {
    } else {
      const _ = [...taskss];
      const newTask = { id: "new", title: "", description: "" };
      _.push(newTask);
      setTaskss(_);
      handleOpenSelectedTask(newTask);
    }
  };

  const handleDeleteTask = (taskId) => {
    if (taskId === "new") {
      setTaskss(taskss.filter((task) => task.id !== "new"));
      dispatch(setSelecedTask(tasks[tasks.length - 1].id));
    } else {
      if (tasks.length === 1) dispatch(setSelecedTask(undefined));
      else dispatch(setSelecedTask(tasks[tasks.length - 2]));
      onDelete(taskId);
    }
  };

  const currentSelectedTask = () => {
    return taskss.find((task) => {
      return task.id === selectedTaskId;
    });
  };

  return (
    <div className={["task-list", className].join(" ")}>
      <div className="task-list__header">
        <Button
          contained
          rounded
          className="task-list__button"
          startIcon={<AddIcon />}
          onClick={createTask}
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
          {!isLoading && !isSearch && taskss && !taskss.length && (
            <div className="task-list__no-task">
              <h3 className="task-list__no-task-title">No tasks</h3>
            </div>
          )}

          {!isLoading && !isSearch && taskss && !!taskss.length && (
            <>
              {taskss.map((task) => (
                <Task
                  selected={task.id === selectedTaskId}
                  onClick={() => handleOpenSelectedTask(task)}
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
            // onDeleteUser={}
            // onSelectUser={}
            onClose={handleCloseSelectedTask}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskList;
