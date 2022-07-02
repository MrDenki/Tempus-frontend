import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Task from "./Task";
import SelectedTask from "./SelectedTask";
import TextField from "../UI/TextField";
import Button from "@/components/UI/Button";
import Spiner from "@/components/Spiner";
import { useState } from "react";
import { useDebounce } from "@/hooks";

const TaskList = ({
  className,
  tasks,
  onCreate,
  onEdit,
  onSearch,
  isSearch,
  isLoading,
}) => {
  const [searchText, setSearchText] = useState("");
  const [openSelectedTask, setOpenSelectedTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const debouncedOnSearch = useDebounce(onSearch, 500);

  const searchTask = (e) => {
    setSearchText(e.target.value);
    debouncedOnSearch(e.target.value);
  };

  const handleOpenSelectedTask = (task) => {
    setSelectedTask(task);
    setOpenSelectedTask(true);
  };

  const handleCloseSelectedTask = () => {
    setOpenSelectedTask(false);
  };

  return (
    <div className={["task-list", className].join(" ")}>
      <div className="task-list__header">
        <Button
          small
          contained
          startIcon={<AddIcon />}
          onClick={() => onCreate()}
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
        {!isLoading && !isSearch && !!tasks.length && (
          <div className="task-list__list-holder">
            {tasks.map((task) => (
              <Task
                className={
                  selectedTask && task.id === selectedTask.id
                    ? "selected"
                    : null
                }
                onClick={() => handleOpenSelectedTask(task)}
                task={task}
                onEdit={onEdit}
                key={task.id}
              />
            ))}
          </div>
        )}

        <div
          className={`task-list__selected-task ${
            openSelectedTask ? "open" : "close"
          }`}
        >
          <SelectedTask
            selectedTask={selectedTask}
            onClose={handleCloseSelectedTask}
          />
        </div>

        {(isLoading || isSearch) && (
          <div className="task-list__is-search">
            <Spiner />
          </div>
        )}

        {!isLoading && !isSearch && !tasks.length && (
          <div className="task-list__no-task">
            <h3 className="task-list__no-task-title">No tasks</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
