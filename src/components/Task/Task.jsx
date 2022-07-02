import Button from "@/components/UI/Button";
import IconButton from "@mui/material/IconButton";
import StartIcon from "../icons/StartIcon";

const Task = ({ className, task, onEdit, onClick }) => {
  const trimDescription = (description) => {
    if (description.length >= 100) return description.slice(0, 100) + "...";
    return description;
  };

  return (
    <div className={["task", className].join(" ")} onClick={onClick}>
      <div className="task__body">
        <h4 className="task__title">{task.title}</h4>
        <span className="task__description">
          {trimDescription(task.description)}
        </span>
      </div>

      <div className="task__actions">
        <div>00:00:00</div>

        <IconButton onClick={onEdit}>
          <StartIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Task;
